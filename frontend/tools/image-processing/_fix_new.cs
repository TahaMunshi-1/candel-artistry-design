using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

class Prog {
  static float Luma(byte r, byte g, byte b) { return 0.299f*r + 0.587f*g + 0.114f*b; }
  static bool Goldish(byte r, byte g, byte b, byte a) {
    if (a < 150) return false;
    if (r < 120 || g < 70) return false;
    if (r <= g) return false;
    return (r - b) >= 22 && Luma(r,g,b) >= 90;
  }

  static void ClearBlackBg(byte[] buf, int stride, int w, int h) {
    bool[,] vis = new bool[w,h];
    var q = new Queue<int>();
    Action<int,int> tryEnq = (x,y) => {
      if (x<0||y<0||x>=w||y>=h||vis[x,y]) return;
      int i=y*stride+x*4;
      byte b=buf[i], g=buf[i+1], r=buf[i+2], a=buf[i+3];
      if (a < 20) { vis[x,y]=true; return; }
      if (Goldish(r,g,b,a)) return;
      float L = Luma(r,g,b);
      // black / near-black backdrop only
      if (L > 28 || r > 40 || g > 40 || b > 40) return;
      vis[x,y]=true; q.Enqueue(y*w+x);
    };
    for (int x=0;x<w;x++){ tryEnq(x,0); tryEnq(x,h-1); }
    for (int y=0;y<h;y++){ tryEnq(0,y); tryEnq(w-1,y); }
    int[] dx={-1,1,0,0,-1,-1,1,1}; int[] dy={0,0,-1,1,-1,1,-1,1};
    while (q.Count>0) {
      int p=q.Dequeue(); int x=p%w, y=p/w;
      int i=y*stride+x*4;
      buf[i]=0; buf[i+1]=0; buf[i+2]=0; buf[i+3]=0;
      for (int k=0;k<8;k++) {
        int nx=x+dx[k], ny=y+dy[k];
        if (nx<0||ny<0||nx>=w||ny>=h||vis[nx,ny]) continue;
        int j=ny*stride+nx*4;
        byte bb=buf[j], gg=buf[j+1], rr=buf[j+2], aa=buf[j+3];
        if (aa<20){ vis[nx,ny]=true; continue; }
        if (Goldish(rr,gg,bb,aa)) continue;
        float L=Luma(rr,gg,bb);
        // fringe: slightly brighter black edge
        if (L <= 42 && rr<=50 && gg<=50 && bb<=50) {
          vis[nx,ny]=true; q.Enqueue(ny*w+nx);
        }
      }
    }
  }

  // Soften residual black outline on gold frame + gentle color refresh
  static void Polish(byte[] buf, int stride, int w, int h) {
    byte[] cur = (byte[])buf.Clone();
    for (int y=1;y<h-1;y++) {
      for (int x=1;x<w-1;x++) {
        int idx=y*stride+x*4;
        byte bb=cur[idx], gg=cur[idx+1], rr=cur[idx+2], aa=cur[idx+3];
        if (aa < 40) continue;

        // thin dark stroke next to gold + transparent -> gold inpaint
        bool nearBlack = rr<=45 && gg<=40 && bb<=40 && !(bb>rr+12 && bb>gg);
        if (nearBlack) {
          bool air=false; int gR=0,gG=0,gB=0,gN=0;
          for (int yy=y-3;yy<=y+3;yy++)
            for (int xx=x-3;xx<=x+3;xx++) {
              if (xx<0||yy<0||xx>=w||yy>=h) continue;
              int j=yy*stride+xx*4;
              if (cur[j+3]<28) air=true;
              else if (Goldish(cur[j+2],cur[j+1],cur[j],cur[j+3])) {
                gN++; gR+=cur[j+2]; gG+=cur[j+1]; gB+=cur[j];
              }
            }
          if (air && gN>=2) {
            buf[idx]=(byte)(gB/gN); buf[idx+1]=(byte)(gG/gN); buf[idx+2]=(byte)(gR/gN); buf[idx+3]=255;
            continue;
          }
        }

        // gentle color correction: warm lift + slight contrast for midtones (skip near-black art)
        if (Luma(rr,gg,bb) > 35) {
          float r2 = rr * 1.04f + 4f;
          float g2 = gg * 1.02f + 2f;
          float b2 = bb * 0.98f;
          // mild contrast around mid
          r2 = (r2 - 128f) * 1.06f + 128f;
          g2 = (g2 - 128f) * 1.06f + 128f;
          b2 = (b2 - 128f) * 1.06f + 128f;
          buf[idx+2] = (byte)Math.Max(0, Math.Min(255, (int)r2));
          buf[idx+1] = (byte)Math.Max(0, Math.Min(255, (int)g2));
          buf[idx]   = (byte)Math.Max(0, Math.Min(255, (int)b2));
        }
      }
    }
  }

  static void Process(string input, string output) {
    using (var src = new Bitmap(input)) {
      var bmp = new Bitmap(src.Width, src.Height, PixelFormat.Format32bppArgb);
      using (var g = Graphics.FromImage(bmp)) {
        g.CompositingMode = CompositingMode.SourceCopy;
        g.DrawImage(src, 0, 0, src.Width, src.Height);
      }
      var rect = new Rectangle(0,0,bmp.Width,bmp.Height);
      var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int stride = data.Stride;
      byte[] buf = new byte[Math.Abs(stride)*bmp.Height];
      Marshal.Copy(data.Scan0, buf, 0, buf.Length);
      ClearBlackBg(buf, stride, bmp.Width, bmp.Height);
      Polish(buf, stride, bmp.Width, bmp.Height);
      Marshal.Copy(buf, 0, data.Scan0, buf.Length);
      bmp.UnlockBits(data);

      // 2x upscale for retina
      int nw=bmp.Width*2, nh=bmp.Height*2;
      using (var hi = new Bitmap(nw, nh, PixelFormat.Format32bppArgb))
      using (var g = Graphics.FromImage(hi)) {
        g.InterpolationMode = InterpolationMode.HighQualityBicubic;
        g.SmoothingMode = SmoothingMode.HighQuality;
        g.PixelOffsetMode = PixelOffsetMode.HighQuality;
        g.CompositingQuality = CompositingQuality.HighQuality;
        g.Clear(Color.Transparent);
        g.DrawImage(bmp, 0, 0, nw, nh);
        hi.Save(output, ImageFormat.Png);
        Console.WriteLine(Path.GetFileName(output) + " " + nw + "x" + nh);
      }
      bmp.Dispose();
    }
  }

  static void Main(string[] args) {
    string srcDir=args[0], dest=args[1];
    foreach (var k in new[]{"romance","mystery","cabin","wilderness"}) {
      Process(Path.Combine(srcDir, k+".jpg"), Path.Combine(dest, "experience-"+k+"-vivid.png"));
    }
  }
}
