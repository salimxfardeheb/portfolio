// Référence de l'effet de points du hero (logique extraite du design).
// À porter dans un composant client React : canvas en position absolue derrière le hero,
// suit la souris, apparaît quand elle bouge, respecte prefers-reduced-motion.
// Réglages : couleur #4CB944, rayon 220 px, grille 20 px.

  tick(t) {
    const c = this.getCanvas();
    if (c) {
      const dpr = window.devicePixelRatio || 1;
      const w = c.clientWidth, h = c.clientHeight;
      if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
        c.width = Math.round(w * dpr); c.height = Math.round(h * dpr);
      }
      const ctx = c.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const home = { x: w * 0.68, y: h * 0.5 };
      const tg = this.target || home;
      if (!this.c) { this.c = { x: home.x, y: home.y }; this.energy = 0; }
      const prev = { x: this.c.x, y: this.c.y };
      const f = this.reduce ? 1 : 0.14;
      this.c.x += (tg.x - this.c.x) * f;
      this.c.y += (tg.y - this.c.y) * f;
      const speed = Math.hypot(this.c.x - prev.x, this.c.y - prev.y);
      // apparaît quand la souris bouge, s'efface quand elle s'arrête
      const want = this.target ? Math.min(1, 0.25 + speed * 0.08) : 0;
      this.energy += (want - this.energy) * (want > this.energy ? 0.12 : 0.03);
      if (this.energy > 0.005) {
        const R = this.props.size ?? 220;      // rayon visible
        const sigma = R * 0.45;                // zone de déformation
        const push = R * 0.18;                 // force de la loupe
        const gap = 20;
        ctx.fillStyle = this.props.dotColor ?? '#4CB944';
        const x0 = Math.max(0, Math.floor((this.c.x - R - push) / gap)) * gap;
        const y0 = Math.max(0, Math.floor((this.c.y - R - push) / gap)) * gap;
        const x1 = Math.min(w, this.c.x + R + push), y1 = Math.min(h, this.c.y + R + push);
        for (let gx = x0; gx <= x1; gx += gap) {
          for (let gy = y0; gy <= y1; gy += gap) {
            const dx = gx - this.c.x, dy = gy - this.c.y;
            const d = Math.hypot(dx, dy) || 0.001;
            if (d > R) continue;
            const g = Math.exp(-(d * d) / (2 * sigma * sigma));
            const off = push * g;
            const px = gx + (dx / d) * off, py = gy + (dy / d) * off;
            const fall = 1 - d / R;
            const a = this.energy * Math.pow(fall, 1.4);
            if (a < 0.01) continue;
            ctx.globalAlpha = a;
            ctx.beginPath();
            ctx.arc(px, py, 1.1 + 0.9 * g, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }
    }
    this.raf = requestAnimationFrame(this.tick);
  }
