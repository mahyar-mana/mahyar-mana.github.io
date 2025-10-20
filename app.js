document.addEventListener("DOMContentLoaded", () => {
  const webApp = window.Bale.WebApp;
  webApp.ready();

  const theme = webApp.themeParams || {};
  document.body.style.setProperty('--bg-color', theme.bg_color || '#fff');
  document.body.style.setProperty('--text-color', theme.text_color || '#000');
  document.body.style.setProperty('--button-color', theme.button_color || '#0088cc');
  document.body.style.setProperty('--button-text-color', theme.button_text_color || '#fff');

  // Elements
  const pairing = document.getElementById("pairing");
  const quizDiv = document.getElementById("quiz");
  const resultsDiv = document.getElementById("results");
  const questionText = document.getElementById("question-text");
  const answersDiv = document.getElementById("answers");
  const nextBtn = document.getElementById("next-btn");
  const winnerText = document.getElementById("winner");

  const player1Input = document.getElementById("player1");
  const player2Input = document.getElementById("player2");
  const startBtn = document.getElementById("start-game");
  const restartBtn = document.getElementById("restart");

  let players = [];
  let currentPlayerIndex = 0;
  let round = 0;
  const totalRounds = 5;

  // Sample questions
  const questions = [
    { q: "پایتخت ایران چیست؟", options: ["تهران", "اصفهان", "شیراز"], answer: 0 },
    { q: "عدد π تقریبا برابر است با؟", options: ["3.14", "2.71", "1.61"], answer: 0 },
    { q: "زرافه چه طول گردنی دارد؟", options: ["کمتر از 2 متر", "حدود 2 متر", "بیش از 2 متر"], answer: 2 },
    { q: "رنگ آسمان در روز روشن چیست؟", options: ["آبی", "سبز", "قرمز"], answer: 0 },
    { q: "سیاره نزدیک به خورشید؟", options: ["زمین", "عطارد", "مریخ"], answer: 1 }
  ];

  startBtn.onclick = () => {
    const p1 = player1Input.value.trim();
    const p2 = player2Input.value.trim();
    if (!p1 || !p2) return alert("لطفاً نام هر دو بازیکن را وارد کنید!");

    players = [
      { name: p1, score: 0 },
      { name: p2, score: 0 }
    ];

    pairing.style.display = "none";
    quizDiv.style.display = "block";
    round = 0;
    currentPlayerIndex = 0;
    showQuestion();
  };

  function showQuestion() {
    if (round >= totalRounds) {
      showResults();
      return;
    }

    const q = questions[round];
    questionText.textContent = `${players[currentPlayerIndex].name} نوبت شما: ${q.q}`;
    answersDiv.innerHTML = "";
    nextBtn.style.display = "none";

    q.options.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => {
        if (idx === q.answer) players[currentPlayerIndex].score++;
        nextBtn.style.display = "block";
        // disable all buttons
        Array.from(answersDiv.children).forEach(b => b.disabled = true);
      };
      answersDiv.appendChild(btn);
    });
  }

  nextBtn.onclick = () => {
    // Switch player or next round
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    if (currentPlayerIndex === 0) round++;
    showQuestion();
  };

  function showResults() {
    quizDiv.style.display = "none";
    resultsDiv.style.display = "block";

    const [p1, p2] = players;
    if (p1.score > p2.score) winnerText.textContent = `🏆 ${p1.name} برنده شد! (${p1.score} - ${p2.score})`;
    else if (p2.score > p1.score) winnerText.textContent = `🏆 ${p2.name} برنده شد! (${p2.score} - ${p1.score})`;
    else winnerText.textContent = `⚖️ مساوی شد! (${p1.score} - ${p2.score})`;
  }

  restartBtn.onclick = () => {
    resultsDiv.style.display = "none";
    pairing.style.display = "block";
    player1Input.value = "";
    player2Input.value = "";
  };
});
