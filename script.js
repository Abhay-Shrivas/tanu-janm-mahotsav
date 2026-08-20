/**
 * ============================================================================
 * SITE CONFIGURATION & CONTENT
 * All text, timing, and Easter eggs are configured here.
 * ============================================================================
 */
const SITE_CONTENT = {
  // Stage 1 Intro
  introTitle: "For my cupcake… ❤️",

  // Stage 2 Prompt
  envelopePrompt: "Open it ❤️",

  // Stage 3 Letter (Each entry renders as a staggered line)
  letterLines: [
    "I know I say it a lot...",
    "but somehow,",
    "I still never feel like I've said it enough.",
    "",
    "I love you, baby. ❤️"
  ],
  letterButton: "There’s one little thing I want you to do…",

  // Stage 4 Wish Prompt
  wishLines: [
    "Aapko apne birthday pe ek cheez maangni ho...",
    "toh kya maangogi?",
    "",
    "Mujhe batana zaroori nahi hai.",
    "",
    "Bas aankhein band karo…",
    "aur apne mann mein ek wish kar lo. ❤️"
  ],
  wishButton: "Done? ❤️",

  // Stage 5 Final Message
  finalLines: [
    "Good.",
    "",
    "Ab is wish ko safe rakhna.",
    "",
    "Some wishes are better when they're kept",
    "between you and the universe. ❤️"
  ],

  // Easter Egg (Triple tap on the heart)
  easterEggText: "You really do love exploring, huh? 😂❤️"
};

/**
 * ANIMATION TIMINGS (in milliseconds)
 */
const TIMINGS = {
  flowerToTitleDelay: 2200,      // Time before "For my cupcake..." reveals
  titleToEnvelopeDelay: 2400,    // Time before envelope stage appears
  letterLineStagger: 700,        // Stagger between handwritten lines
  wishLineStagger: 600,          // Stagger between wish lines
  finalLineStagger: 650,         // Stagger between final closing lines
  easterEggDuration: 3200        // Duration Easter egg toast stays visible
};

/* ==========================================================================
   CORE APPLICATION CONTROLLER
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Initialize starfield particle canvas
  initStarfield();

  // Initialize Stage 1
  setupStage1();

  // Setup Global Stage Actions
  setupEnvelopeStage();
  setupWishStage();
  setupEasterEgg();
});

/**
 * STAGE 1: Flower bloom and intro reveal
 */
function setupStage1() {
  const titleEl = document.getElementById("introTitle");
  titleEl.innerText = SITE_CONTENT.introTitle;

  // Reveal title after flower begins blooming
  setTimeout(() => {
    titleEl.classList.add("visible");

    // Transition smoothly to Envelope Stage
    setTimeout(() => {
      goToStage("stage2");
    }, TIMINGS.titleToEnvelopeDelay);

  }, TIMINGS.flowerToTitleDelay);
}

/**
 * STAGE 2: Envelope Tap Action
 */
function setupEnvelopeStage() {
  const envelopeWrap = document.getElementById("envelopeWrapper");
  let opened = false;

  function openEnvelope() {
    if (opened) return;
    opened = true;

    envelopeWrap.classList.add("open");

    // Smooth transition from envelope to open letter
    setTimeout(() => {
      goToStage("stage3");
      renderLetterLines();
    }, 900);
  }

  envelopeWrap.addEventListener("click", openEnvelope);
  envelopeWrap.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openEnvelope();
  });
}

/**
 * STAGE 3: Render Handwritten Letter
 */
function renderLetterLines() {
  const container = document.getElementById("letterText");
  const btn = document.getElementById("toWishBtn");
  container.innerHTML = "";

  btn.innerText = SITE_CONTENT.letterButton;

  SITE_CONTENT.letterLines.forEach((lineText, idx) => {
    const p = document.createElement("p");
    p.className = "letter-line";
    p.innerHTML = lineText === "" ? "&nbsp;" : lineText;
    container.appendChild(p);

    setTimeout(() => {
      p.classList.add("revealed");
    }, idx * TIMINGS.letterLineStagger);
  });

  // Reveal button after all lines have appeared
  const totalDelay = SITE_CONTENT.letterLines.length * TIMINGS.letterLineStagger + 400;
  setTimeout(() => {
    btn.classList.add("visible");
  }, totalDelay);

  btn.addEventListener("click", () => {
    goToStage("stage4");
    renderWishLines();
  }, { once: true });
}

/**
 * STAGE 4: The Birthday Wish Prompt
 */
function renderWishLines() {
  const container = document.getElementById("wishPromptText");
  const btn = document.getElementById("wishDoneBtn");
  container.innerHTML = "";

  btn.innerText = SITE_CONTENT.wishButton;

  // Soften ambient glow for intimacy
  const glow = document.getElementById("ambientGlow");
  if (glow) glow.style.opacity = "0.3";

  SITE_CONTENT.wishLines.forEach((lineText, idx) => {
    const p = document.createElement("p");
    p.className = "wish-line";
    p.innerHTML = lineText === "" ? "&nbsp;" : lineText;
    container.appendChild(p);

    setTimeout(() => {
      p.classList.add("revealed");
    }, idx * TIMINGS.wishLineStagger);
  });

  const totalDelay = SITE_CONTENT.wishLines.length * TIMINGS.wishLineStagger + 500;
  setTimeout(() => {
    btn.classList.add("visible");
  }, totalDelay);

  btn.addEventListener("click", () => {
    goToStage("stage5");
    renderFinalMessage();
  }, { once: true });
}

/**
 * STAGE 5: Final Message & Glowing Heart
 */
function renderFinalMessage() {
  const container = document.getElementById("finalMessageText");
  container.innerHTML = "";

  // Restore ambient background glow
  const glow = document.getElementById("ambientGlow");
  if (glow) glow.style.opacity = "0.7";

  SITE_CONTENT.finalLines.forEach((lineText, idx) => {
    const p = document.createElement("p");
    p.className = "final-line";
    p.innerHTML = lineText === "" ? "&nbsp;" : lineText;
    container.appendChild(p);

    setTimeout(() => {
      p.classList.add("revealed");
    }, idx * TIMINGS.finalLineStagger + 300);
  });
}

/**
 * EASTER EGG: Triple Tap on Heart
 */
function setupEasterEgg() {
  const heart = document.getElementById("sacredHeart");
  const toast = document.getElementById("easterEggToast");
  let tapCount = 0;
  let tapTimer = null;

  toast.innerText = SITE_CONTENT.easterEggText;

  heart.addEventListener("click", () => {
    tapCount++;
    clearTimeout(tapTimer);

    if (tapCount === 3) {
      triggerEasterEgg();
      tapCount = 0;
    } else {
      tapTimer = setTimeout(() => {
        tapCount = 0;
      }, 700);
    }
  });

  function triggerEasterEgg() {
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, TIMINGS.easterEggDuration);
  }
}

/**
 * Stage Transition Helper
 */
function goToStage(stageId) {
  document.querySelectorAll(".stage").forEach(s => {
    s.classList.remove("active");
  });

  const target = document.getElementById(stageId);
  if (target) {
    target.classList.add("active");
  }
}

/**
 * STARFIELD / PARTICLES ENGINE
 */
function initStarfield() {
  const canvas = document.getElementById("starCanvas");
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const stars = [];
  const starCount = Math.min(Math.floor((width * height) / 9000), 70);

  class Star {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 1.5 + 0.5;
      this.speed = Math.random() * 0.25 + 0.1;
      this.alpha = Math.random() * 0.7 + 0.3;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
    }
    update() {
      this.y -= this.speed;
      this.alpha += Math.sin(Date.now() * this.pulseSpeed) * 0.01;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.fillStyle = `rgba(247, 168, 184, ${Math.max(0.1, Math.min(this.alpha, 0.8))})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => {
      s.update();
      s.draw();
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  animate();
}