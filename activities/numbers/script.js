// numbers/script.js
// Lógica JS para "Learn English Numbers: 1 to 20" (adultos iniciantes)
// Vanilla JS, acessível, comentado

// Dados dos números
const numbers = [
  { num: 1, name: "one", audio: "audio/one.mp3" },
  { num: 2, name: "two", audio: "audio/two.mp3" },
  { num: 3, name: "three", audio: "audio/three.mp3" },
  { num: 4, name: "four", audio: "audio/four.mp3" },
  { num: 5, name: "five", audio: "audio/five.mp3" },
  { num: 6, name: "six", audio: "audio/six.mp3" },
  { num: 7, name: "seven", audio: "audio/seven.mp3" },
  { num: 8, name: "eight", audio: "audio/eight.mp3" },
  { num: 9, name: "nine", audio: "audio/nine.mp3" },
  { num: 10, name: "ten", audio: "audio/ten.mp3" },
  { num: 11, name: "eleven", audio: "audio/eleven.mp3" },
  { num: 12, name: "twelve", audio: "audio/twelve.mp3" },
  { num: 13, name: "thirteen", audio: "audio/thirteen.mp3" },
  { num: 14, name: "fourteen", audio: "audio/fourteen.mp3" },
  { num: 15, name: "fifteen", audio: "audio/fifteen.mp3" },
  { num: 16, name: "sixteen", audio: "audio/sixteen.mp3" },
  { num: 17, name: "seventeen", audio: "audio/seventeen.mp3" },
  { num: 18, name: "eighteen", audio: "audio/eighteen.mp3" },
  { num: 19, name: "nineteen", audio: "audio/nineteen.mp3" },
  { num: 20, name: "twenty", audio: "audio/twenty.mp3" },
];

const tens = [
  { num: 30, name: "thirty", audio: "audio/thirty.mp3" },
  { num: 40, name: "forty", audio: "audio/forty.mp3" },
  { num: 50, name: "fifty", audio: "audio/fifty.mp3" },
  { num: 60, name: "sixty", audio: "audio/sixty.mp3" },
  { num: 70, name: "seventy", audio: "audio/seventy.mp3" },
  { num: 80, name: "eighty", audio: "audio/eighty.mp3" },
  { num: 90, name: "ninety", audio: "audio/ninety.mp3" },
];

const specials = [
  { num: 100, name: "one hundred", audio: "audio/onehundred.mp3" },
  { num: 1000, name: "one thousand", audio: "audio/onethousand.mp3" },
  { num: 10000, name: "ten thousand", audio: "audio/tenthousand.mp3" },
  {
    num: 100000,
    name: "one hundred thousand",
    audio: "audio/onehundredthousand.mp3",
  },
  { num: 1000000, name: "one million", audio: "audio/onemillion.mp3" },
];

// Utilitário: shuffle array
function shuffle(arr) {
  let a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Variável global para velocidade
let playbackRate = 1.0;
const speedBtns = [
  { id: "speed-numbers", section: "numbers" },
  { id: "speed-tens", section: "tens" },
  { id: "speed-special", section: "special" },
  { id: "speed-random", section: "random" },
];
const speedSteps = [1, 1.25, 1.5];
function nextSpeed(current) {
  const idx = speedSteps.indexOf(current);
  return speedSteps[(idx + 1) % speedSteps.length];
}
function updateAllSpeedBtns(rate) {
  speedBtns.forEach(({ id }) => {
    const btn = document.getElementById(id);
    if (btn) btn.textContent = rate + "x";
  });
}
// Atualiza velocidade ao clicar
speedBtns.forEach(({ id }) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.onclick = (e) => {
      playbackRate = nextSpeed(playbackRate);
      updateAllSpeedBtns(playbackRate);
    };
  }
});

// Utilitário: tocar áudio (simulado)
function playAudio(src, fallbackText) {
  // Simula áudio: se não houver arquivo, usa SpeechSynthesis
  if (src && src.endsWith(".mp3")) {
    const audio = new Audio(src);
    audio.playbackRate = playbackRate;
    audio.play().catch(() => speak(fallbackText));
  } else {
    speak(fallbackText);
  }
}
// Atualize speak para aceitar callback onend
function speak(text, onend) {
  if ("speechSynthesis" in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = playbackRate;
    utter.pitch = 1.1;
    utter.volume = 1;
    utter.onend = utter.onerror = () => {
      if (onend) onend();
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  } else if (onend) {
    onend();
  }
}

// Renderiza a grade de aprendizado visual/auditivo
function renderLearnGrid() {
  const grid = document.getElementById("numbers-learn-grid");
  grid.innerHTML = "";
  numbers.forEach(({ num, name, audio }) => {
    const card = document.createElement("div");
    card.className = "number-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `${num} - ${name} (click to listen)`);
    card.innerHTML = `
      <span class="num">${num}</span>
      <span class="name">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
    `;
    card.onclick = (e) => {
      playAudio(audio, name);
    };
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        playAudio(audio, name);
      }
    };
    grid.appendChild(card);
  });
}

function renderTensGrid() {
  const grid = document.getElementById("numbers-tens-grid");
  grid.innerHTML = "";
  tens.forEach(({ num, name, audio }) => {
    const card = document.createElement("div");
    card.className = "number-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `${num} - ${name} (click to listen)`);
    card.innerHTML = `
      <span class="num">${num}</span>
      <span class="name">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
    `;
    card.onclick = (e) => {
      playAudio(audio, name);
    };
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        playAudio(audio, name);
      }
    };
    grid.appendChild(card);
  });
}

function renderSpecialsGrid() {
  const grid = document.getElementById("numbers-special-grid");
  grid.innerHTML = "";
  specials.forEach(({ num, name, audio }) => {
    const card = document.createElement("div");
    card.className = "number-card";
    card.tabIndex = 0;
    card.setAttribute("aria-label", `${num} - ${name} (click to listen)`);
    card.innerHTML = `
      <span class="num">${num.toLocaleString("en-US")}</span>
      <span class="name">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
    `;
    card.onclick = (e) => {
      playAudio(audio, name);
    };
    card.onkeydown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        playAudio(audio, name);
      }
    };
    grid.appendChild(card);
  });
}

// Utilitário para converter número em texto em inglês (até 1 milhão)
function numberToEnglish(n) {
  if (n < 0 || n > 1000000) return "";
  if (n === 0) return "zero";
  if (n === 1000000) return "one million";
  const below20 = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  let result = "";
  if (n >= 1000) {
    if (n >= 100000) {
      result += numberToEnglish(Math.floor(n / 1000)) + " thousand";
    } else {
      result += below20[Math.floor(n / 1000)] + " thousand";
    }
    if (n % 1000 !== 0) result += " " + numberToEnglish(n % 1000);
    return result.trim();
  }
  if (n >= 100) {
    result += below20[Math.floor(n / 100)] + " hundred";
    if (n % 100 !== 0) result += " and " + numberToEnglish(n % 100);
    return result.trim();
  }
  if (n >= 20) {
    result += tens[Math.floor(n / 10)];
    if (n % 10 !== 0) result += "-" + below20[n % 10];
    return result.trim();
  }
  return below20[n];
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

function playAllNumbers(gridId, dataArr, getName, onend) {
  const grid = document.getElementById(gridId);
  let i = 0;
  let stopped = false;
  function playNext() {
    if (stopped || i >= dataArr.length) {
      clearHighlight(grid);
      if (onend) onend();
      return;
    }
    highlightCard(grid, i);
    speak(getName(dataArr[i]), () => {
      i++;
      playNext();
    });
  }
  stopped = false;
  playNext();
  // Para stop externo
  return () => {
    stopped = true;
    clearHighlight(grid);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (onend) onend();
  };
}

// --- Play/Stop logic for main play buttons ---
let isSpeaking = false;
function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  isSpeaking = false;
}
function speakWithStop(text, btnId, iconId) {
  stopSpeech();
  isSpeaking = true;
  const btn = document.getElementById(btnId);
  const icon = document.getElementById(iconId);
  if (icon) {
    icon.innerHTML = `<svg width='20' height='20' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='14' cy='14' r='13' fill='#fff' stroke='#003466' stroke-width='2'/><rect x='10' y='10' width='8' height='8' rx='2' fill='#003466'/></svg>`;
  }
  if (btn) btn.setAttribute("aria-label", "Stop audio");
  if ("speechSynthesis" in window) {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = playbackRate;
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

function setupModernAudioButton(btnId, playFn, stopFn) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  let isActive = false;
  let stopCurrent = null;
  function activate() {
    btn.classList.add("active");
    isActive = true;
    stopCurrent = playFn(() => {
      btn.classList.remove("active");
      isActive = false;
      stopCurrent = null;
    });
  }
  function deactivate() {
    btn.classList.remove("active");
    isActive = false;
    if (stopCurrent) stopCurrent();
    stopCurrent = null;
    if (stopFn) stopFn();
  }
  btn.onclick = () => {
    if (isActive) {
      deactivate();
    } else {
      activate();
    }
  };
  btn.onkeydown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      btn.click();
    }
  };
}

// Quiz de escrita de números
let currentNumber = null;
let isQuizSpeaking = false;

function setupWriteQuiz() {
  const maxInput = document.getElementById("write-quiz-max");
  const quizInput = document.getElementById("write-quiz-input");
  const playBtn = document.getElementById("play-random-audio");
  const submitBtn = document.getElementById("write-quiz-submit");
  const nextBtn = document.getElementById("write-quiz-next");
  const feedback = document.getElementById("write-quiz-feedback");

  function toggleQuizButtonAnimation(button, isPlaying) {
    if (isPlaying) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  }

  function playNewNumber() {
    if (currentNumber) {
      // Se já houver um número atual, apenas repete o áudio
      isQuizSpeaking = true;
      toggleQuizButtonAnimation(playBtn, true);
      speak(currentNumber.text, () => {
        isQuizSpeaking = false;
        toggleQuizButtonAnimation(playBtn, false);
      });
      return;
    }

    // Gera um novo número apenas quando currentNumber for null
    const max = parseInt(maxInput.value) || 20;
    const num = Math.floor(Math.random() * max) + 1;
    currentNumber = {
      number: num,
      text: numberToEnglish(num),
    };

    isQuizSpeaking = true;
    toggleQuizButtonAnimation(playBtn, true);
    speak(currentNumber.text, () => {
      isQuizSpeaking = false;
      toggleQuizButtonAnimation(playBtn, false);
    });

    // Reset UI
    quizInput.value = "";
    quizInput.disabled = false;
    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
    feedback.textContent = "";
    feedback.className = "typing-feedback";
  }

  function checkAnswer() {
    if (!currentNumber) return;

    const userAnswer = parseInt(quizInput.value);

    if (userAnswer === currentNumber.number) {
      feedback.textContent = "Correct! 🎉";
      feedback.className = "typing-feedback success";
      quizInput.disabled = true; // Desativa o campo apenas se a resposta estiver correta
      submitBtn.style.display = "none";
      nextBtn.style.display = "inline-block";
      currentNumber = null; // Reseta o número atual para permitir um novo na próxima rodada
    } else {
      feedback.textContent = "Try again!"; // Não mostra a resposta correta
      feedback.className = "typing-feedback error";
      quizInput.disabled = false; // Reativa o campo para permitir nova tentativa
      submitBtn.style.display = "inline-block";
      nextBtn.style.display = "none";
    }
  }

  // Event Listeners
  playBtn.onclick = playNewNumber;
  submitBtn.onclick = checkAnswer;
  nextBtn.onclick = playNewNumber;

  quizInput.onkeypress = (e) => {
    if (e.key === "Enter") checkAnswer();
  };

  // Para quando mudar de página ou fechar
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && isQuizSpeaking) {
      stopSpeech();
      isQuizSpeaking = false;
      toggleQuizButtonAnimation(playBtn, false);
    }
  });

  // Start with first number
  playNewNumber();
}

window.addEventListener("DOMContentLoaded", () => {
  renderLearnGrid();
  renderTensGrid();
  renderSpecialsGrid();
  // Atividade: Ouça e escreva o número
  let currentRandom = null;
  let maxRandom = 1000;
  const playBtn = document.getElementById("play-random-audio");
  const input = document.getElementById("write-quiz-input");
  const submitBtn = document.getElementById("write-quiz-submit");
  const feedback = document.getElementById("write-quiz-feedback");
  const nextBtn = document.getElementById("write-quiz-next");
  const maxInput = document.getElementById("write-quiz-max");
  maxInput.value = 1000;

  function newRandomQuiz() {
    // Gera número aleatório entre 1 e 1.000.000
    currentRandom = Math.floor(Math.random() * maxRandom) + 1;
    feedback.textContent = "";
    nextBtn.style.display = "none";
    input.value = "";
    input.disabled = false;
    submitBtn.disabled = false;
  }

  playBtn.onclick = () => {
    if (currentRandom) speak(numberToEnglish(currentRandom));
  };

  submitBtn.onclick = () => {
    if (!currentRandom) return;
    const val = input.value.trim();
    if (val === String(currentRandom)) {
      feedback.textContent = "Correct!";
      feedback.className = "typing-feedback success";
      input.disabled = true;
      submitBtn.disabled = true;
      nextBtn.style.display = "inline-block";
    } else {
      feedback.textContent = "Try again!";
      feedback.className = "typing-feedback error";
    }
  };
  input.onkeydown = (e) => {
    if (e.key === "Enter") submitBtn.click();
  };
  nextBtn.onclick = () => {
    newRandomQuiz();
  };
  maxInput.onchange = () => {
    let val = parseInt(maxInput.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > 1000000) val = 1000000;
    maxInput.value = val;
    maxRandom = val;
    newRandomQuiz();
  };
  newRandomQuiz();
  // Repaginar botão de play da atividade
  playBtn.innerHTML = `<span style="display:inline-block;width:2.5rem;height:2.5rem;background:linear-gradient(135deg,#fbbf24 60%,#c7d2fe 100%);border-radius:50%;box-shadow:0 2px 8px #00336622;display:flex;align-items:center;justify-content:center;transition:background 0.2s;"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="13" fill="#fff" stroke="#2563eb" stroke-width="2"/><polygon points="11,9 20,14 11,19" fill="#2563eb"/></svg></span>`;
  playBtn.style.background = "none";
  playBtn.style.border = "none";
  playBtn.style.boxShadow = "none";
  playBtn.style.padding = "0";
  playBtn.style.marginBottom = "0.7rem";
  playBtn.style.cursor = "pointer";
  playBtn.onmouseover = () =>
    (playBtn.firstChild.style.background =
      "linear-gradient(135deg,#c7d2fe 60%,#fbbf24 100%)");
  playBtn.onmouseout = () =>
    (playBtn.firstChild.style.background =
      "linear-gradient(135deg,#fbbf24 60%,#c7d2fe 100%)");
  setupModernAudioButton(
    "play-all-numbers",
    (onend) =>
      playAllNumbers("numbers-learn-grid", numbers, (n) => n.name, onend),
    () => stopSpeech()
  );
  setupModernAudioButton(
    "play-all-tens",
    (onend) => playAllNumbers("numbers-tens-grid", tens, (n) => n.name, onend),
    () => stopSpeech()
  );
  setupModernAudioButton(
    "play-all-special",
    (onend) =>
      playAllNumbers("numbers-special-grid", specials, (n) => n.name, onend),
    () => stopSpeech()
  );

  // Inicializar o quiz
  setupWriteQuiz();
});
