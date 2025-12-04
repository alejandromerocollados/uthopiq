"use client";
import { useEffect, useRef } from "react";

export default function GlobalBackground() {
  const rafRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const canvas = document.createElement("canvas");
    canvas.className = "site-bg-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: false });
    document.documentElement.style.background = "#000";
    document.body.style.background = "#000";
    canvas.style.background = "#000";

    // -------- Parámetros (equilibrio fluidez/rendimiento) --------
    const MIN_COUNT = 20;
    const MAX_COUNT = 50;

    const TWINKLE_MIN = 0.6;
    const TWINKLE_MAX = 1.0;
    const SIZE_MIN = 0.3;
    const SIZE_MAX = 1.2;

    // Estrellas fugaces (más visibles)
    const METEOR_MIN_INTERVAL = 2200;
    const METEOR_MAX_INTERVAL = 5200;
    const METEOR_SPEED = 14;
    const METEOR_LEN = 220;
    const METEOR_THICK = 2.0;
    const METEOR_LIFE = 1200;
    const METEOR_MAX_COUNT = 4;

    const WHITE = "#ffffff";

    const clampDPR = (dpr) => Math.min(1.25, dpr || 1);
    const getViewport = () => {
      const vv = window.visualViewport;
      return {
        w: Math.ceil(vv?.width ?? window.innerWidth),
        h: Math.ceil(vv?.height ?? window.innerHeight),
        dpr: clampDPR(window.devicePixelRatio || 1),
      };
    };

    let { w, h, dpr } = getViewport();

    const setSize = () => {
      ({ w, h, dpr } = getViewport());
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    // -------- Partículas --------
    // -------- Partículas --------
    const stars = [];
    const reseed = () => {
      stars.length = 0;
      const area = w * h;
      const target = Math.round(
        Math.min(MAX_COUNT, Math.max(MIN_COUNT, area * 0.00005))
      );
      for (let i = 0; i < target; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const phase = Math.random() * Math.PI * 2;
        const tw = 0.35 + Math.random() * 0.6;
        const nSeed = Math.random() * 1000;
        const nFreq = 0.4 + Math.random() * (0.9 - 0.4);
        stars.push({
          x,
          y,
          vx: 0, // Sin movimiento horizontal
          vy: 0, // Sin movimiento vertical
          s: SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN),
          red: false, // Estrellas blancas
          phase,
          tw,
          nSeed,
          nFreq,
          moveX: Math.random() * 0.5 - 0.25, // Movimiento suave en X
          moveY: Math.random() * 0.5 - 0.25, // Movimiento suave en Y
        });
      }
    };
    reseed();

    // -------- Estrellas fugaces --------
    const meteors = [];
    let nextMeteorAt = performance.now() + randInterval();
    function randInterval() {
      return (
        METEOR_MIN_INTERVAL +
        Math.random() * (METEOR_MAX_INTERVAL - METEOR_MIN_INTERVAL)
      );
    }
    function spawnMeteor() {
      if (meteors.length >= METEOR_MAX_COUNT) return;
      const startFromTop = Math.random() < 0.55;
      let x, y, angle;
      if (startFromTop) {
        x = Math.random() * w * 0.7;
        y = -24;
        angle = Math.PI * (0.12 + Math.random() * 0.25); // ~22º–67º
      } else {
        x = -24;
        y = Math.random() * h * 0.6;
        angle = Math.PI * (0.03 + Math.random() * 0.22); // ~5º–39º
      }
      const vx = Math.cos(angle) * METEOR_SPEED;
      const vy = Math.sin(angle) * METEOR_SPEED;
      meteors.push({
        x,
        y,
        vx,
        vy,
        born: performance.now(),
        life: METEOR_LIFE,
        len: METEOR_LEN,
        thick: METEOR_THICK,
      });

      // 25% de probabilidad de un “compañero” breve para sensación de lluvia
      if (Math.random() < 0.25 && meteors.length < METEOR_MAX_COUNT) {
        setTimeout(() => {
          if (meteors.length < METEOR_MAX_COUNT) {
            meteors.push({
              x: x - 40,
              y: y - 20,
              vx,
              vy,
              born: performance.now(),
              life: METEOR_LIFE * 0.8,
              len: METEOR_LEN * 0.8,
              thick: METEOR_THICK * 0.9,
            });
          }
        }, 180 + Math.random() * 220);
      }
    }

    // -------- Resize/zoom robusto --------
    let resizeRaf = 0;
    let lastDpr = dpr;

    const doResizeWork = () => {
      setSize();
      reseed();
    };

    const onAnyResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const currentDpr = clampDPR(window.devicePixelRatio || 1);
        const vv = window.visualViewport;
        const vvChanged =
          (vv?.width && Math.ceil(vv.width) !== w) ||
          (vv?.height && Math.ceil(vv.height) !== h);
        if (currentDpr !== lastDpr || vvChanged) {
          lastDpr = currentDpr;
          doResizeWork();
        } else if (window.innerWidth !== w || window.innerHeight !== h) {
          doResizeWork();
        }
      });
    };

    window.addEventListener("resize", onAnyResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onAnyResize);
      window.visualViewport.addEventListener("scroll", onAnyResize);
    }

    // Pausa si pestaña oculta
    let paused = document.hidden;
    const onVis = () => {
      paused = document.hidden;
      if (!paused) rafRef.current = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);

    // -------- Bucle: render ~38 FPS con simulación fija a 60 Hz --------
    const RENDER_FRAME_MS = 26;
    const FIXED_DT = 1 / 60;
    const MAX_STEPS = 2;

    let lastTime = performance.now();
    let lastRender = lastTime;
    let accumulator = 0;

    const loop = (now) => {
      if (paused) return;

      const frameTime = Math.min(0.05, (now - lastTime) / 1000); // cap 50 ms
      lastTime = now;
      accumulator += frameTime;

      let steps = 0;
      while (accumulator >= FIXED_DT && steps < MAX_STEPS) {
        step(FIXED_DT, now);
        accumulator -= FIXED_DT;
        steps++;
      }

      if (now - lastRender >= RENDER_FRAME_MS) {
        draw(now);
        lastRender = now;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    function step(dt, now) {
      const t = now * 0.001;

      if (now >= nextMeteorAt) {
        spawnMeteor();
        nextMeteorAt = now + randInterval();
      }

      // Partículas
      for (let i = 0; i < stars.length; i++) {
        const p = stars[i];
        const osc = (Math.sin(p.phase) + 1) * 0.5;
        const a = TWINKLE_MIN + (TWINKLE_MAX - TWINKLE_MIN) * osc;

        // Movimiento suave (el pequeño movimiento de las estrellas)
        p.x += p.moveX;
        p.y += p.moveY;

        // Asegurarse de que las estrellas no salgan de la pantalla
        if (p.x > w) p.x = 0;
        if (p.x < 0) p.x = w;
        if (p.y > h) p.y = 0;
        if (p.y < 0) p.y = h;

        const s = p.s;
        const px = Math.round(p.x - s * 0.5);
        const py = Math.round(p.y - s * 0.5);

        ctx.globalAlpha = a;
        ctx.fillStyle = WHITE;
        ctx.fillRect(px, py, s, s);
      }

      // Meteors (se mantiene igual)
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx * (dt / FIXED_DT);
        m.y += m.vy * (dt / FIXED_DT);
        const age = now - m.born;
        if (
          age > m.life ||
          m.x > w + 60 ||
          m.y > h + 60 ||
          m.x < -60 ||
          m.y < -60
        ) {
          meteors.splice(i, 1);
        }
      }
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h);

      // Estrellas normales (fijas)
      for (let i = 0; i < stars.length; i++) {
        const p = stars[i];
        const osc = (Math.sin(p.phase) + 1) * 0.5;
        const a = TWINKLE_MIN + (TWINKLE_MAX - TWINKLE_MIN) * osc;

        const s = p.s;
        const px = Math.round(p.x - s * 0.5);
        const py = Math.round(p.y - s * 0.5);

        ctx.globalAlpha = a;
        ctx.fillStyle = WHITE;
        ctx.fillRect(px, py, s, s);
      }

      // Meteors (glow sencillo y barato)
      for (let i = 0; i < meteors.length; i++) {
        const m = meteors[i];
        const age = now - m.born;
        const lifeT = Math.min(1, age / m.life);
        const fade = 1 - lifeT;

        const speedLen = Math.hypot(m.vx, m.vy);
        const tailX = m.x - (m.vx / speedLen) * m.len;
        const tailY = m.y - (m.vy / speedLen) * m.len;

        ctx.save();
        ctx.globalAlpha = Math.max(0, fade * 0.95);
        ctx.lineWidth = m.thick;
        ctx.strokeStyle = WHITE;
        ctx.shadowColor = WHITE;
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.globalAlpha = Math.max(0, fade);
        ctx.fillStyle = WHITE;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.thick * 0.9, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onAnyResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", onAnyResize);
        window.visualViewport.removeEventListener("scroll", onAnyResize);
      }
      document.removeEventListener("visibilitychange", onVis);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      canvas.remove();
      mountedRef.current = false;
    };
  }, []);

  return null;
}
