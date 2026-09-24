using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Collections.Generic;
using System.Runtime.InteropServices;

class Prog {
  static bool IsBlack(byte[] buf, int idx, int tol) {
    return buf[idx+2] <= tol && buf[idx+1] <= tol && buf[idx] <= tol && buf[idx+3] > 8;
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
      Action<int,int> tryEnqueue = (x, y) => {
        if (x < 0 || y < 0 || x >= w || y >= h) return;
        int i = y * w + x;
        if (seen[i]) return;
        int idx = y * stride + x * 4;
        if (!IsBlack(buf, idx, tol)) return;
        seen[i] = true;
        q.Enqueue(i);
      };

      for (int x = 0; x < w; x++) { tryEnqueue(x, 0); tryEnqueue(x, h - 1); }
      for (int y = 0; y < h; y++) { tryEnqueue(0, y); tryEnqueue(w - 1, y); }

      while (q.Count > 0) {
        int i = q.Dequeue();
        int x = i % w, y = i / w;
        int idx = y * stride + x * 4;
        buf[idx] = 0; buf[idx+1] = 0; buf[idx+2] = 0; buf[idx+3] = 0;
        tryEnqueue(x+1,y); tryEnqueue(x-1,y); tryEnqueue(x,y+1); tryEnqueue(x,y-1);
      }

      Marshal.Copy(buf, 0, data.Scan0, bytes);
      bmp.UnlockBits(data);
      bmp.Save(output, ImageFormat.Png);
      bmp.Dispose();
      Console.WriteLine("OK " + Path.GetFileName(output));
    }
  }

  static void Main(string[] args) {
    int tol = args.Length > 0 ? int.Parse(args[0]) : 38;
    string dir = args.Length > 1 ? args[1] : ".";
    string[] names = { "experience-romance.png", "experience-mystery.png", "experience-cabin.png", "experience-wilderness.png" };
    foreach (var n in names) {
      string p = Path.Combine(dir, n);
      if (!File.Exists(p)) { Console.WriteLine("MISS " + n); continue; }
      string tmp = p + ".tmp.png";
      Convert(p, tmp, tol);
      File.Copy(tmp, p, true);
      File.Delete(tmp);
    }
  }
}
