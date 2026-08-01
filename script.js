/* ============================================================
   CONVITE ANIMADO — 28 ANOS DA ARIEL
   JS organizado em módulos independentes:
   1. Bolhas   2. Peixes   3. Partículas   4. Parallax
   5. Contador regressivo   6. Botão fujão (NÃO)
   7. Modal + envio de confirmação   8. Confete
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. BOLHAS ANIMADAS
  --------------------------------------------------------- */
  const BubbleModule = (() => {
    const field = document.getElementById('bubbleField');

    function createBubble() {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';

      const size = Math.random() * 18 + 6; // 6px a 24px
      const left = Math.random() * 100;    // % da largura
      const duration = Math.random() * 6 + 6; // 6s a 12s
      const drift = (Math.random() * 60 - 30) + 'px';

      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${left}%`;
      bubble.style.setProperty('--drift', drift);
      bubble.style.animationDuration = `${duration}s`;

      field.appendChild(bubble);
      setTimeout(() => bubble.remove(), duration * 1000);
    }

    function start() {
      createBubble();
      setInterval(createBubble, 700);
    }

    return { start };
  })();

  /* ---------------------------------------------------------
     2. PEIXES PASSANDO LENTAMENTE
  --------------------------------------------------------- */
  const FishModule = (() => {
    const field = document.getElementById('fishField');

    // Forma de peixe simples e autoral (sem referência a personagens)
    function fishSVG(color) {
      return `
        <svg width="46" height="26" viewBox="0 0 46 26">
          <path d="M2 13 C10 2, 30 2, 40 8 L46 3 L42 13 L46 23 L40 18 C30 24, 10 24, 2 13 Z"
                fill="${color}" opacity="0.85"/>
          <circle cx="12" cy="11" r="1.4" fill="#04283f"/>
        </svg>`;
    }

    const palette = ['#38BDF8', '#5EEAD4', '#FF8E72', '#F5E6C8'];

    function createFish() {
      const fish = document.createElement('div');
      fish.className = 'fish';

      const top = Math.random() * 70 + 10; // % da altura
      const duration = Math.random() * 14 + 14; // 14s a 28s
      const scale = Math.random() * 0.6 + 0.7;
      const flip = Math.random() > 0.5 ? 'scaleX(-1)' : 'scaleX(1)';
      const color = palette[Math.floor(Math.random() * palette.length)];

      fish.style.top = `${top}%`;
      fish.style.animationDuration = `${duration}s`;
      fish.style.transform = `scale(${scale}) ${flip}`;
      fish.innerHTML = fishSVG(color);

      field.appendChild(fish);
      setTimeout(() => fish.remove(), duration * 1000);
    }

    function start() {
      createFish();
      setInterval(createFish, 3200);
    }

    return { start };
  })();

  /* ---------------------------------------------------------
     3. PARTÍCULAS FLUTUANDO
  --------------------------------------------------------- */
  const ParticleModule = (() => {
    const field = document.getElementById('particleField');

    function start(count = 26) {
      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1.5;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.top = `${Math.random() * 100}%`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.setProperty('--px', `${Math.random() * 30 - 15}px`);
        p.style.setProperty('--py', `${Math.random() * 40 - 20}px`);
        p.style.animationDuration = `${Math.random() * 4 + 4}s`;
        field.appendChild(p);
      }
    }

    return { start };
  })();

  /* ---------------------------------------------------------
     4. PARALLAX SUAVE (mouse e giroscópio no celular)
  --------------------------------------------------------- */
  const ParallaxModule = (() => {
    const layers = document.querySelectorAll('[data-depth]');

    function apply(x, y) {
      layers.forEach(layer => {
        const depth = parseFloat(layer.dataset.depth) || 0;
        const moveX = x * depth * 24;
        const moveY = y * depth * 24;
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }

    function start() {
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        apply(x, y);
      });

      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma === null) return;
        const x = Math.max(-1, Math.min(1, e.gamma / 30));
        const y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
        apply(x, y);
      });
    }

    return { start };
  })();

  /* ---------------------------------------------------------
     5. CONTADOR REGRESSIVO
     Ajuste o ano abaixo se a festa não for em 2026.
  --------------------------------------------------------- */
  const CountdownModule = (() => {
    const target = new Date('2026-08-15T09:00:00-03:00').getTime();
    const els = {
      days: document.getElementById('cd-days'),
      hours: document.getElementById('cd-hours'),
      min: document.getElementById('cd-min'),
      sec: document.getElementById('cd-sec'),
    };

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        els.days.textContent = '00';
        els.hours.textContent = '00';
        els.min.textContent = '00';
        els.sec.textContent = '00';
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const min = Math.floor((diff % 3600000) / 60000);
      const sec = Math.floor((diff % 60000) / 1000);

      els.days.textContent = pad(days);
      els.hours.textContent = pad(hours);
      els.min.textContent = pad(min);
      els.sec.textContent = pad(sec);
    }

    function start() {
      tick();
      setInterval(tick, 1000);
    }

    return { start };
  })();

  /* ---------------------------------------------------------
     6. BOTÃO FUJÃO (NÃO)
  --------------------------------------------------------- */
  const RunawayButtonModule = (() => {
    const zone = document.getElementById('buttonZone');
    const btnNo = document.getElementById('btnNo');
    const taunt = document.getElementById('tauntBubble');

    let attempts = 0;
    let currentDuration = 0.5; // segundos, diminui a cada fuga (fica mais rápido)
    const MIN_DURATION = 0.15;
    let cooldown = false;
    let placed = false;

    const messages = [
      { at: 3, text: 'Tem certeza?' },
      { at: 5, text: 'Essa opção não pode ser marcada...' },
      { at: 7, text: 'A aniversariante não aprovou essa sua escolha.' },
    ];

    function randomPosition() {
      const zoneRect = zone.getBoundingClientRect();
      const btnRect = btnNo.getBoundingClientRect();
      const maxLeft = Math.max(0, zoneRect.width - btnRect.width);
      const maxTop = Math.max(0, zoneRect.height - btnRect.height);
      return {
        left: Math.random() * maxLeft,
        top: Math.random() * maxTop,
      };
    }

    function showTaunt(text) {
      const btnRect = btnNo.getBoundingClientRect();
      const zoneRect = zone.getBoundingClientRect();
      taunt.textContent = text;
      taunt.style.left = `${btnRect.left - zoneRect.left}px`;
      taunt.style.top = `${btnRect.top - zoneRect.top - 44}px`;
      taunt.classList.add('show');
      clearTimeout(showTaunt._t);
      showTaunt._t = setTimeout(() => taunt.classList.remove('show'), 2200);
    }

    function evade() {
      if (cooldown) return;
      cooldown = true;

      attempts += 1;
      currentDuration = Math.max(MIN_DURATION, currentDuration - 0.05);
      btnNo.style.transitionDuration = `${currentDuration}s`;

      const pos = randomPosition();
      btnNo.style.position = 'absolute';
      btnNo.style.left = `${pos.left}px`;
      btnNo.style.top = `${pos.top}px`;
      placed = true;

      const hit = messages.find(m => m.at === attempts);
      if (hit) showTaunt(hit.text);

      setTimeout(() => { cooldown = false; }, currentDuration * 1000);
    }

    function distanceToButton(clientX, clientY) {
      const r = btnNo.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      return Math.hypot(clientX - cx, clientY - cy);
    }

    function start() {
      // Posição inicial dentro da zona
      const zoneRect = zone.getBoundingClientRect();
      btnNo.style.position = 'absolute';
      btnNo.style.left = `${zoneRect.width / 2 + 70}px`;
      btnNo.style.top = `${zoneRect.height / 2}px`;
      placed = true; // já pode reagir à aproximação do mouse desde o início

      // Desktop: foge quando o mouse chega perto
      window.addEventListener('mousemove', (e) => {
        if (distanceToButton(e.clientX, e.clientY) < 90) evade();
      });

      // Celular: foge ao toque
      btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        evade();
      }, { passive: false });

      // Segurança: se de algum jeito for clicado, nada acontece
      btnNo.addEventListener('click', (e) => e.preventDefault());
    }

    return { start };
  })();

  /* ---------------------------------------------------------
     7. MODAL DE CONFIRMAÇÃO + ENVIO DA RESPOSTA
  --------------------------------------------------------- */
  const ModalModule = (() => {
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const btnYes = document.getElementById('btnYes');
    const form = document.getElementById('confirmForm');
    const thanks = document.getElementById('modalThanks');

    // TROQUE AQUI pelo endpoint do seu formulário Formspree
    // (crie grátis em https://formspree.io -> "New Form" -> copie o ID)
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/SEU_ID_AQUI';

    function open() {
      overlay.classList.add('open');
      ConfettiModule.burst();
    }

    function close() {
      overlay.classList.remove('open');
    }

    async function submitRSVP(name) {
      try {
        await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            nome: name,
            evento: 'Aniversário Ariel - 28 anos',
            respondido_em: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.warn('Não foi possível enviar a confirmação agora:', err);
      }
    }

    function start() {
      btnYes.addEventListener('click', open);
      closeBtn.addEventListener('click', close);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('guestName').value.trim();
        if (!name) return;
        submitRSVP(name);
        form.hidden = true;
        thanks.hidden = false;
        ConfettiModule.burst();
      });
    }

    return { start };
  })();

  /* ---------------------------------------------------------
     8. CONFETE (canvas)
  --------------------------------------------------------- */
  const ConfettiModule = (() => {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId = null;

    const colors = ['#38BDF8', '#5EEAD4', '#FF8E72', '#F5E6C8', '#FFFFFF'];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function makeParticle() {
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 1.2) * 14,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.28,
        life: 0,
        maxLife: 90 + Math.random() * 30,
      };
    }

    function burst(count = 140) {
      resize();
      for (let i = 0; i < count; i++) particles.push(makeParticle());
      if (!animId) loop();
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.life += 1;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      particles = particles.filter(p => p.life < p.maxLife && p.y < canvas.height + 40);

      if (particles.length > 0) {
        animId = requestAnimationFrame(loop);
      } else {
        animId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    window.addEventListener('resize', resize);
    resize();

    return { burst };
  })();

  /* ---------------------------------------------------------
     INICIALIZAÇÃO
  --------------------------------------------------------- */
  BubbleModule.start();
  FishModule.start();
  ParticleModule.start(26);
  ParallaxModule.start();
  CountdownModule.start();
  RunawayButtonModule.start();
  ModalModule.start();
});
