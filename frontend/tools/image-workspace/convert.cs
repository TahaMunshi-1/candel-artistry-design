using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;
using System.Runtime.InteropServices;

class Prog {
  static bool IsBlack(byte[] buf, int idx, int tol) {
    return buf[idx+2] <= tol && buf[idx+1] <= tol && buf[idx] <= tol;
  }
  static void Convert(string input, string output, int tol) {
    using (var src = new Bitmap(input)) {
      int w = src.Width, h = src.Height;
      var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
      using (var g = Graphics.FromImage(bmp)) g.DrawImage(src, 0, 0, w, h);
      var rect = new Rectangle(0, 0, w, h);
      var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int stride = Math.Abs(data.Stride);
      int bytes = stride * h;
      byte[] buf = new byte[bytes];
      Marshal.Copy(data.Scan0, buf, 0, bytes);
      bool[] visited = new bool[w * h];
      var q = new Queue<int>();
      Action<int,int> enq = (x,y) => {
        if (x < 0 || y < 0 || x >= w || y >= h) return;
        int i = y * w + x;
        if (visited[i]) return;
        int idx = y * stride + x * 4;
        if (!IsBlack(buf, idx, tol)) return;
        visited[i] = true;
        q.Enqueue(i);
      };
      for (int x = 0; x < w; x++) { enq(x, 0); enq(x, h-1); }
      for (int y = 0; y < h; y++) { enq(0, y); enq(w-1, y); }
      int cleared = 0;
      while (q.Count > 0) {
        int i = q.Dequeue();
        int x = i % w, y = i / w;
        int idx = y * stride + x * 4;
        buf[idx] = 0; buf[idx+1] = 0; buf[idx+2] = 0; buf[idx+3] = 0;
        cleared++;
        enq(x+1,y); enq(x-1,y); enq(x,y+1); enq(x,y-1);
      }
      Marshal.Copy(buf, 0, data.Scan0, bytes);
      bmp.UnlockBits(data);
      if (File.Exists(output)) File.Delete(output);
      bmp.Save(output, ImageFormat.Png);
      bmp.Dispose();
      Console.WriteLine("OK " + Path.GetFileName(output) + " cleared=" + cleared);
    }
  }
  static void Main(string[] args) {
    string tmp = args[0], dest = args[1];
    Convert(Path.Combine(tmp, "romance.jpg"), Path.Combine(dest, "experience-romance.png"), 35);
    Convert(Path.Combine(tmp, "mystery.jpg"), Path.Combine(dest, "experience-mystery.png"), 35);
    Convert(Path.Combine(tmp, "cabin.jpg"), Path.Combine(dest, "experience-cabin.png"), 35);
    Convert(Path.Combine(tmp, "wilderness.jpg"), Path.Combine(dest, "experience-wilderness.png"), 35);
  }
}
