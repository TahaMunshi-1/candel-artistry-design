using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

class Prog {
  static bool NearBlack(byte r, byte g, byte b, byte a) {
    return a > 40 && r <= 48 && g <= 48 && b <= 48;
  }
  static bool Goldish(byte r, byte g, byte b, byte a) {
    if (a < 180) return false;
    if (r < 130 || g < 85) return false;
    if (r <= g + 5) return false;
    if ((r - b) < 30) return false;
    return true;
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
      byte[] orig = (byte[])buf.Clone();

      int fixes = 0;
      // Only thin black strokes that touch gold: require gold neighbor + mostly non-black neighborhood
      for (int pass = 0; pass < 5; pass++) {
        byte[] cur = (byte[])buf.Clone();
        for (int y = 2; y < h - 2; y++) {
          for (int x = 2; x < w - 2; x++) {
            int idx = y * stride + x * 4;
            if (!NearBlack(cur[idx+2], cur[idx+1], cur[idx], cur[idx+3])) continue;

            int gold = 0, nonBlack = 0, black = 0;
            int sr=0, sg=0, sb=0, n=0;
            for (int yy = y - 2; yy <= y + 2; yy++) {
              for (int xx = x - 2; xx <= x + 2; xx++) {
                if (xx == x && yy == y) continue;
                int j = yy * stride + xx * 4;
                byte bb = cur[j], gg = cur[j+1], rr = cur[j+2], aa = cur[j+3];
                if (aa < 40) continue;
                if (Goldish(rr, gg, bb, aa)) gold++;
                if (NearBlack(rr, gg, bb, aa)) black++;
                else {
                  nonBlack++;
                  // sample non-black non-extreme for fill; prefer gold
                  int wgt = Goldish(rr, gg, bb, aa) ? 4 : 1;
                  sr += rr * wgt; sg += gg * wgt; sb += bb * wgt; n += wgt;
                }
              }
            }
            // thin stroke: touches gold, and more non-black than black around it
            if (gold < 1 || n < 2) continue;
            if (black > nonBlack + 2) continue; // thick dark mass (coat/horse) — skip
            buf[idx] = (byte)(sb / n);
            buf[idx+1] = (byte)(sg / n);
            buf[idx+2] = (byte)(sr / n);
            fixes++;
          }
        }
      }

      Marshal.Copy(buf, 0, data.Scan0, buf.Length);
      bmp.UnlockBits(data);
      bmp.Save(output, ImageFormat.Png);
      bmp.Dispose();
      Console.WriteLine(Path.GetFileName(output) + " strokeFixes=" + fixes);
    }
  }

  static void Main(string[] args) {
    string dir = args[0];
    Process(Path.Combine(dir, "experience-romance-clean.png"), Path.Combine(dir, "experience-romance-final.png"));
    Process(Path.Combine(dir, "experience-mystery-clean.png"), Path.Combine(dir, "experience-mystery-final.png"));
    Process(Path.Combine(dir, "experience-cabin-clean.png"), Path.Combine(dir, "experience-cabin-final.png"));
    Process(Path.Combine(dir, "experience-wilderness-clean.png"), Path.Combine(dir, "experience-wilderness-final.png"));
  }
}
