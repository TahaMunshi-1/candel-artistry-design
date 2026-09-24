using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

class Prog {
  static bool IsNearBlack(byte r, byte g, byte b, byte a) {
    if (a < 40) return false;
    return r <= 55 && g <= 55 && b <= 55;
  }
  static bool IsGoldish(byte r, byte g, byte b, byte a) {
    if (a < 180) return false;
    // gold / champagne / bronze frame tones
    if (r < 110) return false;
    if (r <= g + 8) return false; // need warmer than green
    if (g < 70) return false;
    if (b > g + 15) return false; // not too blue
    // exclude very light ivory
    if (r > 245 && g > 235 && b > 210) return false;
    return (r - b) >= 25;
  }

  static void Process(string input, string output) {
    using (var src = new Bitmap(input)) {
      int w = src.Width, h = src.Height;
      var bmp = new Bitmap(w, h, PixelFormat.Format32bppArgb);
      using (var g = Graphics.FromImage(bmp)) g.DrawImage(src, 0, 0, w, h);
      var rect = new Rectangle(0, 0, w, h);
      var data = bmp.LockBits(rect, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
      int stride = data.Stride;
      byte[] buf = new byte[Math.Abs(stride) * h];
      Marshal.Copy(data.Scan0, buf, 0, buf.Length);
      byte[] outb = (byte[])buf.Clone();

      int cleared = 0;
      int[] dx = { -2,-1,0,1,2, -2,-1,0,1,2, -2,-1,0,1,2, -1,0,1, -1,0,1 };
      int[] dy = { -2,-2,-2,-2,-2, -1,-1,-1,-1,-1, 1,1,1,1,1, 2,2,2, 0,0,0 };

      // Pass 1-3: black pixels next to gold -> sample nearby non-black
      for (int pass = 0; pass < 4; pass++) {
        buf = (byte[])outb.Clone();
        for (int y = 2; y < h - 2; y++) {
          for (int x = 2; x < w - 2; x++) {
            int idx = y * stride + x * 4;
            byte b0 = buf[idx], g0 = buf[idx+1], r0 = buf[idx+2], a0 = buf[idx+3];
            if (!IsNearBlack(r0, g0, b0, a0)) continue;

            bool nearGold = false;
            int sr=0, sg=0, sb=0, sa=0, n=0;
            for (int k = 0; k < dx.Length; k++) {
              int xx = x + dx[k], yy = y + dy[k];
              if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
              int j = yy * stride + xx * 4;
              byte bb = buf[j], gg = buf[j+1], rr = buf[j+2], aa = buf[j+3];
              if (IsGoldish(rr, gg, bb, aa)) nearGold = true;
              if (aa > 180 && !IsNearBlack(rr, gg, bb, aa)) {
                sr += rr; sg += gg; sb += bb; sa += aa; n++;
              }
            }
            if (!nearGold || n < 2) continue;
            outb[idx] = (byte)(sb / n);
            outb[idx+1] = (byte)(sg / n);
            outb[idx+2] = (byte)(sr / n);
            outb[idx+3] = (byte)Math.Max(a0, sa / n);
            cleared++;
          }
        }
      }

      // Pass: any remaining near-black that borders transparent -> transparent (outer fringe)
      buf = (byte[])outb.Clone();
      for (int y = 1; y < h - 1; y++) {
        for (int x = 1; x < w - 1; x++) {
          int idx = y * stride + x * 4;
          if (!IsNearBlack(buf[idx+2], buf[idx+1], buf[idx], buf[idx+3])) continue;
          bool nearT = false;
          for (int yy = y-1; yy <= y+1; yy++)
            for (int xx = x-1; xx <= x+1; xx++) {
              int j = yy * stride + xx * 4;
              if (buf[j+3] < 20) nearT = true;
            }
          if (nearT) {
            outb[idx]=0; outb[idx+1]=0; outb[idx+2]=0; outb[idx+3]=0;
            cleared++;
          }
        }
      }

      Marshal.Copy(outb, 0, data.Scan0, outb.Length);
      bmp.UnlockBits(data);
      bmp.Save(output, ImageFormat.Png);
      bmp.Dispose();
      Console.WriteLine("OK " + Path.GetFileName(output) + " fixes~" + cleared);
    }
  }

  static void Main(string[] args) {
    string dir = args[0];
    string[] names = {
      "experience-romance-clean.png",
      "experience-mystery-clean.png",
      "experience-cabin-clean.png",
      "experience-wilderness-clean.png"
    };
    foreach (var n in names) {
      string p = Path.Combine(dir, n);
      string tmp = Path.Combine(dir, Path.GetFileNameWithoutExtension(n) + "-v2.png");
      Process(p, tmp);
      // write final clean name used by site
      string finalName = n.Replace("-clean.png", "-v2.png");
      // already wrote *-clean-v2 via naming - fix:
    }
    // explicit outputs
    Process(Path.Combine(dir, "experience-romance-clean.png"), Path.Combine(dir, "experience-romance-v2.png"));
    Process(Path.Combine(dir, "experience-mystery-clean.png"), Path.Combine(dir, "experience-mystery-v2.png"));
    Process(Path.Combine(dir, "experience-cabin-clean.png"), Path.Combine(dir, "experience-cabin-v2.png"));
    Process(Path.Combine(dir, "experience-wilderness-clean.png"), Path.Combine(dir, "experience-wilderness-v2.png"));
  }
}
