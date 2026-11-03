const caseList = document.getElementById("caseList");
const caseTitle = document.getElementById("caseTitle");
const caseMessage = document.getElementById("caseMessage");
const clueOptions = document.getElementById("clueOptions");
const checkCaseBtn = document.getElementById("checkCaseBtn");
const nextCaseBtn = document.getElementById("nextCaseBtn");
const caseFeedback = document.getElementById("caseFeedback");

const scamCases = [
  {
    titleVi: "SMS 01",
    titleEn: "SMS 01",
    messageVi:
      "Ngân hàng thông báo: Tài khoản của bạn sẽ bị khóa trong 30 phút. Vui lòng truy cập http://secure-bank-verify-now.com để xác minh và nhập mã OTP.",
    messageEn:
      "Bank alert: Your account will be locked in 30 minutes. Please visit http://secure-bank-verify-now.com to verify and enter your OTP code.",
    cluesVi: [
      "Tạo cảm giác khẩn cấp",
      "URL đáng ngờ",
      "Yêu cầu cung cấp OTP",
      "Ngôn ngữ cảnh báo mạnh",
    ],
    cluesEn: [
      "Creates urgency",
      "Suspicious URL",
      "Requests OTP",
      "Strong alarmist language",
    ],
    answers: [0, 1, 2, 3],
  },
  {
    titleVi: "Email 02",
    titleEn: "Email 02",
    messageVi:
      "Xin chúc mừng! Bạn đã trúng thưởng điện thoại cao cấp. Nhấn vào link để nhận quà hôm nay. Phần thưởng sẽ bị hủy nếu bạn không phản hồi ngay.",
    messageEn:
      "Congratulations! You have won a premium phone. Click the link to claim your gift today. The prize will be canceled if you do not respond immediately.",
    cluesVi: [
      "Nội dung hấp dẫn quá mức",
      "Tạo áp lực thời gian",
      "Thiếu thông tin xác minh chính thức",
      "Kêu gọi bấm link ngay",
    ],
    cluesEn: [
      "Overly tempting content",
      "Creates time pressure",
      "No official verification details",
      "Pushes immediate clicking",
    ],
    answers: [0, 1, 2, 3],
  },
  {
    titleVi: "Chat 03",
    titleEn: "Chat 03",
    messageVi:
      "Bạn ơi, mình đang cần tiền gấp, chuyển giúp mình 2 triệu vào tài khoản mới này nhé. Mình đổi số rồi nên không gọi được.",
    messageEn:
      "Hey, I urgently need money. Please transfer 2 million to this new account. I changed my number, so I cannot call.",
    cluesVi: [
      "Mượn danh người quen",
      "Yêu cầu chuyển tiền gấp",
      "Không xác minh danh tính",
      "Tránh liên lạc trực tiếp",
    ],
    cluesEn: [
      "Impersonates someone you know",
      "Asks for urgent money transfer",
      "No identity verification",
      "Avoids direct contact",
    ],
    answers: [0, 1, 2, 3],
  },
];

let currentIndex = 0;
let selectedClues = [];

function langActive() {
  return localStorage.getItem("cybersafe_lang") || "vi";
}

function renderCaseList() {
  const lang = langActive();
  caseList.innerHTML = scamCases
    .map(
      (item, index) => `
    <div class="case-item ${index === currentIndex ? "active" : ""}" data-index="${index}">
      <strong>${lang === "vi" ? item.titleVi : item.titleEn}</strong>
      <p>${lang === "vi" ? "Tình huống mô phỏng" : "Simulation case"}</p>
    </div>
  `,
    )
    .join("");

  document.querySelectorAll(".case-item").forEach((item) => {
    item.addEventListener("click", () => {
      currentIndex = Number(item.dataset.index);
      selectedClues = [];
      renderCurrentCase();
    });
  });
}

function renderCurrentCase() {
  const lang = langActive();
  const item = scamCases[currentIndex];

  renderCaseList();

  caseTitle.textContent = lang === "vi" ? item.titleVi : item.titleEn;
  caseMessage.textContent = lang === "vi" ? item.messageVi : item.messageEn;

  const clues = lang === "vi" ? item.cluesVi : item.cluesEn;
  clueOptions.innerHTML = clues
    .map(
      (clue, index) => `
    <div class="clue-option ${selectedClues.includes(index) ? "selected" : ""}" data-index="${index}">
      ${clue}
    </div>
  `,
    )
    .join("");

  document.querySelectorAll(".clue-option").forEach((option) => {
    option.addEventListener("click", () => {
      const index = Number(option.dataset.index);
      if (selectedClues.includes(index)) {
        selectedClues = selectedClues.filter((item) => item !== index);
      } else {
        selectedClues.push(index);
      }
      renderCurrentCase();
    });
  });

  caseFeedback.innerHTML =
    lang === "vi"
      ? "Hãy chọn các dấu hiệu bạn cho là đáng ngờ rồi bấm kiểm tra đáp án."
      : "Select the signs you think are suspicious, then click check answer.";
}

function checkCase() {
  const lang = langActive();
  const item = scamCases[currentIndex];
  const correct = item.answers;
  const isCorrect =
    correct.length === selectedClues.length &&
    correct.every((value) => selectedClues.includes(value));

  if (isCorrect) {
    caseFeedback.innerHTML = `<strong>${lang === "vi" ? "Chính xác!" : "Correct!"}</strong><p>${lang === "vi" ? "Bạn đã nhận diện đúng các dấu hiệu nghi vấn trong tình huống này." : "You correctly identified the suspicious signs in this scenario."}</p>`;
  } else {
    caseFeedback.innerHTML = `<strong>${lang === "vi" ? "Chưa chính xác hoàn toàn." : "Not fully correct."}</strong><p>${lang === "vi" ? "Các dấu hiệu đáng chú ý trong tình huống này gồm yếu tố khẩn cấp, thông tin thiếu xác minh và hành động thúc ép người dùng." : "Important signs in this case include urgency, lack of verification, and pressure to act quickly."}</p>`;
  }
}

function nextCase() {
  currentIndex = (currentIndex + 1) % scamCases.length;
  selectedClues = [];
  renderCurrentCase();
}

if (checkCaseBtn) {
  checkCaseBtn.addEventListener("click", checkCase);
}

if (nextCaseBtn) {
  nextCaseBtn.addEventListener("click", nextCase);
}

window.addEventListener("languageChanged", renderCurrentCase);

renderCurrentCase();
