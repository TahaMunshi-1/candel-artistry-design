using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

class Prog {
  static bool NearBlack(byte r, byte g, byte b, byte a, int tol) {
    return a > 30 && r <= tol && g <= tol && b <= tol;
  }
  static bool Goldish(byte r, byte g, byte b, byte a) {
    if (a < 160) return false;
    if (r < 100 || g < 60) return false;
    if (r < g) return false;
    if ((r - b) < 20) return false;
    if (r > 250 && g > 240 && b > 220) return false;
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

      int fixes = 0;
      for (int pass = 0; pass < 8; pass++) {
        byte[] srcBuf = (byte[])buf.Clone();
        int tol = 70 + pass * 2; // gradually catch softer darks
        for (int y = 3; y < h - 3; y++) {
          for (int x = 3; x < w - 3; x++) {
            int idx = y * stride + x * 4;
            byte bb = srcBuf[idx], gg = srcBuf[idx+1], rr = srcBuf[idx+2], aa = srcBuf[idx+3];
            if (!NearBlack(rr, gg, bb, aa, tol)) continue;

            bool nearGold = false;
            int sr=0, sg=0, sb=0, sa=0, n=0;
            for (int yy = y - 3; yy <= y + 3; yy++) {
              for (int xx = x - 3; xx <= x + 3; xx++) {
                if (xx == x && yy == y) continue;
                int j = yy * stride + xx * 4;
                byte b2 = srcBuf[j], g2 = srcBuf[j+1], r2 = srcBuf[j+2], a2 = srcBuf[j+3];
                if (Goldish(r2, g2, b2, a2)) nearGold = true;
                if (a2 > 160 && !NearBlack(r2, g2, b2, a2, tol)) {
                  // prefer gold and midtones for inpaint
                  int wgt = Goldish(r2, g2, b2, a2) ? 3 : 1;
                  sr += r2 * wgt; sg += g2 * wgt; sb += b2 * wgt; sa += a2 * wgt; n += wgt;
                }
              }
            }
            if (!nearGold || n < 3) continue;
            buf[idx] = (byte)(sb / n);
            buf[idx+1] = (byte)(sg / n);
            buf[idx+2] = (byte)(sr / n);
            buf[idx+3] = (byte)Math.Max(aa, sa / n);
            fixes++;
          }
        }
      }

      Marshal.Copy(buf, 0, data.Scan0, buf.Length);
      bmp.UnlockBits(data);
      bmp.Save(output, ImageFormat.Png);
      bmp.Dispose();
      Console.WriteLine(Path.GetFileName(output) + " outlineFixes=" + fixes);
    }
  }

  static void Main(string[] args) {
    string dir = args[0];
    // start from clean (transparent outer) not v2 which may have over-inpainted interiors
    Process(Path.Combine(dir, "experience-romance-clean.png"), Path.Combine(dir, "experience-romance-v3.png"));
    Process(Path.Combine(dir, "experience-mystery-clean.png"), Path.Combine(dir, "experience-mystery-v3.png"));
    Process(Path.Combine(dir, "experience-cabin-clean.png"), Path.Combine(dir, "experience-cabin-v3.png"));
    Process(Path.Combine(dir, "experience-wilderness-clean.png"), Path.Combine(dir, "experience-wilderness-v3.png"));
  }
}
