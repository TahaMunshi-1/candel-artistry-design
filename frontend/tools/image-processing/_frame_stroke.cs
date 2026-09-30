using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

class Prog {
  static bool NearBlack(byte r, byte g, byte b, byte a) {
    return a > 40 && r <= 50 && g <= 50 && b <= 50;
  }
  static bool Goldish(byte r, byte g, byte b, byte a) {
    if (a < 180) return false;
    if (r < 125 || g < 80) return false;
    if (r <= g + 2) return false;
    if ((r - b) < 28) return false;
    return true;
  }
  static int Luma(byte r, byte g, byte b) {
    return (r * 30 + g * 59 + b * 11) / 100;
  }

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

      int fixes = 0;
      for (int pass = 0; pass < 6; pass++) {
        byte[] cur = (byte[])buf.Clone();
        for (int y = 2; y < h - 2; y++) {
          for (int x = 2; x < w - 2; x++) {
            int idx = y * stride + x * 4;
            byte bb = cur[idx], gg = cur[idx+1], rr = cur[idx+2], aa = cur[idx+3];
            if (!NearBlack(rr, gg, bb, aa)) continue;

            int gold = 0, dark = 0, bright = 0;
            int sr = 0, sg = 0, sb = 0, n = 0;
            for (int yy = y - 2; yy <= y + 2; yy++) {
              for (int xx = x - 2; xx <= x + 2; xx++) {
                if (xx == x && yy == y) continue;
                int j = yy * stride + xx * 4;
                byte b2 = cur[j], g2 = cur[j+1], r2 = cur[j+2], a2 = cur[j+3];
                if (a2 < 40) continue;
                if (Goldish(r2, g2, b2, a2)) gold++;
                if (NearBlack(r2, g2, b2, a2)) { dark++; continue; }
                int L = Luma(r2, g2, b2);
                if (L >= 55) bright++;
                // sample for fill: prefer gold and mid/light tones
                int wgt = Goldish(r2, g2, b2, a2) ? 5 : (L >= 70 ? 2 : 1);
                sr += r2 * wgt; sg += g2 * wgt; sb += b2 * wgt; n += wgt;
              }
            }

            // Must touch the gold frame
            if (gold < 1) continue;
            // Must be a thin stroke, not a dark mass (coat/horse)
            if (dark > 8) continue;
            // Prefer strokes that also touch something non-dark (art mat / gold)
            if (bright < 1 && gold < 2) continue;
            if (n < 2) continue;

            buf[idx] = (byte)(sb / n);
            buf[idx + 1] = (byte)(sg / n);
            buf[idx + 2] = (byte)(sr / n);
            fixes++;
          }
        }
      }

      Marshal.Copy(buf, 0, data.Scan0, buf.Length);
      bmp.UnlockBits(data);
      bmp.Save(output, ImageFormat.Png);
      bmp.Dispose();
      Console.WriteLine(Path.GetFileName(output) + " frameStrokeFixes=" + fixes);
    }
  }

  static void Main(string[] args) {
    string dir = args[0];
    string[] keys = { "romance", "mystery", "cabin", "wilderness" };
    foreach (var k in keys) {
      Process(
        Path.Combine(dir, "experience-" + k + "-clean.png"),
        Path.Combine(dir, "experience-" + k + "-framed.png")
      );
    }
  }
}
