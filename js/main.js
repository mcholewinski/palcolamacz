window.addEventListener("load", init);

// Poziomy
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

// Ustaw Poziom
let currentLevel = levels.easy;

// Zmienne Globalne
let time = currentLevel;
let score = 0;
let isPlaying;

// Elementy DOM
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const levelSelect = document.querySelector("#levelSelector");

// Slowa

const words = [
  "wesoły",
  "kot",
  "pies",
  "echo",
  "mleko",
  "piwo",
  "wyrozumiały",
  "zafascynowany",
  "torpeda",
  "auto",
  "kosmos",
  "smok",
  "truskawka",
  "onomatopeja",
  "chleb",
  "dom",
  "kaktus",
  "palma",
  "ekran",
  "wrzeciono",
  "pchła",
  "samochód",
  "skuter",
  "policja",
  "standard",
  "doniczka",
  "komputer",
  "palec",
  "sufit",
  "awaria",
  "przyjaciel",
  "obcy",
  "nakład",
  "złoty",
  "drewno",
  "list",
  "postronny",
  "cześć",
  "kolacja",
  "wystawa",
  "kino"
];

// Zmien Poziom
levelSelect.addEventListener("change", changeLevel);

function changeLevel() {
  currentLevel = levels[levelSelect.value];
  seconds.innerHTML = currentLevel;
  time = currentLevel;
}

// Rozpoczecie Gry
function init() {
  // Pokaz ilosc sekund w UI
  seconds.innerHTML = currentLevel;
  // Wczytanie slowa z tablicy
  showWord(words);
  // Zacznij sprawdzanie slowa
  wordInput.addEventListener("input", startMatch);
  // Odlicz co sekunde
  setInterval(countdown, 1000);
  // Sprawdz czy nie koniec gry
  setInterval(checkStatus, 50);
}

// Zacznij sprawdzac
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score += 5;
  }

  if (score === -5) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Sprawdz obecne slowo z wordInput
function matchWords() {
  if (wordInput.value.toLowerCase() === currentWord.innerHTML) {
    message.innerHTML = "Dobrze!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

// Wybierz i pokaz losowe slowo
function showWord(words) {
  // Generowanie losowego indexu
  const randIndex = Math.floor(Math.random() * words.length);
  // Zwroc losowe slowo
  currentWord.innerHTML = words[randIndex];
}

// Odliczanie
function countdown() {
  // Jesli czas wiekszy niz 0 to obniz o 1
  if (time > 0) {
    time--;
  } else if (time === 0) {
    // Koniec gry
    isPlaying = false;
  }
  // Pokaz czas
  timeDisplay.innerHTML = time;
}

// Sprawdz status gry
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Koniec Gry!";
    score = -5;
  }
}
