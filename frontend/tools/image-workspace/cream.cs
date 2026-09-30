using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;
using System.Runtime.InteropServices;

class Prog {
  static bool IsCream(byte[] buf, int idx) {
    int b = buf[idx], g = buf[idx+1], r = buf[idx+2];
    if (r < 210 || g < 200 || b < 175) return false;
    int max = Math.Max(r, Math.Max(g, b));
    int min = Math.Min(r, Math.Min(g, b));
    if (max - min > 55) return false;
    if ((r - b) > 70 && g > 180) return false;
    return true;
  }
  static void Convert(string input, string output) {
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
        if (!IsCream(buf, idx)) { visited[i] = true; return; }
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
        buf[idx]=0; buf[idx+1]=0; buf[idx+2]=0; buf[idx+3]=0;
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
    string dir = args[0];
    for (int n = 1; n <= 4; n++) {
      Convert(Path.Combine(dir, "experience-" + n + ".jpg"), Path.Combine(dir, "experience-classic-" + n + ".png"));
    }
  }
}
