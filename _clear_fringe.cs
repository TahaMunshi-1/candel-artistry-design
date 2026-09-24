using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

class Prog {
  static void Main(string[] args) {
    string dir = args[0];
    int tol = 75;
    var map = new[] {
      new[]{ "experience-romance.png", "experience-romance-clean.png" },
      new[]{ "experience-mystery.png", "experience-mystery-clean.png" },
      new[]{ "experience-cabin.png", "experience-cabin-clean.png" },
      new[]{ "experience-wilderness.png", "experience-wilderness-clean.png" },
    };
    foreach (var pair in map) {
      string srcPath = Path.Combine(dir, pair[0]);
      string outPath = Path.Combine(dir, pair[1]);
      using (var src = new Bitmap(srcPath)) {
        int w = src.Width, h = src.Height;
        var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
        using (var g = Graphics.FromImage(bmp)) g.DrawImage(src, 0, 0, w, h);
        var rect = new Rectangle(0, 0, w, h);
        var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
        int stride = data.Stride;
        byte[] buf = new byte[Math.Abs(stride) * h];
        Marshal.Copy(data.Scan0, buf, 0, buf.Length);
        int mx = Math.Max(16, w / 12);
        int my = Math.Max(10, h / 22);
        int cleared = 0;
        for (int y = 0; y < h; y++) {
          for (int x = 0; x < w; x++) {
            bool outer = x < mx || x >= w - mx || y < my || y >= h - my;
            if (!outer) continue;
            int idx = y * stride + x * 4;
            byte b=buf[idx], gch=buf[idx+1], r=buf[idx+2], a=buf[idx+3];
            if (a < 12) continue;
            // near-black OR very dark cool gray fringe
            if (r <= tol && gch <= tol && b <= tol) {
              buf[idx]=0; buf[idx+1]=0; buf[idx+2]=0; buf[idx+3]=0; cleared++;
            }
          }
        }
        Marshal.Copy(buf, 0, data.Scan0, buf.Length);
        bmp.UnlockBits(data);
        bmp.Save(outPath, ImageFormat.Png);
        bmp.Dispose();
        Console.WriteLine("wrote " + pair[1] + " fringeCleared=" + cleared);
      }
    }
  }
}
