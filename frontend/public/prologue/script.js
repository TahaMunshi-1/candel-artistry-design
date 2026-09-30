(() => {
  // ========================================
  // ETHEREAL FANTASY CINEMATIC ENGINE
  // Storytelling · dolly · parallax · wow light
  // ========================================

  // Five chapters · every storyboard image = one scene
  const FEEL = {
    moonlit: { mode: "pan-left", grade: [48, 68, 105], gradeOp: 0.32, depth: 0.55, exit: "iris", particles: "stardust", subjectZoom: 1.03, rot: 0, occlude: "mist-bank", dolly: 0.85, rays: 0.35, bloom: 0.2, wow: "soft" },
    embers: { mode: "dive", grade: [110, 48, 20], gradeOp: 0.34, depth: 1.15, exit: "dive", particles: "ash", subjectZoom: 1.1, rot: -0.8, occlude: "gate", dolly: 1.35, rays: 0.15, bloom: 0.25, wow: "push" },
    candle: { mode: "breathe", grade: [145, 90, 48], gradeOp: 0.3, depth: 0.7, exit: "bloom", particles: "motes", subjectZoom: 1.05, rot: 0.15, occlude: "curtain", dolly: 1.0, rays: 0.45, bloom: 0.4, wow: "warm" },
    intimate: { mode: "rack", grade: [88, 42, 58], gradeOp: 0.26, depth: 0.45, exit: "soft", particles: "fae", subjectZoom: 1.2, rot: 0, occlude: "iris", dolly: 0.7, rays: 0.55, bloom: 0.55, wow: "heart" },
    orbit: { mode: "waltz", grade: [118, 55, 68], gradeOp: 0.28, depth: 0.85, exit: "sweep", particles: "spark", subjectZoom: 1.07, rot: 1.8, occlude: "pillars", dolly: 1.05, rays: 0.4, bloom: 0.35, wow: "spin" },
    vow: { mode: "hold", grade: [130, 70, 80], gradeOp: 0.28, depth: 0.5, exit: "warm", particles: "fae", subjectZoom: 1.12, rot: 0.2, occlude: "iris", dolly: 0.75, rays: 0.5, bloom: 0.45, wow: "heart" },
    dawn: { mode: "lift", grade: [185, 140, 85], gradeOp: 0.24, depth: 0.6, exit: "rise", particles: "petal", subjectZoom: 1.04, rot: 0, occlude: "ground", dolly: 0.9, rays: 0.7, bloom: 0.5, wow: "dawn" },
    storm: { mode: "shake", grade: [24, 38, 78], gradeOp: 0.42, depth: 1.35, exit: "crash", particles: "rain", subjectZoom: 1.09, rot: -1.4, lightning: true, occlude: "storm-top", dolly: 1.35, rays: 0.1, bloom: 0.15, wow: "storm" },
    hearth: { mode: "hold", grade: [130, 78, 40], gradeOp: 0.24, depth: 0.4, exit: "warm", particles: "embers", subjectZoom: 1.14, rot: 0, occlude: "hearth", dolly: 0.65, rays: 0.5, bloom: 0.45, wow: "warm" },
    sacred: { mode: "radiate", grade: [210, 170, 95], gradeOp: 0.4, depth: 0.5, exit: "halo", particles: "gold", subjectZoom: 1.24, rot: 0, occlude: "halo", dolly: 0.9, rays: 1, bloom: 0.85, wow: "miracle" },
    awe: { mode: "retreat", grade: [160, 120, 70], gradeOp: 0.3, depth: 0.65, exit: "pull", particles: "stardust", subjectZoom: 1.1, rot: 0.25, occlude: "frame", dolly: 0.75, rays: 0.65, bloom: 0.55, wow: "awe" },
    echo: { mode: "settle", grade: [38, 55, 88], gradeOp: 0.32, depth: 0.5, exit: "fade", particles: "stardust", subjectZoom: 1.02, rot: 0, occlude: "mist-bank", dolly: 0.6, rays: 0.45, bloom: 0.4, wow: "soft" },
  };

  const CHAPTERS = [
    {
      no: 1,
      title: "The Sleeping Kingdom",
      scenes: [
        { src: "./assets/scenes/scene-01-kingdom.jpg", title: "A Kingdom in Darkness", line: "Long before candles were lit… a kingdom dreamed in silence.", whisper: "A family dreamed of light in the dark.", focus: "50% 42%", vibe: "moonlit", feel: FEEL.moonlit },
        { src: "./assets/scenes/scene-02-gates.jpg", title: "The Threshold", line: "Love walked toward a future it could not yet name.", whisper: "Through fog and fire, two hearts kept going.", focus: "50% 62%", vibe: "embers", feel: FEEL.embers },
        { src: "./assets/scenes/scene-03-ballroom.jpg", title: "Halls of Gold", line: "They built beauty the way others build shelter.", whisper: "Candlelight… a promise held in gold.", focus: "50% 45%", vibe: "candle", feel: FEEL.candle },
      ],
    },
    {
      no: 2,
      title: "Two Souls Meet",
      scenes: [
        { src: "./assets/scenes/scene-04-first-look.jpg", title: "The First Look", line: "Two souls — mother, father — chose each other.", whisper: "In that hush… a family began.", focus: "50% 36%", vibe: "intimate", feel: FEEL.intimate },
        { src: "./assets/scenes/scene-05-dance.jpg", title: "A Dance of Fate", line: "Side by side, they learned a gentler rhythm.", whisper: "Step by step — a life made for love.", focus: "50% 42%", vibe: "orbit", feel: FEEL.orbit },
        { src: "./assets/scenes/scene-06-promise.jpg", title: "A Quiet Vow", line: "Their hands found a promise without needing words.", whisper: "Some oaths are written only in the eyes.", focus: "50% 40%", vibe: "intimate", feel: FEEL.vow },
      ],
    },
    {
      no: 3,
      title: "Hope in the Storm",
      scenes: [
        { src: "./assets/scenes/scene-07-chapter.jpg", title: "Seasons of Hope", line: "They gathered hope the way gardeners gather light.", whisper: "Every bloom was planted for someone precious.", focus: "46% 40%", vibe: "dawn", feel: FEEL.dawn },
        { src: "./assets/scenes/scene-08-storm.jpg", title: "The Waiting Storm", line: "Storms came — and still they waited with open arms.", whisper: "Love does not flee the thunder.", focus: "50% 48%", vibe: "storm", feel: FEEL.storm },
      ],
    },
    {
      no: 4,
      title: "The Brightest Flame",
      scenes: [
        { src: "./assets/scenes/scene-09-birth.jpg", title: "Born of Love", line: "From their devotion… a daughter.", whisper: "And the dark forgot, for a moment, to be cruel.", focus: "50% 45%", vibe: "hearth", feel: FEEL.hearth },
        { src: "./assets/scenes/scene-10-special-child.jpg", title: "Their Brightest Flame", line: "A light so rare, the world had to soften around her.", whisper: "She became the reason every candle was lit.", focus: "50% 48%", vibe: "sacred", feel: FEEL.sacred },
        { src: "./assets/scenes/scene-11-realization.jpg", title: "They Knew", line: "This love would need a kingdom of its own.", whisper: "So they began to build — story, scent, and art.", focus: "50% 40%", vibe: "awe", feel: FEEL.awe },
      ],
    },
    {
      no: 5,
      title: "The Real Beginning",
      scenes: [
        { src: "./assets/scenes/scene-12-beginning.jpg", title: "One Light Remains", line: "The fairy tale opens… into a family’s true story.", whisper: "Candle Artistry Design — made for their daughter.", focus: "52% 40%", vibe: "echo", feel: FEEL.echo },
      ],
    },
  ];

  const STORY = [];
  CHAPTERS.forEach((ch) => {
    const start = STORY.length;
    ch.scenes.forEach((sc, si) => {
      STORY.push({
        ...sc,
        chapter: ch.no,
        chapterTitle: ch.title,
        sceneInChapter: si + 1,
        scenesInChapter: ch.scenes.length,
        chapterStartIndex: start,
      });
    });
  });


  const DEPTH = { bg: 0.18, mid: 0.42, sub: 0.78, fg: 1.25, occ: 1.55 };
  const N = STORY.length;
  const SHOT_RUN = 580;
  const OVERLAP = 0.38;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cinema = document.getElementById("cinema");
  const stage = document.getElementById("stage");
  const world = document.getElementById("world");
  const veil = document.getElementById("veil");
  const beatsEl = document.getElementById("beats");
  const again = document.getElementById("again");
  const canvas = document.getElementById("atmoCanvas");
  const ctx = canvas.getContext("2d");
  const prologue = document.getElementById("prologue");
  const whisperEl = document.getElementById("whisper");
  const raysEl = document.getElementById("rays");
  const bloomEl = document.getElementById("bloom");
  const sparkleVeil = document.getElementById("sparkleVeil");

  if (veil) veil.style.display = "none";

  cinema.style.height = `calc(100vh + ${N * SHOT_RUN}px)`;
  stage.classList.add("is-fixed-fallback");

  let camera = world.querySelector(".camera");
  if (!camera) {
    camera = document.createElement("div");
    camera.className = "camera";
    camera.id = "camera";
    while (world.firstChild) camera.appendChild(world.firstChild);
    world.appendChild(camera);
  }

  const gradeEl = document.createElement("div");
  gradeEl.className = "grade";
  stage.appendChild(gradeEl);

  const flashEl = document.createElement("div");
  flashEl.className = "flash";
  stage.appendChild(flashEl);

  const wowEl = document.createElement("div");
  wowEl.className = "wow-flare";
  wowEl.id = "wowFlare";
  stage.appendChild(wowEl);

  const chapterCard = document.createElement("div");
  chapterCard.className = "chapter-card";
  chapterCard.id = "chapterCard";
  chapterCard.innerHTML = `
    <p class="chapter-card__kicker"></p>
    <h2 class="chapter-card__title"></h2>
    <div class="chapter-card__ornament" aria-hidden="true"></div>
  `;
  stage.appendChild(chapterCard);

  function media(src, focus) {
    const wrap = document.createElement("div");
    wrap.className = "layer__media";
    const img = document.createElement("img");
    img.src = src;
    img.alt = "";
    img.draggable = false;
    img.style.objectPosition = focus || "50% 50%";
    wrap.appendChild(img);
    return wrap;
  }

  STORY.forEach((beat, i) => {
    const shot = document.createElement("article");
    shot.className = `shot vibe-${beat.vibe}`;
    shot.dataset.shot = String(i);
    shot.dataset.occlude = beat.feel.occlude;
    shot.dataset.wow = beat.feel.wow || "soft";
    shot.style.zIndex = String(i + 1);

    const bg = document.createElement("div");
    bg.className = "layer layer--bg";
    bg.appendChild(media(beat.src, beat.focus));

    const mid = document.createElement("div");
    mid.className = "layer layer--mid";
    mid.appendChild(media(beat.src, beat.focus));

    const subject = document.createElement("div");
    subject.className = "layer layer--subject";
    subject.appendChild(media(beat.src, beat.focus));

    const fg = document.createElement("div");
    fg.className = "layer layer--fg";
    fg.appendChild(media(beat.src, beat.focus));

    const occ = document.createElement("div");
    occ.className = `layer layer--occlude occlude-${beat.feel.occlude}`;
    if (beat.feel.occlude === "gate") {
      occ.innerHTML = `<div class="gate gate--l"></div><div class="gate gate--r"></div>`;
    }

    const haze = document.createElement("div");
    haze.className = "layer layer--haze";

    const glow = document.createElement("div");
    glow.className = "layer layer--ethereal";

    const atmo = document.createElement("div");
    atmo.className = "layer layer--atmo";

    const type = document.createElement("div");
    type.className = "layer layer--type";
    type.innerHTML = `
      <div class="shot__ornament" aria-hidden="true"></div>
      <p class="shot__kicker">Chapter ${String(beat.chapter).padStart(2, "0")} · Scene ${beat.sceneInChapter}</p>
      <h2 class="shot__title">${beat.title}</h2>
      <p class="shot__line"><span class="shot__typed"></span><span class="shot__caret" aria-hidden="true"></span></p>
    `;

    shot.append(bg, mid, subject, fg, occ, haze, glow, atmo, type);
    camera.appendChild(shot);
  });

  // Five chapter navigation dots
  CHAPTERS.forEach((ch) => {
    const startIdx = STORY.findIndex((b) => b.chapter === ch.no);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "beat-dot";
    btn.title = `Chapter ${ch.no}: ${ch.title}`;
    btn.setAttribute("aria-label", `Chapter ${ch.no}: ${ch.title}`);
    btn.dataset.chapter = String(ch.no);
    btn.addEventListener("click", () => {
      window.scrollTo({
        top: startIdx * SHOT_RUN + innerHeight * 0.05,
        behavior: reduced ? "auto" : "smooth",
      });
    });
    beatsEl.appendChild(btn);
  });

  const shots = [...camera.querySelectorAll(".shot")];
  const dots = [...beatsEl.querySelectorAll(".beat-dot")];

  // --- Typewriter state ---
  const typewriter = {
    shot: -1,
    chars: 0,
    full: "",
    acc: 0,
    active: false,
  };

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smoothstep = (e0, e1, x) => {
    const t = clamp((x - e0) / (e1 - e0), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const easeInOut = (t) => {
    const x = clamp(t, 0, 1);
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };
  const easeOut = (t) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
  const easeIn = (t) => Math.pow(clamp(t, 0, 1), 2.4);

  function shotWeight(exact, i) {
    const fadeInStart = i - OVERLAP;
    const fadeInEnd = i;
    const fadeOutStart = i + 1 - OVERLAP;
    const fadeOutEnd = i + 1;
    if (exact < fadeInStart || exact > fadeOutEnd) return 0;
    let w = 1;
    if (i > 0 && exact < fadeInEnd) w = easeInOut(smoothstep(fadeInStart, fadeInEnd, exact));
    if (i < N - 1 && exact > fadeOutStart) w *= 1 - easeInOut(smoothstep(fadeOutStart, fadeOutEnd, exact));
    if (i === 0 && exact < 0.1) w *= easeInOut(smoothstep(0, 0.1, exact));
    return clamp(w, 0, 1);
  }

  const shotLocal = (exact, i) => clamp(exact - i, 0, 1);
  const exitAmount = (exact, i) =>
    i >= N - 1 ? 0 : easeInOut(smoothstep(i + 1 - OVERLAP, i + 1, exact));
  const enterAmount = (exact, i) =>
    i === 0 ? 1 : easeInOut(smoothstep(i - OVERLAP, i, exact));

  const look = { x: 0, y: 0, tx: 0, ty: 0 };
  window.addEventListener(
    "pointermove",
    (e) => {
      if (reduced) return;
      look.tx = clamp(e.clientX / innerWidth - 0.5, -0.5, 0.5);
      look.ty = clamp(e.clientY / innerHeight - 0.5, -0.5, 0.5);
    },
    { passive: true }
  );

  let smooth = 0;
  let lastTs = performance.now();
  let activeShot = 0;
  let particleMode = "stardust";
  let particles = [];
  let time = 0;
  let lastWhisper = "";

  const TEXT_IN = 0.08;
  const TEXT_PEAK = 0.16;
  const TEXT_HOLD = 0.34;
  const TEXT_OUT = 0.46;
  // First chapter captions wait until opening title card has cleared
  const PROLOGUE_FADE = SHOT_RUN * 0.32;
  let prologueClear = 1; // 1 = fully gone, 0 = fully showing

  const scrollPx = () => clamp(window.scrollY, 0, N * SHOT_RUN);

  function dollyAmount(local, amp) {
    const holdEnd = 1 - OVERLAP;
    return easeInOut(clamp(local / holdEnd, 0, 1)) * amp;
  }

  // Peak wow pulse near mid-hold of emotional beats
  function wowPulse(local, kind) {
    const peak = smoothstep(0.12, 0.28, local) * (1 - smoothstep(0.42, 0.58, local));
    const boost =
      kind === "miracle" ? 1.35 :
      kind === "heart" || kind === "awe" ? 1.15 :
      kind === "dawn" ? 1.1 :
      kind === "storm" ? 0.7 :
      1;
    return peak * boost;
  }

  function exitMotion(style, t, lx, ly) {
    const e = easeInOut(t);
    switch (style) {
      case "iris":
        return { s: lerp(1, 1.28, e), x: lx * 3, y: lerp(0, -10, e), r: 0, blur: e * 2.2 };
      case "dive":
        return { s: lerp(1, 1.45, e), x: lx * 5, y: lerp(0, -36, e), r: lerp(0, -0.9, e), blur: e * 2.8 };
      case "bloom":
        return { s: lerp(1, 1.16, e), x: lx * 2, y: ly * 2, r: 0, blur: e * 3.5, bright: lerp(1, 1.25, e) };
      case "soft":
        return { s: lerp(1, 1.12, e), x: lx * 2, y: lerp(0, -5, e), r: 0, blur: e * 4.5 };
      case "sweep":
        return { s: lerp(1, 1.25, e), x: lerp(0, 24, e) + lx * 7, y: lerp(0, -12, e), r: lerp(0, 1.2, e), blur: e * 2.2 };
      case "rise":
        return { s: lerp(1, 1.2, e), x: lx * 2, y: lerp(0, -26, e), r: 0, blur: e * 1.8 };
      case "crash":
        return { s: lerp(1, 1.55, e), x: lx * 8, y: lerp(0, -44, e), r: lerp(0, -1.5, e), blur: e * 3.5 };
      case "warm":
        return { s: lerp(1, 1.14, e), x: lx * 2, y: ly, r: 0, blur: e * 3, bright: lerp(1, 1.14, e) };
      case "halo":
        return { s: lerp(1, 1.35, e), x: 0, y: 0, r: 0, blur: e * 2.5, bright: lerp(1, 1.4, e) };
      case "pull":
        return { s: lerp(1, 0.9, e), x: lx * 3, y: lerp(0, 8, e), r: 0, blur: e * 2.8 };
      default:
        return { s: lerp(1, 1.06, e), x: 0, y: lerp(0, -5, e), r: 0, blur: e * 3 };
    }
  }

  function enterMotion(t) {
    const u = 1 - easeOut(t);
    return { s: lerp(1, 1.06, u), x: 0, y: lerp(0, 12, u), blur: u * 1.8 };
  }

  function depthPlanes(mode, local, depthAmp, rotAmp, lx, ly, dolly, tsec) {
    const hold = easeInOut(clamp(local / (1 - OVERLAP), 0, 1));
    const breathe = Math.sin(tsec * 0.45) * 0.01;
    let drift = { x: 0, y: 0, ang: 0 };
    switch (mode) {
      case "pan-left":
        drift = { x: lerp(18, -24, hold), y: lerp(3, -5, hold), ang: 0 };
        break;
      case "dive":
        drift = { x: lx * -4, y: lerp(20, -34, hold), ang: rotAmp * hold };
        break;
      case "breathe":
        drift = { x: Math.sin(tsec * 0.32) * 3, y: breathe * 36, ang: 0 };
        break;
      case "rack":
        drift = { x: 0, y: lerp(2, -8, hold), ang: 0 };
        break;
      case "waltz": {
        const ang = hold * Math.PI * 1.15;
        drift = { x: Math.cos(ang) * 14, y: Math.sin(ang) * 8, ang: rotAmp * Math.sin(ang) };
        break;
      }
      case "lift":
        drift = { x: 0, y: lerp(26, -10, hold), ang: 0 };
        break;
      case "shake": {
        const j = hold > 0.08 && hold < 0.92 ? Math.sin(tsec * 24) * 1.15 : 0;
        drift = { x: j * 4, y: lerp(4, -30, hold), ang: rotAmp * hold };
        break;
      }
      case "hold":
        drift = { x: Math.sin(tsec * 0.28) * 2, y: breathe * 18, ang: 0 };
        break;
      case "radiate":
        drift = { x: 0, y: 0, ang: 0 };
        break;
      case "retreat":
        drift = { x: 0, y: lerp(-4, 12, hold), ang: rotAmp * (1 - hold) * 0.25 };
        break;
      default:
        drift = { x: lerp(6, -8, hold), y: lerp(4, -6, hold), ang: 0 };
    }

    const plane = (key, baseS, extraS = 0) => {
      const k = DEPTH[key] * depthAmp;
      const dollyScale = 1 + dolly * (0.04 + DEPTH[key] * 0.22) + extraS;
      return {
        x: drift.x * k + lx * (-18 * k) + (key === "fg" || key === "occ" ? lx * 8 : 0),
        y: drift.y * k + ly * (-12 * k) - dolly * (8 + DEPTH[key] * 28),
        s: baseS * dollyScale + (key === "sub" || key === "bg" ? breathe : 0),
        r: drift.ang * (key === "mid" || key === "sub" ? 0.55 : key === "fg" ? 0.35 : 0.15),
      };
    };

    const subExtra = mode === "retreat" ? -dolly * 0.08 : mode === "radiate" ? dolly * 0.08 : 0;
    return {
      bg: plane("bg", 1.1),
      mid: plane("mid", 1.14),
      sub: plane("sub", 1.05, subExtra),
      fg: plane("fg", 1.08),
      occ: plane("occ", 1.02),
    };
  }

  function applyShot(shotEl, i, exact, globalLook) {
    const beat = STORY[i];
    const feel = beat.feel;
    const weight = shotWeight(exact, i);
    if (weight < 0.004) {
      shotEl.style.opacity = "0";
      shotEl.style.visibility = "hidden";
      shotEl.classList.remove("is-live");
      return;
    }

    const local = shotLocal(exact, i);
    const exitT = exitAmount(exact, i);
    const enterT = enterAmount(exact, i);
    const dolly = dollyAmount(local, feel.dolly || 1);
    const pulse = wowPulse(local, feel.wow);

    const bg = shotEl.querySelector(".layer--bg");
    const mid = shotEl.querySelector(".layer--mid");
    const subject = shotEl.querySelector(".layer--subject");
    const fg = shotEl.querySelector(".layer--fg");
    const occ = shotEl.querySelector(".layer--occlude");
    const haze = shotEl.querySelector(".layer--haze");
    const glow = shotEl.querySelector(".layer--ethereal");
    const atmo = shotEl.querySelector(".layer--atmo");
    const type = shotEl.querySelector(".layer--type");

    shotEl.classList.add("is-live");
    shotEl.style.visibility = "visible";
    shotEl.style.opacity = String(weight);

    const lx = globalLook.x;
    const ly = globalLook.y;
    const planes = depthPlanes(feel.mode, local, feel.depth, feel.rot, lx, ly, dolly, time);
    const ex = exitMotion(feel.exit, exitT, lx, ly);
    const en = enterMotion(enterT);

    const mix = (m, near = false) => ({
      x: m.x + ex.x * (near ? 1.1 : 0.75) + en.x,
      y: m.y + ex.y * (near ? 1.1 : 0.75) + en.y,
      s: m.s * lerp(1, ex.s, exitT * (near ? 1.15 : 0.85)) * en.s,
      r: (m.r || 0) + (ex.r || 0) * (near ? 1 : 0.6),
    });

    const exitBlur = ex.blur || 0;
    const enterBlur = en.blur || 0;
    const bright = (ex.bright || 1) * (1 + pulse * 0.06);

    const setLayer = (el, m, blur = 0, op = 1) => {
      if (!el) return;
      el.style.transform = `translate3d(${m.x.toFixed(2)}px, ${m.y.toFixed(2)}px, 0) scale(${m.s.toFixed(4)}) rotate(${(m.r || 0).toFixed(3)}deg)`;
      const b = blur + exitBlur * 0.5 + enterBlur;
      const filters = [];
      if (b > 0.04) filters.push(`blur(${b.toFixed(2)}px)`);
      if (Math.abs(bright - 1) > 0.01) filters.push(`brightness(${bright.toFixed(3)})`);
      el.style.filter = filters.length ? filters.join(" ") : "none";
      el.style.opacity = String(op);
    };

    const rackBlur = feel.mode === "rack" ? lerp(2.2, 0.1, smoothstep(0.05, 0.42, local)) : 0;

    setLayer(bg, mix(planes.bg), 0.4 + local * 0.12 * feel.depth + rackBlur * 0.25, 1);
    setLayer(mid, mix(planes.mid), rackBlur + exitT * 0.6, lerp(0.8, 0.4, exitT));

    const sub = mix(planes.sub);
    sub.s *= (feel.subjectZoom / 1.08) * (1 + pulse * 0.015);
    setLayer(subject, sub, exitT * 0.25, 1);

    const subImg = subject.querySelector("img");
    if (subImg) {
      subImg.style.transform = `translate3d(${(-lx * 16 - dolly * 6).toFixed(1)}px, ${(-ly * 11 - dolly * 4).toFixed(1)}px, 0) scale(1.06)`;
    }

    setLayer(fg, mix(planes.fg, true), 0.2 + dolly * 0.35, lerp(0.55, 0.18, exitT) * lerp(0.35, 1, enterT));

    if (occ) {
      setLayer(occ, mix(planes.occ, true), 0, lerp(0.85, 0.22, exitT));
      if (feel.occlude === "gate") {
        const part = easeIn(dolly / Math.max(feel.dolly, 0.01));
        const gl = occ.querySelector(".gate--l");
        const gr = occ.querySelector(".gate--r");
        if (gl) gl.style.transform = `translate3d(${(-part * 58).toFixed(2)}%, 0, 0)`;
        if (gr) gr.style.transform = `translate3d(${(part * 58).toFixed(2)}%, 0, 0)`;
      }
      if (feel.occlude === "iris" || feel.occlude === "halo") {
        occ.style.setProperty("--iris-open", `${lerp(40, 82, easeOut(dolly / Math.max(feel.dolly, 0.01)) + pulse * 0.08)}%`);
      }
    }

    if (haze) {
      const hazeOp = clamp(Math.sin((dolly / Math.max(feel.dolly, 0.01)) * Math.PI) * 0.32 + pulse * 0.08, 0, 0.45);
      haze.style.opacity = String(hazeOp * (1 - exitT * 0.5));
      haze.style.transform = `translate3d(${(lx * 14).toFixed(1)}px, ${(ly * 8 - dolly * 10).toFixed(1)}px, 0) scale(${(1 + dolly * 0.08).toFixed(3)})`;
    }

    // Ethereal inner glow — peaks on wow beats
    if (glow) {
      glow.style.opacity = String(clamp((feel.bloom || 0.3) * 0.55 * pulse + dolly * 0.08, 0, 0.7) * weight);
      glow.style.transform = `translate3d(${(lx * 6).toFixed(1)}px, ${(ly * 4).toFixed(1)}px, 0) scale(${(1 + pulse * 0.12).toFixed(3)})`;
    }

    atmo.style.opacity = String(lerp(0.4, 0.65, exitT));
    atmo.style.transform = `translate3d(${(lx * 10).toFixed(1)}px, ${(ly * 6 - dolly * 6).toFixed(1)}px, 0)`;

    const inCross = enterT < 0.92 || exitT > 0.06;
    const textIn = i === 0 ? 0.34 : TEXT_IN;
    const textPeak = i === 0 ? 0.42 : TEXT_PEAK;
    const textHold = i === 0 ? 0.62 : 0.5;
    const textOut = i === 0 ? 0.74 : TEXT_OUT;
    let typeOp = inCross
      ? 0
      : clamp(
          smoothstep(textIn, textPeak, local) * (1 - smoothstep(textHold, textOut, local)),
          0,
          1
        );
    if (i === 0) typeOp *= prologueClear;
    const typeY =
      lerp(20, 0, smoothstep(textIn, textPeak, local)) +
      lerp(0, -26, smoothstep(textHold, textOut, local)) -
      dolly * 8;
    type.style.opacity = String(typeOp);
    type.style.transform = `translate3d(0, ${typeY.toFixed(1)}px, 0) scale(${(1 - dolly * 0.02 + pulse * 0.02).toFixed(3)})`;

    // Typewriter — start when captions are readable
    const typedEl = type.querySelector(".shot__typed");
    const caretEl = type.querySelector(".shot__caret");
    if (typedEl) {
      if (typeOp > 0.35 && !inCross) {
        if (typewriter.shot !== i) {
          typewriter.shot = i;
          typewriter.full = beat.line;
          typewriter.chars = reduced ? beat.line.length : 0;
          typewriter.acc = 0;
          typewriter.active = true;
          typedEl.textContent = reduced ? beat.line : "";
        }
        typedEl.textContent = typewriter.full.slice(0, typewriter.chars);
        if (caretEl) {
          caretEl.classList.toggle("is-on", typewriter.chars < typewriter.full.length);
        }
      } else if (typeOp < 0.08) {
        if (typewriter.shot === i) {
          typewriter.active = false;
          typewriter.shot = -1;
        }
        typedEl.textContent = "";
        if (caretEl) caretEl.classList.remove("is-on");
      }
    }
  }

  function parseGrade(arr) {
    return { r: arr[0], g: arr[1], b: arr[2] };
  }

  function render(scroll) {
    const exact = clamp(scroll / SHOT_RUN, 0, N - 0.0001);
    activeShot = clamp(Math.floor(exact), 0, N - 1);

    const i0 = activeShot;
    const i1 = Math.min(activeShot + 1, N - 1);
    const cross = i0 < N - 1 ? exitAmount(exact, i0) : 0;
    const g0 = parseGrade(STORY[i0].feel.grade);
    const g1 = parseGrade(STORY[i1].feel.grade);
    gradeEl.style.setProperty(
      "--grade-rgb",
      `${Math.round(lerp(g0.r, g1.r, cross))}, ${Math.round(lerp(g0.g, g1.g, cross))}, ${Math.round(lerp(g0.b, g1.b, cross))}`
    );
    gradeEl.style.opacity = String(lerp(STORY[i0].feel.gradeOp, STORY[i1].feel.gradeOp, cross));
    gradeEl.style.transition = "none";

    const feel = cross > 0.5 ? STORY[i1].feel : STORY[i0].feel;
    const beat = cross > 0.5 ? STORY[i1] : STORY[i0];
    const local = exact - activeShot;
    const dolly = dollyAmount(local, feel.dolly || 1);
    const pulse = wowPulse(local, feel.wow) * (1 - cross * 0.7);

    // Prologue title dissolves before Chapter 01 captions appear
    if (prologue) {
      const pOp = clamp(1 - scroll / PROLOGUE_FADE, 0, 1);
      prologueClear = 1 - easeInOut(pOp);
      prologue.style.opacity = String(easeOut(pOp));
      prologue.style.transform = `translate3d(-50%, calc(-50% - ${(1 - pOp) * 36}px), 0) scale(${(1 + (1 - pOp) * 0.04).toFixed(3)})`;
      const gone = pOp < 0.02;
      prologue.classList.toggle("is-gone", gone);
      prologue.style.visibility = gone ? "hidden" : "visible";
      prologue.style.pointerEvents = "none";
    } else {
      prologueClear = 1;
    }

    // God rays + bloom overlays
    const rayStrength = lerp(feel.rays || 0.3, STORY[i1].feel.rays || 0.3, cross);
    const bloomStrength = lerp(feel.bloom || 0.3, STORY[i1].feel.bloom || 0.3, cross);
    if (raysEl) {
      raysEl.style.opacity = String(clamp(rayStrength * (0.35 + pulse * 0.55 + dolly * 0.15) * (1 - cross * 0.3), 0, 0.85));
      raysEl.style.transform = `translate3d(${(look.x * 12).toFixed(1)}px, ${(look.y * 6 - dolly * 8).toFixed(1)}px, 0) rotate(${(look.x * 4).toFixed(2)}deg)`;
    }
    if (bloomEl) {
      bloomEl.style.opacity = String(clamp(bloomStrength * (0.25 + pulse * 0.6), 0, 0.75));
    }
    if (sparkleVeil) {
      sparkleVeil.style.opacity = String(clamp(pulse * 0.45 + (feel.wow === "miracle" ? 0.15 : 0), 0, 0.55));
    }
    if (wowEl) {
      wowEl.style.opacity = String(clamp(pulse * (feel.wow === "miracle" ? 0.55 : 0.28), 0, 0.6));
      wowEl.dataset.kind = feel.wow || "soft";
    }

    // Floating whisper — ethereal storyteller line
    if (whisperEl) {
      const wIn = smoothstep(0.18, 0.28, local) * (1 - smoothstep(0.4, 0.52, local)) * (1 - cross);
      if (beat.whisper !== lastWhisper && wIn > 0.2) {
        whisperEl.textContent = beat.whisper;
        lastWhisper = beat.whisper;
      }
      whisperEl.style.opacity = String(clamp(wIn * 0.92, 0, 1) * prologueClear);
      whisperEl.style.transform = `translate3d(-50%, ${(-10 - dolly * 6).toFixed(1)}px, 0)`;
    }

    if (camera) {
      const camS = 1 + dolly * 0.038 * (1 - cross) + pulse * 0.012;
      camera.style.transform = `translate3d(${(look.x * 7).toFixed(2)}px, ${(-dolly * 7 * (1 - cross)).toFixed(2)}px, 0) scale(${camS.toFixed(4)})`;
    }

    // Soft letterbox breathes with story intensity
    const bars = stage.querySelectorAll(".letterbox__bar");
    const box = 0.035 + pulse * 0.025 + (feel.wow === "miracle" ? 0.02 : 0);
    bars.forEach((b) => {
      b.style.transform = `scaleY(${(1 + box * 8).toFixed(3)})`;
      b.style.opacity = String(0.75 + pulse * 0.2);
    });

    if (feel.lightning && !reduced) {
      const bolt =
        Math.sin(local * Math.PI * 9 + time * 2) > 0.94 || (local > 0.22 && local < 0.255)
          ? 0.32
          : 0;
      flashEl.style.opacity = String(bolt * (1 - cross));
    } else {
      flashEl.style.opacity = "0";
    }

    if (feel.particles !== particleMode) {
      particleMode = feel.particles;
      spawnParticles(particleMode);
    }

    shots.forEach((shot, i) => {
      if (Math.abs(exact - i) > 1.25 && Math.abs(exact - (i + 1)) > 1.25) {
        shot.style.opacity = "0";
        shot.style.visibility = "hidden";
        shot.classList.remove("is-live");
        return;
      }
      applyShot(shot, i, exact, look);
    });

    dots.forEach((d) => {
      const ch = Number(d.dataset.chapter);
      d.classList.toggle("is-active", ch === STORY[activeShot].chapter);
    });

    // Chapter title card on chapter entry
    const chBeat = STORY[activeShot];
    const onChapterOpen = activeShot === chBeat.chapterStartIndex;
    let cardOp = 0;
    if (onChapterOpen && prologueClear > 0.85) {
      cardOp = smoothstep(0.02, 0.1, local) * (1 - smoothstep(0.22, 0.36, local));
      if (activeShot === 0) cardOp *= prologueClear;
    }
    chapterCard.style.opacity = String(cardOp);
    chapterCard.style.visibility = cardOp > 0.02 ? "visible" : "hidden";
    if (cardOp > 0.02) {
      chapterCard.querySelector(".chapter-card__kicker").textContent = `Chapter ${String(chBeat.chapter).padStart(2, "0")}`;
      chapterCard.querySelector(".chapter-card__title").textContent = chBeat.chapterTitle;
    }

    stage.classList.toggle("is-done", window.scrollY > N * SHOT_RUN + innerHeight * 0.28);
  }

  function spawnParticles(mode) {
    if (reduced) {
      particles = [];
      return;
    }
    const configs = {
      stardust: { n: 48, kind: "stardust" },
      fae: { n: 36, kind: "fae" },
      fog: { n: 14, kind: "fog" },
      ash: { n: 28, kind: "ash" },
      motes: { n: 26, kind: "motes" },
      bokeh: { n: 14, kind: "bokeh" },
      spark: { n: 38, kind: "spark" },
      petal: { n: 20, kind: "petal" },
      rain: { n: 56, kind: "rain" },
      embers: { n: 28, kind: "embers" },
      gold: { n: 42, kind: "gold" },
      dust: { n: 20, kind: "dust" },
    };
    const cfg = configs[mode] || configs.stardust;
    particles = Array.from({ length: cfg.n }, () => makeParticle(cfg.kind));
  }

  function makeParticle(kind) {
    const base = { kind, x: Math.random() * innerWidth, y: Math.random() * innerHeight, z: Math.random(), life: Math.random() * Math.PI * 2 };
    switch (kind) {
      case "stardust":
        return { ...base, r: 0.4 + Math.random() * 1.4, a: 0.2 + Math.random() * 0.45, vx: (Math.random() - 0.5) * 0.15, vy: -0.08 - Math.random() * 0.2, twinkle: true };
      case "fae":
        return { ...base, r: 1.2 + Math.random() * 2.8, a: 0.2 + Math.random() * 0.35, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, twinkle: true, soft: true };
      case "fog":
        return { ...base, r: 40 + Math.random() * 70, a: 0.03 + Math.random() * 0.04, vx: 0.15 + Math.random() * 0.25, vy: (Math.random() - 0.5) * 0.08 };
      case "ash":
        return { ...base, r: 0.8 + Math.random() * 1.6, a: 0.15 + Math.random() * 0.25, vx: (Math.random() - 0.5) * 0.4, vy: 0.4 + Math.random() * 0.7 };
      case "motes":
        return { ...base, r: 0.4 + Math.random() * 0.9, a: 0.12 + Math.random() * 0.2, vx: (Math.random() - 0.5) * 0.12, vy: -0.08 - Math.random() * 0.12 };
      case "bokeh":
        return { ...base, r: 8 + Math.random() * 22, a: 0.06 + Math.random() * 0.1, vx: (Math.random() - 0.5) * 0.08, vy: (Math.random() - 0.5) * 0.06, soft: true };
      case "spark":
        return { ...base, r: 0.6 + Math.random() * 1.2, a: 0.3 + Math.random() * 0.4, vx: (Math.random() - 0.5) * 0.6, vy: -0.5 - Math.random() * 1.2, twinkle: true };
      case "petal":
        return { ...base, r: 2 + Math.random() * 3, a: 0.2 + Math.random() * 0.25, vx: (Math.random() - 0.5) * 0.35, vy: 0.25 + Math.random() * 0.35, sway: Math.random() * Math.PI * 2 };
      case "rain":
        return { ...base, r: 1, a: 0.12 + Math.random() * 0.2, vx: -0.6, vy: 10 + Math.random() * 7 };
      case "embers":
        return { ...base, r: 1 + Math.random() * 2, a: 0.25 + Math.random() * 0.35, vx: (Math.random() - 0.5) * 0.3, vy: -0.4 - Math.random() * 0.7 };
      case "gold":
        return { ...base, r: 0.8 + Math.random() * 2.2, a: 0.35 + Math.random() * 0.45, vx: (Math.random() - 0.5) * 0.22, vy: -0.25 - Math.random() * 0.4, twinkle: true, soft: true };
      default:
        return { ...base, r: 0.5 + Math.random() * 1, a: 0.1 + Math.random() * 0.15, vx: (Math.random() - 0.5) * 0.1, vy: -0.05 - Math.random() * 0.1 };
    }
  }

  function resizeAtmo() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    spawnParticles(particleMode);
  }

  function drawAtmo() {
    if (!ctx || reduced) return;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.globalAlpha = 0.9;

    for (const p of particles) {
      if (p.kind === "petal") {
        p.sway += 0.02;
        p.x += p.vx + Math.sin(p.sway) * 0.4 + look.x * 0.2;
      } else if (p.kind === "fae") {
        p.life += 0.04;
        p.x += p.vx + Math.sin(p.life) * 0.5 + look.x * 0.3;
        p.y += p.vy + Math.cos(p.life * 0.8) * 0.4;
      } else {
        p.x += p.vx + look.x * (p.twinkle ? 0.3 : 0.16);
        p.y += p.vy + look.y * 0.05;
      }
      p.life = (p.life || 0) + 0.012;

      if (p.y < -30) {
        p.y = innerHeight + 20;
        p.x = Math.random() * innerWidth;
      }
      if (p.y > innerHeight + 30) {
        p.y = -20;
        p.x = Math.random() * innerWidth;
      }
      if (p.x < -40) p.x = innerWidth + 20;
      if (p.x > innerWidth + 40) p.x = -20;

      if (p.kind === "rain") {
        ctx.strokeStyle = `rgba(185,205,255,${p.a})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.vx * 2.2, p.y + 12);
        ctx.stroke();
        continue;
      }
      if (p.kind === "fog") {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(160,180,210,${p.a})`);
        g.addColorStop(1, "rgba(160,180,210,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }
      if (p.soft || p.kind === "bokeh" || p.kind === "fae" || p.kind === "gold") {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.2);
        const pulse = p.twinkle ? 0.5 + Math.sin(p.life * 6 + p.z * 8) * 0.5 : 1;
        const col =
          p.kind === "fae"
            ? `rgba(255,220,180,${(p.a * pulse).toFixed(3)})`
            : `rgba(255,210,140,${(p.a * pulse).toFixed(3)})`;
        g.addColorStop(0, col);
        g.addColorStop(1, "rgba(255,210,140,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
        ctx.fill();
        continue;
      }

      let color = "rgba(255,230,200,";
      if (p.kind === "stardust") color = "rgba(230,240,255,";
      else if (p.kind === "spark") color = "rgba(255,214,140,";
      else if (p.kind === "embers") color = "rgba(255,150,70,";
      else if (p.kind === "ash") color = "rgba(180,170,160,";
      else if (p.kind === "petal") color = "rgba(255,200,170,";

      const pulse = p.twinkle ? 0.45 + Math.sin(p.life * 7 + p.z * 10) * 0.55 : 1;
      ctx.beginPath();
      ctx.fillStyle = `${color}${(p.a * pulse).toFixed(3)})`;
      ctx.arc(p.x, p.y, p.r * (0.7 + (p.z || 0.5) * 0.5), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function tick(now) {
    const dt = Math.min(0.033, (now - lastTs) / 1000);
    lastTs = now;
    time += dt;

    const target = scrollPx();
    const follow = reduced ? 1 : 1 - Math.exp(-dt * 15);
    smooth += (target - smooth) * follow;
    if (Math.abs(target - smooth) < 0.1) smooth = target;

    if (!reduced) {
      const lookFollow = 1 - Math.exp(-dt * 7.5);
      look.x += (look.tx - look.x) * lookFollow;
      look.y += (look.ty - look.y) * lookFollow;
    } else {
      look.x = look.y = 0;
    }

    render(smooth);

    // Advance typewriter
    if (typewriter.active && typewriter.chars < typewriter.full.length) {
      typewriter.acc += dt;
      const cps = 28; // characters per second
      while (typewriter.acc >= 1 / cps && typewriter.chars < typewriter.full.length) {
        typewriter.acc -= 1 / cps;
        typewriter.chars += 1;
      }
    }

    drawAtmo();
    requestAnimationFrame(tick);
  }

  let wheelLock = 0;
  window.addEventListener(
    "wheel",
    (e) => {
      if (reduced) return;
      const max = N * SHOT_RUN + innerHeight;
      if (window.scrollY > N * SHOT_RUN + 40) return;
      if (window.scrollY <= 0 && e.deltaY < 0) return;
      e.preventDefault();
      const now = performance.now();
      const gap = now - wheelLock;
      wheelLock = now;
      const damp = gap < 16 ? 0.5 : gap < 40 ? 0.72 : 1;
      const delta = clamp(e.deltaY, -80, 80) * damp * 0.6;
      window.scrollTo({ top: clamp(window.scrollY + delta, 0, max), behavior: "auto" });
    },
    { passive: false }
  );

  again?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  });

  const isEmbed = new URLSearchParams(window.location.search).has("embed");
  const notifyEnter = () => {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "cad-prologue-complete" }, "*");
    }
  };

  const enterSite = document.getElementById("enterSite");
  const skipPrologue = document.getElementById("skipPrologue");
  if (isEmbed) {
    document.documentElement.classList.add("is-embed");
    enterSite?.addEventListener("click", notifyEnter);
    skipPrologue?.addEventListener("click", notifyEnter);
  } else {
    enterSite?.classList.add("is-hidden");
    skipPrologue?.classList.add("is-hidden");
  }

  // Reveal family origin beats as they enter view
  const originBeats = document.querySelectorAll(".origin__beat");
  if ("IntersectionObserver" in window && originBeats.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" }
    );
    originBeats.forEach((el) => io.observe(el));
  } else {
    originBeats.forEach((el) => el.classList.add("is-in"));
  }

  window.addEventListener("resize", () => {
    cinema.style.height = `calc(100vh + ${N * SHOT_RUN}px)`;
    resizeAtmo();
  });

  STORY.forEach((b) => {
    const img = new Image();
    img.src = b.src;
  });
  [
    "./assets/family/mother-daughter.jpg",
    "./assets/family/father-daughter.jpg",
    "./assets/family/daughter-garden.jpg",
  ].forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  resizeAtmo();
  render(0);
  requestAnimationFrame(tick);
})();
