/**
 * ============================================================================
 * TANU JANM MAHOTSAV — MASTER CONTROLLER
 * Architecture: Asia/Kolkata (IST) Day Engine, Day 1 Secret Prologue,
 * Multi-view Mahotsav Navigator, Audio Controller & Interactive Map.
 * ============================================================================
 */

/* ================= CONFIGURATION & EMERGENCY OVERRIDE ================= */
const CONFIG = {
  // EMERGENCY MANUAL OVERRIDE: Set to null for automatic IST date calculation.
  // Set to a number (1 through 12) to force that specific day mode.
  manualDayOverride: null,

  // Campaign start date in IST: September 1, 2026
  startYear: 2026,
  startMonth: 8, // 0-indexed: 8 = September
  startDate: 1,

  // Relationship reference date (2023-09-01) for live together counter
  togetherStartDate: new Date("2023-09-01T00:00:00")
};

// Global App State
let currentDay = 1;
let completedDays = [];
let activeDayInModal = null;
let audioPlaying = false;

/* ================= INITIALIZATION ================= */
document.addEventListener("DOMContentLoaded", () => {
  initStarfield();
  determineCurrentDay();
  loadCompletedDays();

  // Route between Day 1 Secret Prologue and Regular Mahotsav Website
  if (currentDay === 1) {
    document.getElementById("day1Experience").classList.remove("hidden");
    document.getElementById("mahotsavSite").classList.add("hidden");
    setupDay1SecretFlow();
  } else {
    document.getElementById("day1Experience").classList.add("hidden");
    document.getElementById("mahotsavSite").classList.remove("hidden");
    setupRegularMahotsavSite();
  }

  setupAudioSystem();
  setupLiveTogetherCounter();
});

/* ================= 1. ASIA/KOLKATA (IST) DAY ENGINE ================= */
function determineCurrentDay() {
  if (CONFIG.manualDayOverride !== null && typeof CONFIG.manualDayOverride === "number") {
    currentDay = Math.min(Math.max(CONFIG.manualDayOverride, 1), 12);
    console.log(`[DayEngine] Running on MANUAL OVERRIDE: Day ${currentDay}`);
    return;
  }

  // Calculate current date in Asia/Kolkata
  const now = new Date();
  const istString = now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const istDate = new Date(istString);

  const startDayIST = new Date(CONFIG.startYear, CONFIG.startMonth, CONFIG.startDate, 0, 0, 0);

  // Time difference in milliseconds
  const diffTime = istDate - startDayIST;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (diffDays < 1) {
    currentDay = 1; // Pre-campaign defaults to Day 1 prologue
  } else if (diffDays > 12) {
    currentDay = 12; // Post-campaign stays at Day 12 finale
  } else {
    currentDay = diffDays;
  }

  console.log(`[DayEngine] Asia/Kolkata Calculated Day: ${currentDay}`);
}

function loadCompletedDays() {
  try {
    const saved = localStorage.getItem("mahotsavCompletedDays");
    completedDays = saved ? JSON.parse(saved) : [1];
    if (!completedDays.includes(currentDay)) {
      completedDays.push(currentDay);
      localStorage.setItem("mahotsavCompletedDays", JSON.stringify(completedDays));
    }
  } catch (e) {
    completedDays = [1];
  }
}

/* ================= 2. DAY 1 SECRET PROLOGUE FLOW ================= */
function setupDay1SecretFlow() {
  const titleEl = document.getElementById("introTitle");
  titleEl.innerText = "For my cupcake… ❤️";

  setTimeout(() => {
    titleEl.classList.add("visible");
    setTimeout(() => goToStage("stage2"), 2400);
  }, 2200);

  // Envelope Open
  const envelopeWrap = document.getElementById("envelopeWrapper");
  let opened = false;
  envelopeWrap.onclick = () => {
    if (opened) return;
    opened = true;
    envelopeWrap.classList.add("open");
    setTimeout(() => {
      goToStage("stage3");
      renderDay1Letter();
    }, 900);
  };

  // Easter Egg on Heart
  setupDay1EasterEgg();
}

function renderDay1Letter() {
  const lines = [
    "I know I say it a lot...",
    "but somehow,",
    "I still never feel like I've said it enough.",
    "",
    "I love you, baby. ❤️"
  ];
  const container = document.getElementById("letterText");
  const btn = document.getElementById("toWishBtn");
  container.innerHTML = "";
  btn.innerText = "There’s one little thing I want you to do…";

  lines.forEach((l, idx) => {
    const p = document.createElement("p");
    p.className = "letter-line";
    p.innerHTML = l === "" ? "&nbsp;" : l;
    container.appendChild(p);
    setTimeout(() => p.classList.add("revealed"), idx * 700);
  });

  setTimeout(() => btn.classList.add("visible"), lines.length * 700 + 400);

  btn.onclick = () => {
    goToStage("stage4");
    renderDay1Wish();
  };
}

function renderDay1Wish() {
  const wishLines = [
    "Aapko apne birthday pe ek cheez maangni ho...",
    "toh kya maangogi?",
    "",
    "Mujhe batana zaroori nahi hai.",
    "",
    "Bas aankhein band karo…",
    "aur apne mann mein ek wish kar lo. ❤️"
  ];
  const container = document.getElementById("wishPromptText");
  const btn = document.getElementById("wishDoneBtn");
  container.innerHTML = "";
  btn.innerText = "Done? ❤️";

  wishLines.forEach((l, idx) => {
    const p = document.createElement("p");
    p.className = "wish-line";
    p.innerHTML = l === "" ? "&nbsp;" : l;
    container.appendChild(p);
    setTimeout(() => p.classList.add("revealed"), idx * 600);
  });

  setTimeout(() => btn.classList.add("visible"), wishLines.length * 600 + 400);

  btn.onclick = () => {
    goToStage("stage5");
    renderDay1Final();
  };
}

function renderDay1Final() {
  const finalLines = [
    "Good.",
    "",
    "Ab is wish ko safe rakhna.",
    "",
    "Some wishes are better when they're kept",
    "between you and the universe. ❤️"
  ];
  const container = document.getElementById("finalMessageText");
  container.innerHTML = "";

  finalLines.forEach((l, idx) => {
    const p = document.createElement("p");
    p.className = "final-line";
    p.innerHTML = l === "" ? "&nbsp;" : l;
    container.appendChild(p);
    setTimeout(() => p.classList.add("revealed"), idx * 650 + 200);
  });
}

function setupDay1EasterEgg() {
  const heart = document.getElementById("sacredHeart");
  const toast = document.getElementById("easterEggToast");
  let taps = 0;
  let timer = null;

  toast.innerText = "You really do love exploring, huh? 😂❤️";

  heart.onclick = () => {
    taps++;
    clearTimeout(timer);
    if (taps === 3) {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
      taps = 0;
    } else {
      timer = setTimeout(() => { taps = 0; }, 700);
    }
  };
}

function goToStage(stageId) {
  document.querySelectorAll(".stage").forEach(s => s.classList.remove("active"));
  document.getElementById(stageId).classList.add("active");
}

/* ================= 3. REGULAR MAHOTSAV SITE CONTROLLER ================= */
function setupRegularMahotsavSite() {
  renderHeroForCurrentDay();
  initDynamicHappyDayBar();
  renderParchmentMap();
  renderAboutHerSection();
}

function switchTab(tabId) {
  document.querySelectorAll(".mahotsav-view").forEach(v => v.classList.remove("active-view"));
  document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));

  document.getElementById("view-" + tabId).classList.add("active-view");
  document.getElementById("tab-" + tabId).classList.add("active");
}

function renderHeroForCurrentDay() {
  const data = DAYS[currentDay];
  document.getElementById("heroDayTag").innerText = `CHAPTER ${NUMBER_WORDS[currentDay].toUpperCase()}`;
  document.getElementById("heroThemeTitle").innerText = data.theme;
  document.getElementById("heroIntroText").innerText = data.intro;
  document.getElementById("heroIcon").innerText = data.icon;
  document.getElementById("heroMessageText").innerText = `"${data.story}"`;
}

function initDynamicHappyDayBar() {
  const bar = document.getElementById("dynamicHappyDayText");
  const dayWord = NUMBER_WORDS[currentDay] || currentDay;
  let langIdx = 0;

  setInterval(() => {
    bar.style.opacity = "0";
    setTimeout(() => {
      langIdx = (langIdx + 1) % GLOBAL_LANGUAGES.length;
      bar.innerText = GLOBAL_LANGUAGES[langIdx].text(dayWord);
      bar.style.opacity = "1";
    }, 300);
  }, 2500);
}

/* ================= 4. PARCHMENT MAP ENGINE ================= */
const PIN_COORDINATES = {
  1:  { top: "80%", left: "8%" },
  2:  { top: "60%", left: "22%" },
  3:  { top: "74%", left: "36%" },
  4:  { top: "61%", left: "49%" },
  5:  { top: "40%", left: "38%" },
  6:  { top: "20%", left: "24%" },
  7:  { top: "16%", left: "45%" },
  8:  { top: "14%", left: "64%" },
  9:  { top: "25%", left: "84%" },
  10: { top: "52%", left: "72%" },
  11: { top: "72%", left: "79%" },
  12: { top: "86%", left: "89%" }
};

function renderParchmentMap() {
  const container = document.getElementById("mapPinsContainer");
  container.innerHTML = "";

  for (let d = 1; d <= 12; d++) {
    const coords = PIN_COORDINATES[d];
    const isUnlocked = d <= currentDay || completedDays.includes(d);
    const dayObj = DAYS[d];

    const pin = document.createElement("div");
    pin.className = `map-pin ${isUnlocked ? "unlocked" : "locked"}`;
    pin.style.top = coords.top;
    pin.style.left = coords.left;

    pin.innerHTML = `
      <span class="map-pin-icon">${isUnlocked ? dayObj.icon : "🔒"}</span>
      <div class="map-pin-num">${d}</div>
    `;

    pin.onclick = () => {
      if (isUnlocked) {
        openDayModal(d);
      }
    };

    container.appendChild(pin);
  }
}

function openDayModal(dayNum) {
  activeDayInModal = dayNum;
  const data = DAYS[dayNum];

  document.getElementById("modalDayBadge").innerText = `DAY ${dayNum} • ${data.theme.toUpperCase()}`;
  document.getElementById("modalThemeTitle").innerText = data.title;
  document.getElementById("modalLocation").innerText = `📍 ${data.location}`;
  document.getElementById("modalStoryText").innerText = data.story;
  document.getElementById("modalQuoteText").innerText = `"${data.quote}"`;

  document.getElementById("memoryModal").classList.remove("hidden");
}

function closeDayModal() {
  document.getElementById("memoryModal").classList.add("hidden");
  activeDayInModal = null;
}

/* ================= 5. ABOUT HER MAGAZINE RENDERER ================= */
function renderAboutHerSection() {
  document.getElementById("magTitle").innerText = ABOUT_HER_DATA.magazineTitle;
  document.getElementById("magSub").innerText = ABOUT_HER_DATA.magazineSubtitle;
  document.getElementById("aboutHerStoryText").innerText = ABOUT_HER_DATA.originalStory;

  const pillarsContainer = document.getElementById("aboutHerPillars");
  pillarsContainer.innerHTML = "";
  ABOUT_HER_DATA.pillars.forEach(p => {
    const card = document.createElement("div");
    card.className = "pillar-card";
    card.innerHTML = `
      <span class="pillar-icon">${p.icon}</span>
      <div>
        <h4 class="pillar-title">${p.title}</h4>
        <p class="pillar-desc">${p.desc}</p>
      </div>
    `;
    pillarsContainer.appendChild(card);
  });
}

/* ================= 6. HINT PHOTO MODAL ================= */
function openPhotoModal(title, note) {
  alert(`✨ ${title}\n\n"${note}"`);
}

/* ================= 7. AUDIO SYSTEM ================= */
function setupAudioSystem() {
  const audio = document.getElementById("globalAudio");
  const playBtn = document.getElementById("playPauseBtn");
  const muteBtn = document.getElementById("muteBtn");
  const title = document.getElementById("currentTrackTitle");

  title.innerText = `Day 0${currentDay} Melody`;
  audio.src = `music/day${currentDay < 10 ? "0" + currentDay : currentDay}.mp3`;

  playBtn.onclick = () => {
    if (audioPlaying) {
      audio.pause();
      playBtn.innerText = "▶";
      audioPlaying = false;
    } else {
      audio.play().then(() => {
        playBtn.innerText = "⏸";
        audioPlaying = true;
      }).catch(() => {
        console.log("Audio play prevented: Waiting for user interaction.");
      });
    }
  };

  muteBtn.onclick = () => {
    audio.muted = !audio.muted;
    muteBtn.innerText = audio.muted ? "🔇" : "🔊";
  };
}

function playDayAudio() {
  if (!activeDayInModal) return;
  const audio = document.getElementById("globalAudio");
  const title = document.getElementById("currentTrackTitle");
  const playBtn = document.getElementById("playPauseBtn");

  audio.src = `music/day${activeDayInModal < 10 ? "0" + activeDayInModal : activeDayInModal}.mp3`;
  title.innerText = `Day ${activeDayInModal} Melody`;
  audio.play().then(() => {
    playBtn.innerText = "⏸";
    audioPlaying = true;
  }).catch(() => {});
}

/* ================= 8. LIVE TOGETHER COUNTER ================= */
function setupLiveTogetherCounter() {
  function update() {
    const now = new Date();
    const diff = now - CONFIG.togetherStartDate;

    document.getElementById("liveTogDays").innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById("liveTogHours").innerText = Math.floor((diff / (1000 * 60 * 60)) % 24);
    document.getElementById("liveTogMins").innerText = Math.floor((diff / 1000 / 60) % 60);
    document.getElementById("liveTogSecs").innerText = Math.floor((diff / 1000) % 60);
  }
  setInterval(update, 1000);
  update();
}

/* ================= 9. STARFIELD ENGINE ================= */
function initStarfield() {
  const canvas = document.getElementById("starCanvas");
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const stars = [];
  const count = Math.min(Math.floor((width * height) / 9000), 75);

  class Star {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x = Math.random() * width;
      this.y = init ? Math.random() * height : height + 10;
      this.size = Math.random() * 1.5 + 0.5;
      this.speed = Math.random() * 0.25 + 0.1;
      this.alpha = Math.random() * 0.7 + 0.3;
    }
    update() {
      this.y -= this.speed;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.fillStyle = `rgba(247, 168, 184, ${this.alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) stars.push(new Star());

  function anim() {
    ctx.clearRect(0, 0, width, height);
    stars.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(anim);
  }
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  anim();
}