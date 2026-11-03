const quizContainer = document.getElementById("quizContainer");
const submitQuizBtn = document.getElementById("submitQuizBtn");
const resetQuizBtn = document.getElementById("resetQuizBtn");
const quizResult = document.getElementById("quizResult");
const quizTimer = document.getElementById("quizTimer");

const quizData = [
  {
    vi: "Khi nhận được tin nhắn yêu cầu xác minh tài khoản bằng link lạ, bạn nên làm gì?",
    en: "What should you do if you receive a message asking you to verify your account through a suspicious link?",
    optionsVi: [
      "Bấm vào ngay để tránh bị khóa tài khoản",
      "Bỏ qua hoặc xác minh qua kênh chính thức",
      "Gửi tiếp cho bạn bè",
      "Nhập thử thông tin để kiểm tra",
    ],
    optionsEn: [
      "Click it immediately to avoid account suspension",
      "Ignore it or verify through official channels",
      "Forward it to friends",
      "Enter your details to test it",
    ],
    answer: 1,
    explainVi:
      "Bạn cần xác minh qua nguồn chính thức thay vì bấm vào liên kết lạ.",
    explainEn:
      "You should verify through official sources instead of clicking a suspicious link.",
  },
  {
    vi: "Mật khẩu nào an toàn hơn?",
    en: "Which password is more secure?",
    optionsVi: ["12345678", "minhhoang2005", "CyberSafe@2026!", "password"],
    optionsEn: ["12345678", "minhhoang2005", "CyberSafe@2026!", "password"],
    answer: 2,
    explainVi:
      "Mật khẩu mạnh nên kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt.",
    explainEn:
      "A strong password should combine uppercase, lowercase, numbers, and special characters.",
  },
  {
    vi: "OTP dùng để làm gì?",
    en: "What is an OTP used for?",
    optionsVi: [
      "Là mã xác thực một lần",
      "Là mật khẩu chính",
      "Là mã khuyến mãi",
      "Là tên đăng nhập",
    ],
    optionsEn: [
      "A one-time verification code",
      "A main password",
      "A promotion code",
      "A username",
    ],
    answer: 0,
    explainVi: "OTP là mã dùng một lần để xác thực giao dịch hoặc đăng nhập.",
    explainEn:
      "An OTP is a one-time code used to verify transactions or logins.",
  },
  {
    vi: "Dấu hiệu nào thường gặp ở website giả mạo?",
    en: "Which sign is common in a fake website?",
    optionsVi: [
      "Tên miền rõ ràng, chính xác",
      "URL ngắn gọn từ thương hiệu thật",
      "Tên miền lạ hoặc gần giống thương hiệu",
      "Có trung tâm hỗ trợ chính thức",
    ],
    optionsEn: [
      "Clear and accurate domain",
      "Short official brand URL",
      "A strange or brand-like domain",
      "An official support center",
    ],
    answer: 2,
    explainVi:
      "Website giả mạo thường dùng tên miền gần giống để đánh lừa người dùng.",
    explainEn: "Fake websites often use lookalike domains to trick users.",
  },
  {
    vi: "Nếu đã lỡ nhập mật khẩu vào website giả, bạn nên ưu tiên việc gì?",
    en: "If you entered your password on a fake website, what should you prioritize?",
    optionsVi: [
      "Tắt máy ngay",
      "Đổi mật khẩu và bật xác thực hai lớp",
      "Đăng bài lên mạng xã hội",
      "Không làm gì cả",
    ],
    optionsEn: [
      "Turn off your computer immediately",
      "Change the password and enable two-factor authentication",
      "Post about it on social media",
      "Do nothing",
    ],
    answer: 1,
    explainVi: "Đổi mật khẩu và tăng lớp bảo vệ là bước ưu tiên.",
    explainEn: "Changing the password and adding protection is the priority.",
  },
  {
    vi: "Tại sao không nên dùng cùng một mật khẩu cho nhiều tài khoản?",
    en: "Why should you avoid reusing the same password for multiple accounts?",
    optionsVi: [
      "Vì khó nhớ hơn",
      "Vì nếu lộ một nơi thì nhiều tài khoản có thể bị ảnh hưởng",
      "Vì không đẹp",
      "Vì máy tính không cho phép",
    ],
    optionsEn: [
      "Because it is harder to remember",
      "Because one breach can affect multiple accounts",
      "Because it looks bad",
      "Because computers do not allow it",
    ],
    answer: 1,
    explainVi:
      "Tái sử dụng mật khẩu làm tăng nguy cơ bị chiếm nhiều tài khoản cùng lúc.",
    explainEn:
      "Password reuse increases the risk of multiple accounts being compromised.",
  },
  {
    vi: "Kẻ lừa đảo thường tạo cảm giác khẩn cấp để làm gì?",
    en: "Why do scammers create a sense of urgency?",
    optionsVi: [
      "Để giúp đỡ người dùng",
      "Để người dùng không kịp suy nghĩ và dễ mắc bẫy",
      "Để tăng tốc độ Internet",
      "Để cải thiện bảo mật",
    ],
    optionsEn: [
      "To help users",
      "To stop users from thinking clearly and make them easier to trap",
      "To speed up the internet",
      "To improve security",
    ],
    answer: 1,
    explainVi: "Tâm lý khẩn cấp khiến nạn nhân phản ứng vội vàng.",
    explainEn: "Urgency pressures victims to react without careful thinking.",
  },
  {
    vi: "Biện pháp nào giúp tăng an toàn tài khoản?",
    en: "Which measure helps improve account security?",
    optionsVi: [
      "Chia sẻ mật khẩu cho bạn thân",
      "Tắt mọi cảnh báo",
      "Bật xác thực hai lớp và cập nhật mật khẩu định kỳ",
      "Dùng mật khẩu ngắn cho dễ nhớ",
    ],
    optionsEn: [
      "Share your password with a close friend",
      "Disable all alerts",
      "Enable two-factor authentication and update passwords regularly",
      "Use a short password for convenience",
    ],
    answer: 2,
    explainVi:
      "Đây là một trong những cách phổ biến và hiệu quả để nâng cao bảo mật tài khoản.",
    explainEn:
      "This is one of the most common and effective ways to improve account security.",
  },
];

let timer = 300;
let timerInterval;

function langNow() {
  return localStorage.getItem("cybersafe_lang") || "vi";
}

function renderQuiz() {
  const lang = langNow();
  quizContainer.innerHTML = quizData
    .map(
      (item, index) => `
    <div class="quiz-card">
      <h3>${index + 1}. ${lang === "vi" ? item.vi : item.en}</h3>
      <div class="quiz-options">
        ${(lang === "vi" ? item.optionsVi : item.optionsEn)
          .map(
            (option, optionIndex) => `
          <label class="quiz-option">
            <input type="radio" name="question-${index}" value="${optionIndex}">
            <span>${option}</span>
          </label>
        `,
          )
          .join("")}
      </div>
    </div>
  `,
    )
    .join("");

  quizResult.classList.add("hidden");
}

function startTimer() {
  clearInterval(timerInterval);
  timer = 300;
  updateTimerText();

  timerInterval = setInterval(() => {
    timer--;
    updateTimerText();
    if (timer <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function updateTimerText() {
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");
  quizTimer.textContent = `${minutes}:${seconds}`;
}

function submitQuiz() {
  clearInterval(timerInterval);
  const lang = langNow();
  let score = 0;
  let details = "";

  quizData.forEach((item, index) => {
    const selected = document.querySelector(
      `input[name="question-${index}"]:checked`,
    );
    const selectedValue = selected ? Number(selected.value) : -1;

    if (selectedValue === item.answer) score++;

    details += `
      <div class="analysis-item">
        <strong>${index + 1}. ${lang === "vi" ? item.vi : item.en}</strong>
        <p>${lang === "vi" ? "Đáp án đúng: " : "Correct answer: "} ${(lang === "vi" ? item.optionsVi : item.optionsEn)[item.answer]}</p>
        <p>${lang === "vi" ? item.explainVi : item.explainEn}</p>
      </div>
    `;
  });

  let levelClass = "result-low";
  let levelText =
    lang === "vi" ? "Bạn cần ôn tập thêm." : "You need more review.";

  if (score >= 7) {
    levelClass = "result-good";
    levelText = lang === "vi" ? "Kết quả rất tốt!" : "Excellent result!";
  } else if (score >= 4) {
    levelClass = "result-mid";
    levelText = lang === "vi" ? "Kết quả khá ổn." : "A fairly good result.";
  }

  quizResult.innerHTML = `
    <h3>${lang === "vi" ? "Kết quả bài làm" : "Quiz result"}</h3>
    <p class="${levelClass}"><strong>${lang === "vi" ? "Điểm số: " : "Score: "} ${score}/${quizData.length}</strong></p>
    <p>${levelText}</p>
    <div class="analysis-list" style="margin-top:16px;">${details}</div>
  `;
  quizResult.classList.remove("hidden");
  quizResult.scrollIntoView({ behavior: "smooth", block: "start" });
}

if (submitQuizBtn) {
  submitQuizBtn.addEventListener("click", submitQuiz);
}

if (resetQuizBtn) {
  resetQuizBtn.addEventListener("click", () => {
    renderQuiz();
    startTimer();
  });
}

window.addEventListener("languageChanged", () => {
  renderQuiz();
  startTimer();
});

renderQuiz();
startTimer();
