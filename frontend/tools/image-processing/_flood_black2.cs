using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;
using System.Runtime.InteropServices;

class Prog {
  static bool IsNearBlack(byte[] buf, int idx, int tol) {
    return buf[idx+3] > 8 && buf[idx+2] <= tol && buf[idx+1] <= tol && buf[idx] <= tol;
  }
  static bool IsTransparent(byte[] buf, int idx) {
    return buf[idx+3] < 12;
  }

  static void Convert(string input, string output, int tol) {
    using (var src = new Bitmap(input)) {
      int w = src.Width, h = src.Height;
      var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
      using (var g = Graphics.FromImage(bmp)) g.DrawImage(src, 0, 0, w, h);
      var rect = new Rectangle(0, 0, w, h);
      var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int stride = data.Stride;
      int bytes = Math.Abs(stride) * h;
      byte[] buf = new byte[bytes];
      Marshal.Copy(data.Scan0, buf, 0, bytes);

      bool[] seen = new bool[w * h];
      var q = new Queue<int>();
      Action<int,int> enq = (x, y) => {
        if (x < 0 || y < 0 || x >= w || y >= h) return;
        int i = y * w + x;
        if (seen[i]) return;
        int idx = y * stride + x * 4;
        // seed from transparent OR near-black
        if (!(IsTransparent(buf, idx) || IsNearBlack(buf, idx, tol))) return;
        seen[i] = true;
        q.Enqueue(i);
      };

      // seed from all current transparent pixels + edges
      for (int y = 0; y < h; y++) {
        for (int x = 0; x < w; x++) {
          int idx = y * stride + x * 4;
          if (IsTransparent(buf, idx) || ((x==0||y==0||x==w-1||y==h-1) && IsNearBlack(buf, idx, tol))) {
            int i = y * w + x;
            if (!seen[i]) { seen[i] = true; q.Enqueue(i); }
          }
        }
      }

      int cleared = 0;
      while (q.Count > 0) {
        int i = q.Dequeue();
        int x = i % w, y = i / w;
        int idx = y * stride + x * 4;
        if (IsNearBlack(buf, idx, tol) || IsTransparent(buf, idx)) {
          if (buf[idx+3] != 0) cleared++;
          buf[idx]=0; buf[idx+1]=0; buf[idx+2]=0; buf[idx+3]=0;
        }
        // expand only into near-black neighbors
        int[] nx = {x+1,x-1,x,x}; int[] ny = {y,y,y+1,y-1};
        for (int k=0;k<4;k++) {
          int xx=nx[k], yy=ny[k];
          if (xx<0||yy<0||xx>=w||yy>=h) continue;
          int ii = yy*w+xx;
          if (seen[ii]) continue;
          int id2 = yy*stride + xx*4;
          if (!IsNearBlack(buf, id2, tol)) continue;
          seen[ii]=true; q.Enqueue(ii);
        }
      }

      Marshal.Copy(buf, 0, data.Scan0, bytes);
      bmp.UnlockBits(data);
      bmp.Save(output, ImageFormat.Png);
      bmp.Dispose();
      Console.WriteLine("OK " + Path.GetFileName(input) + " cleared~=" + cleared);
    }
  }

  static void Main(string[] args) {
    int tol = args.Length > 0 ? int.Parse(args[0]) : 55;
    string dir = args.Length > 1 ? args[1] : ".";
    string[] names = { "experience-romance.png", "experience-mystery.png", "experience-cabin.png", "experience-wilderness.png" };
    foreach (var n in names) {
      string p = Path.Combine(dir, n);
      if (!File.Exists(p)) { Console.WriteLine("MISS " + n); continue; }
      string tmp = p + ".tmp2.png";
      Convert(p, tmp, tol);
      File.Copy(tmp, p, true);
      File.Delete(tmp);
    }
  }
}
