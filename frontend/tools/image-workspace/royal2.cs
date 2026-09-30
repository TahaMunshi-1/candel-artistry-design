using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;
using System.Runtime.InteropServices;

class Prog {
  static bool IsNearBlack(byte[] buf, int idx, int tol) {
    return buf[idx+2] <= tol && buf[idx+1] <= tol && buf[idx] <= tol;
  }
  static void FillBlackToRoyal(string input, string output, int tol) {
    using (var src = new Bitmap(input)) {
      int w = src.Width, h = src.Height;
      var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
      using (var g = Graphics.FromImage(bmp)) g.DrawImage(src, 0, 0, w, h);
      var rect = new Rectangle(0, 0, w, h);
      var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int stride = Math.Abs(data.Stride);
      byte[] buf = new byte[stride * h];
      Marshal.Copy(data.Scan0, buf, 0, buf.Length);
      bool[] visited = new bool[w * h];
      var q = new Queue<int>();
      // Royal blood: #5c1018
      byte rr = 0x5c, rg = 0x10, rb = 0x18;
      Action<int,int> enq = (x,y) => {
        if (x < 0 || y < 0 || x >= w || y >= h) return;
        int i = y * w + x;
        if (visited[i]) return;
        int idx = y * stride + x * 4;
        if (!IsNearBlack(buf, idx, tol)) { visited[i] = true; return; }
        visited[i] = true;
        q.Enqueue(i);
      };
      for (int x = 0; x < w; x++) { enq(x, 0); enq(x, h-1); }
      for (int y = 0; y < h; y++) { enq(0, y); enq(w-1, y); }
      int n = 0;
      while (q.Count > 0) {
        int i = q.Dequeue();
        int x = i % w, y = i / w;
        int idx = y * stride + x * 4;
        buf[idx] = rb; buf[idx+1] = rg; buf[idx+2] = rr; buf[idx+3] = 255;
        n++;
        enq(x+1,y); enq(x-1,y); enq(x,y+1); enq(x,y-1);
      }
      Marshal.Copy(buf, 0, data.Scan0, buf.Length);
      bmp.UnlockBits(data);
      if (File.Exists(output)) File.Delete(output);
      // save as png then we can also overwrite jpg via png
      string png = Path.ChangeExtension(output, ".png");
      bmp.Save(png, ImageFormat.Png);
      // also write jpeg for paths that expect jpg
      using (var jpgBmp = new Bitmap(bmp)) {
        jpgBmp.Save(output, ImageFormat.Jpeg);
      }
      bmp.Dispose();
      Console.WriteLine("OK " + Path.GetFileName(output) + " filled=" + n);
    }
  }
  static void Main(string[] args) {
    string dir = args[0];
    // Night Mood and Velvet Kiss have black frame corners
    FillBlackToRoyal(Path.Combine(dir, "featured-main-src.jpg"), Path.Combine(dir, "featured-main-out.jpg"), 28);
    FillBlackToRoyal(Path.Combine(dir, "strip-2-src.jpg"), Path.Combine(dir, "strip-2-out.jpg"), 28);
  }
}
