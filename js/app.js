document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("categorySelect");
  const modeSelect = document.getElementById("modeSelect");
  const cardLimit = document.getElementById("cardLimit");
  const startBtn = document.getElementById("startBtn");
  const cardContainer = document.getElementById("cardContainer");
  const questionEl = document.getElementById("question");
  const subQEl = document.getElementById("subQuestion");
  const answerEl = document.getElementById("answer");
  const revealBtn = document.getElementById("revealBtn");
  const knewBtn = document.getElementById("knewBtn");
  const againBtn = document.getElementById("againBtn");
  const cardCategory = document.getElementById("cardCategory");
  const cardProgress = document.getElementById("cardProgress");
  const canvas = document.getElementById("kanjiCanvas");
  const ctx = canvas.getContext("2d");
  const clearCanvas = document.getElementById("clearCanvas");
  const canvasContainer = document.getElementById("kanjiCanvasContainer");

  let deck = [];
  let current = 0;
  let stats = [];

  Object.keys(flashcards).forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  startBtn.addEventListener("click", () => {
    const cat = categorySelect.value;
    const mode = modeSelect.value;
    const limit = parseInt(cardLimit.value) || flashcards[cat].length;
    deck = [...flashcards[cat]].sort(() => Math.random() - 0.5).slice(0, limit);
    current = 0;
    stats = [];
    showCard(deck[current], mode, cat);
    cardContainer.classList.remove("hidden");
  });

  function showCard(card, mode, cat) {
    questionEl.textContent = "";
    subQEl.textContent = "";
    answerEl.textContent = "";
    answerEl.classList.add("hidden");
    canvasContainer.classList.toggle("hidden", mode !== "training");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cardCategory.textContent = cat;
    cardCategory.className = "badge " + cat;
    cardProgress.textContent = `${current + 1} / ${deck.length}`;
    if (mode === "fr-kanji") {
      questionEl.textContent = card.fr;
      answerEl.textContent = `${card.hiragana}【${card.kanji}】`;
    } else if (mode === "kanji-fr") {
      questionEl.textContent = card.kanji;
      answerEl.textContent = card.fr;
    } else if (mode === "training") {
      questionEl.textContent = card.kanji;
      answerEl.textContent = card.fr;
    } else {
      const flip = Math.random() > 0.5;
      if (flip) {
        questionEl.textContent = card.fr;
        answerEl.textContent = `${card.hiragana}【${card.kanji}】`;
      } else {
        questionEl.textContent = card.hiragana;
        subQEl.textContent = `【${card.kanji}】`;
        answerEl.textContent = card.fr;
      }
    }
  }

  revealBtn.addEventListener("click", () => {
    answerEl.classList.remove("hidden");
  });

  knewBtn.addEventListener("click", () => {
    stats.push({card: deck[current], result: "✔️"});
    nextCard();
  });

  againBtn.addEventListener("click", () => {
    stats.push({card: deck[current], result: "❌"});
    nextCard();
  });

  function nextCard() {
    current++;
    if (current < deck.length) {
      showCard(deck[current], modeSelect.value, categorySelect.value);
    } else {
      alert("Session terminée !");
    }
  }

  clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  let drawing = false;
  canvas.addEventListener("mousedown", () => drawing = true);
  canvas.addEventListener("mouseup", () => drawing = false);
  canvas.addEventListener("mousemove", e => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  });
});
