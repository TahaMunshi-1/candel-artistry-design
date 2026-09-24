using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;
using System.Runtime.InteropServices;

class Prog {
  static bool NearBlack(byte r, byte g, byte b, byte a, int tol) {
    return a > 20 && r <= tol && g <= tol && b <= tol;
  }
  static bool Goldish(byte r, byte g, byte b, byte a) {
    if (a < 160) return false;
    if (r < 120 || g < 75) return false;
    if (r <= g) return false;
    return (r - b) >= 25;
  }
  static bool Trans(byte a) { return a < 20; }

  static void Process(string input, string output) {
    using (var src = new Bitmap(input)) {
      int w = src.Width, h = src.Height;
      var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
      using (var gfx = Graphics.FromImage(bmp)) gfx.DrawImage(src, 0, 0, w, h);
      var rect = new Rectangle(0, 0, w, h);
      var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int stride = data.Stride;
      byte[] buf = new byte[Math.Abs(stride) * h];
      Marshal.Copy(data.Scan0, buf, 0, buf.Length);

      // 1) Expand transparency into near-black from existing transparent (outer + holes that touch)
      var q = new Queue<int>();
      bool[] seen = new bool[w * h];
      for (int y = 0; y < h; y++)
        for (int x = 0; x < w; x++) {
          int idx = y * stride + x * 4;
          if (Trans(buf[idx+3]) || ((x==0||y==0||x==w-1||y==h-1) && NearBlack(buf[idx+2],buf[idx+1],buf[idx],buf[idx+3], 60))) {
            int i = y * w + x; seen[i]=true; q.Enqueue(i);
          }
        }
      int tol = 62;
      int cleared = 0;
      while (q.Count > 0) {
        int i = q.Dequeue();
        int x = i % w, y = i / w;
        int idx = y * stride + x * 4;
        if (NearBlack(buf[idx+2], buf[idx+1], buf[idx], buf[idx+3], tol) || Trans(buf[idx+3])) {
          if (buf[idx+3] > 0) cleared++;
          buf[idx]=0; buf[idx+1]=0; buf[idx+2]=0; buf[idx+3]=0;
        }
        int[] xs={x+1,x-1,x,x}, ys={y,y,y+1,y-1};
        for (int k=0;k<4;k++) {
          int xx=xs[k], yy=ys[k];
          if (xx<0||yy<0||xx>=w||yy>=h) continue;
          int ii=yy*w+xx; if (seen[ii]) continue;
          int j=yy*stride+xx*4;
          if (!NearBlack(buf[j+2],buf[j+1],buf[j],buf[j+3], tol)) continue;
          seen[ii]=true; q.Enqueue(ii);
        }
      }

      // 2) Enclosed black pockets in side filigree: black + gold neighbor in side/top bands -> transparent
      int mx = w / 5; // 20% sides
      int my = h / 8;
      for (int pass=0; pass<6; pass++) {
        for (int y = 1; y < h - 1; y++) {
          for (int x = 1; x < w - 1; x++) {
            bool band = x < mx || x >= w - mx || y < my;
            if (!band) continue;
            int idx = y * stride + x * 4;
            if (!NearBlack(buf[idx+2], buf[idx+1], buf[idx], buf[idx+3], 70)) continue;
            bool gold=false, air=false;
            for (int yy=y-2; yy<=y+2; yy++)
              for (int xx=x-2; xx<=x+2; xx++) {
                if (xx<0||yy<0||xx>=w||yy>=h) continue;
                int j=yy*stride+xx*4;
                if (Trans(buf[j+3])) air=true;
                if (Goldish(buf[j+2],buf[j+1],buf[j],buf[j+3])) gold=true;
              }
            if (gold || air) {
              buf[idx]=0; buf[idx+1]=0; buf[idx+2]=0; buf[idx+3]=0; cleared++;
            }
          }
        }
      }

      // 3) Thin inner stroke: black touching gold, thin (few black neighbors) -> inpaint from non-black
      for (int pass=0; pass<4; pass++) {
        byte[] cur = (byte[])buf.Clone();
        for (int y=2; y<h-2; y++) {
          for (int x=2; x<w-2; x++) {
            int idx=y*stride+x*4;
            if (!NearBlack(cur[idx+2],cur[idx+1],cur[idx],cur[idx+3], 55)) continue;
            int gold=0, black=0, sr=0,sg=0,sb=0,n=0;
            for (int yy=y-2; yy<=y+2; yy++)
              for (int xx=x-2; xx<=x+2; xx++) {
                if (xx==x&&yy==y) continue;
                int j=yy*stride+xx*4;
                byte bb=cur[j], gg=cur[j+1], rr=cur[j+2], aa=cur[j+3];
                if (aa<40) continue;
                if (Goldish(rr,gg,bb,aa)) gold++;
                if (NearBlack(rr,gg,bb,aa,55)) black++;
                else { int wgt=Goldish(rr,gg,bb,aa)?3:1; sr+=rr*wgt; sg+=gg*wgt; sb+=bb*wgt; n+=wgt; }
              }
            if (gold<1 || n<2) continue;
            if (black >= 10) continue; // thick mass
            buf[idx]=(byte)(sb/n); buf[idx+1]=(byte)(sg/n); buf[idx+2]=(byte)(sr/n);
            cleared++;
          }
        }
      }

      Marshal.Copy(buf, 0, data.Scan0, buf.Length);
      bmp.UnlockBits(data);
      bmp.Save(output, ImageFormat.Png);
      bmp.Dispose();
      Console.WriteLine(Path.GetFileName(output) + " cleared~" + cleared);
    }
  }

  static void Main(string[] args) {
    string dir = args[0];
    Process(Path.Combine(dir,"experience-romance-clean.png"), Path.Combine(dir,"experience-romance-final.png"));
    Process(Path.Combine(dir,"experience-mystery-clean.png"), Path.Combine(dir,"experience-mystery-final.png"));
    Process(Path.Combine(dir,"experience-cabin-clean.png"), Path.Combine(dir,"experience-cabin-final.png"));
    Process(Path.Combine(dir,"experience-wilderness-clean.png"), Path.Combine(dir,"experience-wilderness-final.png"));
  }
}
