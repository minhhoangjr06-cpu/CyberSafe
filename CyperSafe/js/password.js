const passwordInput = document.getElementById("passwordInput");
const togglePassword = document.getElementById("togglePassword");
const strengthFill = document.getElementById("strengthFill");
const strengthLabel = document.getElementById("strengthLabel");
const strengthScore = document.getElementById("strengthScore");
const suggestionList = document.getElementById("suggestionList");

const lengthCheck = document.getElementById("lengthCheck");
const uppercaseCheck = document.getElementById("uppercaseCheck");
const lowercaseCheck = document.getElementById("lowercaseCheck");
const numberCheck = document.getElementById("numberCheck");
const specialCheck = document.getElementById("specialCheck");

function currentLang() {
  return localStorage.getItem("cybersafe_lang") || "vi";
}

function setCheck(element, status) {
  element.classList.toggle("ok", status);
}

function evaluatePassword(password) {
  let score = 0;
  const suggestions = [];
  const lang = currentLang();

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  setCheck(lengthCheck, hasLength);
  setCheck(uppercaseCheck, hasUpper);
  setCheck(lowercaseCheck, hasLower);
  setCheck(numberCheck, hasNumber);
  setCheck(specialCheck, hasSpecial);

  if (hasLength) score += 25;
  else
    suggestions.push(
      lang === "vi"
        ? "Tăng độ dài lên ít nhất 8 ký tự."
        : "Increase the length to at least 8 characters.",
    );

  if (password.length >= 12) score += 15;
  else if (password.length > 0)
    suggestions.push(
      lang === "vi"
        ? "Mật khẩu dài từ 12 ký tự sẽ an toàn hơn."
        : "A password with 12 or more characters is safer.",
    );

  if (hasUpper) score += 15;
  else
    suggestions.push(
      lang === "vi"
        ? "Thêm ít nhất một chữ in hoa."
        : "Add at least one uppercase letter.",
    );

  if (hasLower) score += 15;
  else
    suggestions.push(
      lang === "vi"
        ? "Thêm ít nhất một chữ thường."
        : "Add at least one lowercase letter.",
    );

  if (hasNumber) score += 15;
  else
    suggestions.push(
      lang === "vi" ? "Thêm ít nhất một chữ số." : "Add at least one number.",
    );

  if (hasSpecial) score += 15;
  else
    suggestions.push(
      lang === "vi"
        ? "Thêm ít nhất một ký tự đặc biệt."
        : "Add at least one special character.",
    );

  if (!password) {
    score = 0;
  }

  strengthFill.style.width = `${score}%`;
  strengthScore.textContent = `${score}/100`;

  if (score >= 80) {
    strengthLabel.textContent = lang === "vi" ? "Mạnh" : "Strong";
    strengthFill.style.background = "linear-gradient(135deg, #46dd92, #68f0ff)";
  } else if (score >= 50) {
    strengthLabel.textContent = lang === "vi" ? "Trung bình" : "Medium";
    strengthFill.style.background = "linear-gradient(135deg, #ffba52, #ffd36b)";
  } else if (score > 0) {
    strengthLabel.textContent = lang === "vi" ? "Yếu" : "Weak";
    strengthFill.style.background = "linear-gradient(135deg, #ff6b89, #ff9b7b)";
  } else {
    strengthLabel.textContent = lang === "vi" ? "Chưa đánh giá" : "Not rated";
    strengthFill.style.background = "linear-gradient(135deg, #ff6b89, #ffba52)";
  }

  suggestionList.innerHTML = "";
  if (!password) {
    const li = document.createElement("li");
    li.textContent =
      lang === "vi"
        ? "Nhập mật khẩu mẫu để xem đánh giá."
        : "Enter a sample password to see the assessment.";
    suggestionList.appendChild(li);
  } else if (suggestions.length === 0) {
    const li = document.createElement("li");
    li.textContent =
      lang === "vi"
        ? "Mật khẩu có độ mạnh khá tốt."
        : "The password strength is quite good.";
    suggestionList.appendChild(li);
  } else {
    suggestions.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      suggestionList.appendChild(li);
    });
  }
}

if (passwordInput) {
  passwordInput.addEventListener("input", () =>
    evaluatePassword(passwordInput.value),
  );
}

if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  });
}

window.addEventListener("languageChanged", () => {
  evaluatePassword(passwordInput.value);
});

evaluatePassword("");
