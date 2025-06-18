// ordinals.js
// Lógica para página de números ordinais, interface igual à de numbers

const ordinals = [
  { num: 1, short: "1st", name: "first" },
  { num: 2, short: "2nd", name: "second" },
  { num: 3, short: "3rd", name: "third" },
  { num: 4, short: "4th", name: "fourth" },
  { num: 5, short: "5th", name: "fifth" },
  { num: 6, short: "6th", name: "sixth" },
  { num: 7, short: "7th", name: "seventh" },
  { num: 8, short: "8th", name: "eighth" },
  { num: 9, short: "9th", name: "ninth" },
  { num: 10, short: "10th", name: "tenth" },
  { num: 11, short: "11th", name: "eleventh" },
  { num: 12, short: "12th", name: "twelfth" },
  { num: 13, short: "13th", name: "thirteenth" },
  { num: 14, short: "14th", name: "fourteenth" },
  { num: 15, short: "15th", name: "fifteenth" },
  { num: 16, short: "16th", name: "sixteenth" },
  { num: 17, short: "17th", name: "seventeenth" },
  { num: 18, short: "18th", name: "eighteenth" },
  { num: 19, short: "19th", name: "nineteenth" },
  { num: 20, short: "20th", name: "twentieth" },
];
const ordTens = [
  { num: 30, short: "30th", name: "thirtieth" },
  { num: 40, short: "40th", name: "fortieth" },
  { num: 50, short: "50th", name: "fiftieth" },
  { num: 60, short: "60th", name: "sixtieth" },
  { num: 70, short: "70th", name: "seventieth" },
  { num: 80, short: "80th", name: "eightieth" },
  { num: 90, short: "90th", name: "ninetieth" },
];
const ordSpecials = [
  { num: 100, short: "100th", name: "one hundredth" },
  { num: 1000, short: "1000th", name: "one thousandth" },
  { num: 10000, short: "10000th", name: "ten thousandth" },
  { num: 100000, short: "100000th", name: "one hundred thousandth" },
  { num: 1000000, short: "1000000th", name: "one millionth" },
];

function speak(text) {
  if ("speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1.05;
    utter.pitch = 1.1;
    utter.volume = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

// Utilitário para controlar fala/stop
let isSpeaking = false;
function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  isSpeaking = false;
}
function speakWithStop(text, btnId, iconId) {
  stopSpeech();
  isSpeaking = true;
  // Troca ícone para stop
  const btn = document.getElementById(btnId);
  const icon = document.getElementById(iconId);
  if (icon) {
    icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="13" fill="#fff" stroke="#003466" stroke-width="2"/><rect x="10" y="10" width="8" height="8" rx="2" fill="#003466"/></svg>`;
  }
  if (btn) btn.setAttribute("aria-label", "Stop audio");
  if ("speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1.05;
    utter.pitch = 1.1;
    utter.volume = 1;
    utter.onend = utter.onerror = () => {
      isSpeaking = false;
      if (icon)
        icon.innerHTML = `<svg width='20' height='20' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='14' cy='14' r='13' fill='#fff' stroke='#003466' stroke-width='2'/><polygon points='11,9 20,14 11,19' fill='#003466'/></svg>`;
      if (btn) btn.setAttribute("aria-label", "Play audio");
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function renderOrdinalsGrid() {
  const grid = document.getElementById("ordinals-learn-grid");
  grid.innerHTML = "";
  ordinals.forEach(({ num, short, name }) => {
    const card = document.createElement("div");
    card.className = "number-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `${short} - ${name} (click to listen)`);
    card.innerHTML = `
      <span class="num">${short}</span>
      <span class="name">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
    `;
    card.onclick = () => speak(name);
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") speak(name);
    };
    grid.appendChild(card);
  });
}
function renderOrdinalsTensGrid() {
  const grid = document.getElementById("ordinals-tens-grid");
  grid.innerHTML = "";
  ordTens.forEach(({ num, short, name }) => {
    const card = document.createElement("div");
    card.className = "number-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `${short} - ${name} (click to listen)`);
    card.innerHTML = `
      <span class="num">${short}</span>
      <span class="name">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
    `;
    card.onclick = () => speak(name);
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") speak(name);
    };
    grid.appendChild(card);
  });
}
function renderOrdinalsSpecialsGrid() {
  const grid = document.getElementById("ordinals-special-grid");
  grid.innerHTML = "";
  ordSpecials.forEach(({ num, short, name }) => {
    const card = document.createElement("div");
    card.className = "number-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `${short} - ${name} (click to listen)`);
    card.innerHTML = `
      <span class="num">${short}</span>
      <span class="name">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
    `;
    card.onclick = () => speak(name);
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") speak(name);
    };
    grid.appendChild(card);
  });
}

// Utilitário para gerar ordinal por extenso até 100
function numberToOrdinal(n) {
  if (n < 1 || n > 1000000) return "";
  if (n <= 20) return ordinals[n - 1].name;
  if (n < 100) {
    const t = Math.floor(n / 10) * 10;
    const u = n % 10;
    const tWord = ordTens.find((o) => o.num === t)?.name;
    if (u === 0) return tWord;
    return (
      ordinals[u - 1].name.replace(/\b\w/, (c) => c.toLowerCase()) + " " + tWord
    );
  }
  if (n === 100) return ordSpecials[0].name;
  if (n === 1000) return ordSpecials[1].name;
  if (n === 10000) return ordSpecials[2].name;
  if (n === 100000) return ordSpecials[3].name;
  if (n === 1000000) return ordSpecials[4].name;
  return n + "th";
}

function highlightCard(grid, idx) {
  const cards = grid.querySelectorAll(".number-card");
  cards.forEach((c, i) => {
    if (i === idx) {
      c.classList.add("active-audio");
    } else {
      c.classList.remove("active-audio");
    }
  });
}
function clearHighlight(grid) {
  grid
    .querySelectorAll(".number-card")
    .forEach((c) => c.classList.remove("active-audio"));
}

function playAllOrdinals(gridId, dataArr) {
  const grid = document.getElementById(gridId);
  let i = 0;
  function playNext() {
    if (i >= dataArr.length) {
      clearHighlight(grid);
      return;
    }
    highlightCard(grid, i);
    speak(dataArr[i].name);
    setTimeout(() => {
      i++;
      playNext();
    }, 1200);
  }
  playNext();
}

// Funções para controle de animação e áudio dos botões
let currentAudioSequence = null;

function toggleButtonAnimation(button, isPlaying) {
  if (isPlaying) {
    button.classList.add("active");
  } else {
    button.classList.remove("active");
  }
}

function playSequentialOrdinals(gridId, dataArr, buttonId) {
  const grid = document.getElementById(gridId);
  const button = document.getElementById(buttonId);

  // Se já estiver tocando, para a sequência
  if (currentAudioSequence && currentAudioSequence.isPlaying) {
    stopCurrentSequence();
    return;
  }

  let i = 0;
  toggleButtonAnimation(button, true);

  currentAudioSequence = {
    isPlaying: true,
    stop: () => {
      currentAudioSequence.isPlaying = false;
      stopSpeech();
      clearHighlight(grid);
      toggleButtonAnimation(button, false);
    },
  };

  function playNext() {
    if (!currentAudioSequence.isPlaying || i >= dataArr.length) {
      stopCurrentSequence();
      return;
    }
    highlightCard(grid, i);
    speak(dataArr[i].name);
    setTimeout(() => {
      i++;
      playNext();
    }, 1200);
  }

  playNext();
}

function stopCurrentSequence() {
  if (currentAudioSequence) {
    currentAudioSequence.stop();
    currentAudioSequence = null;
  }
}

// Quiz de escrita de ordinais
let currentOrdinal = null;

function setupWriteQuiz() {
  const maxInput = document.getElementById("write-quiz-max");
  const quizInput = document.getElementById("write-quiz-input");
  const playBtn = document.getElementById("play-random-audio");
  const submitBtn = document.getElementById("write-quiz-submit");
  const nextBtn = document.getElementById("write-quiz-next");
  const feedback = document.getElementById("write-quiz-feedback");

  function playNewOrdinal() {
    if (currentOrdinal) {
      // Se já houver um ordinal atual, apenas repete o áudio
      speak(currentOrdinal.text);
      return;
    }

    // Gera um novo ordinal apenas quando currentOrdinal for null
    const max = parseInt(maxInput.value) || 20;
    const num = Math.floor(Math.random() * max) + 1;
    currentOrdinal = {
      number: num,
      text: numberToOrdinal(num),
    };
    speak(currentOrdinal.text);

    // Reset UI
    quizInput.value = "";
    quizInput.disabled = false;
    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
    feedback.textContent = "";
    feedback.className = "typing-feedback";
  }

  function checkAnswer() {
    if (!currentOrdinal) return;

    const userAnswer = quizInput.value.trim().toLowerCase();
    const correctAnswer = currentOrdinal.text.toLowerCase();
    const correctSymbol =
      currentOrdinal.number + currentOrdinal.text.slice(-2).toLowerCase(); // Exemplo: 1st

    if (userAnswer === correctAnswer || userAnswer === correctSymbol) {
      feedback.textContent = "Correct! 🎉";
      feedback.className = "typing-feedback success";
      quizInput.disabled = true; // Desativa o campo apenas se a resposta estiver correta
      submitBtn.style.display = "none";
      nextBtn.style.display = "inline-block";
      currentOrdinal = null; // Reseta o ordinal atual para permitir um novo na próxima rodada
    } else {
      feedback.textContent = "Try again!"; // Não mostra a resposta correta
      feedback.className = "typing-feedback error";
      quizInput.disabled = false; // Reativa o campo para permitir nova tentativa
      submitBtn.style.display = "inline-block";
      nextBtn.style.display = "none";
    }
  }

  // Event Listeners
  playBtn.onclick = playNewOrdinal;
  submitBtn.onclick = checkAnswer;
  nextBtn.onclick = playNewOrdinal;

  quizInput.onkeypress = (e) => {
    if (e.key === "Enter") checkAnswer();
  };

  // Start with first ordinal
  playNewOrdinal();
}

window.addEventListener("DOMContentLoaded", () => {
  renderOrdinalsGrid();
  renderOrdinalsTensGrid();
  renderOrdinalsSpecialsGrid();

  // Configurando os botões de play/pause
  document.getElementById("play-all-ordinals").onclick = () => {
    playSequentialOrdinals(
      "ordinals-learn-grid",
      ordinals,
      "play-all-ordinals"
    );
  };

  document.getElementById("play-all-ordinals-tens").onclick = () => {
    playSequentialOrdinals(
      "ordinals-tens-grid",
      ordTens,
      "play-all-ordinals-tens"
    );
  };

  document.getElementById("play-all-ordinals-special").onclick = () => {
    playSequentialOrdinals(
      "ordinals-special-grid",
      ordSpecials,
      "play-all-ordinals-special"
    );
  };

  // Inicializar o quiz
  setupWriteQuiz();

  // Para quando mudar de página ou fechar
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopCurrentSequence();
    }
  });
});
