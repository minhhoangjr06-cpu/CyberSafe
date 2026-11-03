const urlForm = document.getElementById("urlForm");
const urlInput = document.getElementById("urlInput");
const urlInputShell = document.getElementById("urlInputShell");
const urlInputHint = document.getElementById("urlInputHint");
const analyzeUrlBtn = document.getElementById("analyzeUrlBtn");
const clearUrlBtn = document.getElementById("clearUrlBtn");

const riskBadge = document.getElementById("riskBadge");
const riskTitle = document.getElementById("riskTitle");
const riskDesc = document.getElementById("riskDesc");
const riskScore = document.getElementById("riskScore");
const scoreCircle = document.getElementById("scoreCircle");
const findingCount = document.getElementById("findingCount");
const analysisList = document.getElementById("analysisList");
const scanStatus = document.getElementById("scanStatus");

const langSwitch = document.getElementById("langSwitch");
const langLabel = document.getElementById("langLabel");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");

let currentLang = "vi";
let lastResult = null;

const text = {
  vi: {
    defaultHint: "Hỗ trợ đường dẫn bắt đầu bằng http:// hoặc https://.",
    empty: "Vui lòng nhập đường dẫn URL cần kiểm tra.",
    invalid: "Đường dẫn không hợp lệ. Hãy kiểm tra lại URL.",
    protocol: "Công cụ chỉ hỗ trợ đường dẫn HTTP và HTTPS.",
    spaces: "URL không được chứa khoảng trắng.",
    notAnalyzed: "Chưa phân tích",
    readyTitle: "Sẵn sàng kiểm tra URL",
    readyDesc:
      "Nhập một đường dẫn ở khung bên trái và nhấn nút phân tích để xem kết quả.",
    lowBadge: "RỦI RO THẤP",
    mediumBadge: "RỦI RO TRUNG BÌNH",
    highBadge: "RỦI RO CAO",
    lowTitle: "Chưa phát hiện nhiều dấu hiệu bất thường",
    mediumTitle: "Đường dẫn có dấu hiệu cần chú ý",
    highTitle: "Phát hiện nhiều dấu hiệu đáng ngờ",
    lowDesc:
      "Các kiểm tra cơ bản chưa phát hiện nhiều dấu hiệu rủi ro. Điều này không đảm bảo website hoàn toàn an toàn.",
    mediumDesc:
      "Đường dẫn có một số đặc điểm cần kiểm tra thêm. Bạn nên xác minh nguồn gửi trước khi truy cập.",
    highDesc:
      "Đường dẫn có nhiều đặc điểm đáng ngờ. Bạn nên tránh truy cập và không cung cấp thông tin cá nhân.",
    emptyResult: "Chưa có dữ liệu phân tích. Kết quả sẽ xuất hiện tại đây.",
    status: "ANALYZED",
    safeHttps: "Sử dụng HTTPS",
    safeHttpsDesc:
      "Đường dẫn sử dụng HTTPS. Kết nối được mã hóa, nhưng điều này không chứng minh website đáng tin cậy.",
    http: "Không sử dụng HTTPS",
    httpDesc:
      "Đường dẫn sử dụng HTTP, kết nối không được mã hóa. Không nên nhập thông tin nhạy cảm trên trang này.",
    shortener: "Sử dụng dịch vụ rút gọn URL",
    shortenerDesc:
      "Địa chỉ đích bị ẩn sau liên kết rút gọn. Hãy xác minh đích đến trước khi mở.",
    ip: "Sử dụng địa chỉ IP trực tiếp",
    ipDesc:
      "Website sử dụng địa chỉ IP thay cho tên miền thông thường. Đây là đặc điểm cần kiểm tra thêm.",
    credentials: "URL chứa thông tin đăng nhập",
    credentialsDesc:
      "Đường dẫn có phần tên người dùng hoặc mật khẩu được nhúng trong URL. Đây là dấu hiệu bất thường.",
    punycode: "Tên miền có mã Punycode",
    punycodeDesc:
      "Tên miền chứa ký tự mã hóa quốc tế. Một số tên miền giả mạo sử dụng cách này để tạo địa chỉ giống thương hiệu thật.",
    keywords: "Xuất hiện từ khóa nhạy cảm",
    keywordsDesc:
      "Đường dẫn chứa từ khóa như đăng nhập, xác minh, tài khoản hoặc mật khẩu. Hãy kiểm tra kỹ nguồn gửi.",
    subdomains: "Có nhiều cấp tên miền phụ",
    subdomainsDesc:
      "Tên miền có nhiều cấp phụ. Kẻ xấu đôi khi lợi dụng cấu trúc này để tạo địa chỉ gây nhầm lẫn.",
    hyphens: "Tên miền có nhiều dấu gạch ngang",
    hyphensDesc:
      "Tên miền chứa nhiều dấu gạch ngang. Đây có thể là cách tạo địa chỉ gần giống website chính thức.",
    suspiciousTld: "Phần mở rộng tên miền cần chú ý",
    suspiciousTldDesc:
      "Tên miền sử dụng phần mở rộng từng xuất hiện trong các chiến dịch lừa đảo. Đây không phải bằng chứng website độc hại.",
    longUrl: "Đường dẫn có độ dài lớn",
    longUrlDesc:
      "URL dài bất thường có thể khiến người dùng khó nhận biết tên miền và địa chỉ đích.",
    unusualPort: "Sử dụng cổng kết nối khác thường",
    unusualPortDesc:
      "Đường dẫn sử dụng cổng không phổ biến cho HTTP hoặc HTTPS. Hãy xác minh địa chỉ website.",
    encoded: "Đường dẫn chứa nhiều ký tự mã hóa",
    encodedDesc:
      "URL có nhiều ký tự được mã hóa. Điều này có thể làm nội dung đường dẫn khó đọc hơn.",
    longDomain: "Tên miền có độ dài bất thường",
    longDomainDesc:
      "Tên miền dài hơn thông thường. Hãy kiểm tra kỹ từng ký tự trong địa chỉ.",
    localhost: "Đường dẫn sử dụng máy chủ nội bộ",
    localhostDesc:
      "Địa chỉ trỏ đến localhost, thường chỉ dùng trong môi trường thử nghiệm trên máy tính cá nhân.",
    noWarning: "Chưa phát hiện dấu hiệu đáng ngờ rõ ràng",
    noWarningDesc:
      "Các kiểm tra cơ bản không phát hiện dấu hiệu bất thường nổi bật. Hãy tiếp tục xác minh website trước khi cung cấp thông tin.",
    menuOpen: "Mở menu",
    menuClose: "Đóng menu",
    language: "Chuyển sang tiếng Anh",
  },

  en: {
    defaultHint: "Supports links starting with http:// or https://.",
    empty: "Please enter a URL to check.",
    invalid: "Invalid URL. Please check the address.",
    protocol: "Only HTTP and HTTPS links are supported.",
    spaces: "A URL cannot contain spaces.",
    notAnalyzed: "Not analyzed",
    readyTitle: "Ready to check URL",
    readyDesc:
      "Enter a URL in the panel on the left and select Analyze to see the result.",
    lowBadge: "LOW RISK",
    mediumBadge: "MEDIUM RISK",
    highBadge: "HIGH RISK",
    lowTitle: "No major warning signs detected",
    mediumTitle: "This URL needs further attention",
    highTitle: "Multiple suspicious indicators detected",
    lowDesc:
      "Basic checks did not detect many risk indicators. This does not guarantee that the website is completely safe.",
    mediumDesc:
      "This URL has characteristics that need further review. Verify the sender before visiting.",
    highDesc:
      "This URL has multiple suspicious characteristics. Avoid visiting it or sharing personal information.",
    emptyResult: "No analysis data yet. Results will appear here.",
    status: "ANALYZED",
    safeHttps: "HTTPS is enabled",
    safeHttpsDesc:
      "The URL uses HTTPS. The connection is encrypted, but this does not prove that the website is trustworthy.",
    http: "HTTPS is not enabled",
    httpDesc:
      "The URL uses HTTP, which does not encrypt the connection. Avoid entering sensitive information.",
    shortener: "Shortened URL detected",
    shortenerDesc:
      "The destination is hidden behind a shortened link. Verify the destination before opening it.",
    ip: "Direct IP address detected",
    ipDesc:
      "The website uses an IP address instead of a regular domain name. This characteristic needs further review.",
    credentials: "Login information embedded in URL",
    credentialsDesc:
      "The URL contains a username or password component. This is an unusual characteristic.",
    punycode: "Punycode domain detected",
    punycodeDesc:
      "The domain contains encoded international characters. Some fake domains use this to imitate real brands.",
    keywords: "Sensitive keywords detected",
    keywordsDesc:
      "The URL contains words such as login, verify, account or password. Check the source carefully.",
    subdomains: "Multiple subdomain levels",
    subdomainsDesc:
      "The domain has several subdomain levels. This structure can sometimes be used to create misleading addresses.",
    hyphens: "Multiple hyphens in domain",
    hyphensDesc:
      "The domain contains several hyphens. This may be used to create an address resembling an official website.",
    suspiciousTld: "Domain extension needs attention",
    suspiciousTldDesc:
      "This domain extension has appeared in phishing campaigns. This alone does not prove the website is malicious.",
    longUrl: "Unusually long URL",
    longUrlDesc:
      "An unusually long URL can make it harder to recognize the domain and destination.",
    unusualPort: "Unusual connection port",
    unusualPortDesc:
      "The URL uses a port that is uncommon for HTTP or HTTPS. Verify the website address.",
    encoded: "Multiple encoded characters",
    encodedDesc:
      "The URL contains multiple encoded characters, making its contents harder to read.",
    longDomain: "Unusually long domain name",
    longDomainDesc:
      "The domain is longer than usual. Check every character in the address carefully.",
    localhost: "Localhost address detected",
    localhostDesc:
      "This address points to localhost, which is usually used for local testing on a personal computer.",
    noWarning: "No obvious suspicious indicators detected",
    noWarningDesc:
      "Basic checks did not detect prominent warning signs. Continue verifying the website before sharing information.",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    language: "Switch to Vietnamese",
  },
};

function getText(key) {
  return text[currentLang][key];
}

function applyLanguage() {
  document.documentElement.lang = currentLang;

  document.querySelectorAll("[data-vi][data-en]").forEach((element) => {
    element.textContent = element.dataset[currentLang];
  });

  document
    .querySelectorAll("[data-placeholder-vi][data-placeholder-en]")
    .forEach((element) => {
      element.placeholder =
        element.dataset[`placeholder${currentLang === "vi" ? "Vi" : "En"}`];
    });

  langLabel.textContent = currentLang === "vi" ? "VIE" : "ENG";
  langSwitch.setAttribute("aria-label", getText("language"));

  if (lastResult) {
    renderResult(lastResult);
  }

  if (urlInputHint.classList.contains("error")) {
    urlInputHint.textContent = getText("invalid");
  } else {
    urlInputHint.textContent = getText("defaultHint");
  }
}

function setInputError(message) {
  urlInputShell.classList.add("has-error");
  urlInputHint.classList.add("error");
  urlInputHint.textContent = message;
  urlInput.focus();
}

function clearInputError() {
  urlInputShell.classList.remove("has-error");
  urlInputHint.classList.remove("error");
  urlInputHint.textContent = getText("defaultHint");
}

function isIPv4(hostname) {
  const parts = hostname.split(".");

  if (parts.length !== 4) {
    return false;
  }

  return parts.every((part) => {
    if (!/^\d{1,3}$/.test(part)) {
      return false;
    }

    const number = Number(part);
    return number >= 0 && number <= 255;
  });
}

function isIPAddress(hostname) {
  return isIPv4(hostname) || hostname.startsWith("[");
}

function isShortener(hostname) {
  const shortenerDomains = [
    "bit.ly",
    "t.co",
    "tinyurl.com",
    "is.gd",
    "cutt.ly",
    "shorturl.at",
    "rebrand.ly",
    "rb.gy",
    "tiny.cc",
    "ow.ly",
    "buff.ly",
  ];

  return shortenerDomains.some((domain) => {
    return hostname === domain || hostname.endsWith("." + domain);
  });
}

function analyzeURL(rawValue) {
  const raw = rawValue.trim();

  if (!raw) {
    throw new Error("empty");
  }

  if (/\s/.test(raw)) {
    throw new Error("spaces");
  }

  let normalized = raw;

  if (
    !/^https?:\/\//i.test(normalized) &&
    !/^[a-z][a-z0-9+.-]*:\/\//i.test(normalized)
  ) {
    normalized = "https://" + normalized;
  }

  let parsed;

  try {
    parsed = new URL(normalized);
  } catch {
    throw new Error("invalid");
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("protocol");
  }

  if (!parsed.hostname) {
    throw new Error("invalid");
  }

  const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");
  const fullURL = parsed.href.toLowerCase();
  const labels = hostname.split(".").filter(Boolean);
  const domainWithoutWWW = hostname.replace(/^www\./, "");
  const findings = [];

  function addFinding(severity, points, titleKey, descKey) {
    findings.push({
      severity,
      points,
      titleKey,
      descKey,
    });
  }

  if (parsed.protocol === "https:") {
    addFinding("info", 0, "safeHttps", "safeHttpsDesc");
  } else {
    addFinding("medium", 18, "http", "httpDesc");
  }

  if (isShortener(hostname)) {
    addFinding("medium", 22, "shortener", "shortenerDesc");
  }

  if (isIPAddress(hostname)) {
    addFinding("high", 30, "ip", "ipDesc");
  }

  if (parsed.username || parsed.password) {
    addFinding("high", 35, "credentials", "credentialsDesc");
  }

  if (labels.some((label) => label.startsWith("xn--"))) {
    addFinding("high", 22, "punycode", "punycodeDesc");
  }

  const suspiciousWords = [
    "login",
    "verify",
    "verification",
    "update",
    "secure",
    "account",
    "password",
    "banking",
    "wallet",
    "bonus",
    "gift",
    "confirm",
    "recovery",
    "support",
  ];

  if (suspiciousWords.some((word) => fullURL.includes(word))) {
    addFinding("medium", 12, "keywords", "keywordsDesc");
  }

  const subdomainLabels = domainWithoutWWW.split(".");

  if (subdomainLabels.length >= 4) {
    addFinding("medium", 10, "subdomains", "subdomainsDesc");
  }

  const hyphenCount = (hostname.match(/-/g) || []).length;

  if (hyphenCount >= 3) {
    addFinding("medium", 10, "hyphens", "hyphensDesc");
  }

  const suspiciousExtensions = [
    "zip",
    "top",
    "click",
    "xyz",
    "work",
    "country",
    "gq",
    "tk",
    "ml",
    "cf",
    "ga",
  ];

  const extension = labels[labels.length - 1];

  if (suspiciousExtensions.includes(extension)) {
    addFinding("medium", 12, "suspiciousTld", "suspiciousTldDesc");
  }

  if (parsed.href.length > 150) {
    addFinding("medium", 8, "longUrl", "longUrlDesc");
  }

  if (hostname.length > 35) {
    addFinding("medium", 8, "longDomain", "longDomainDesc");
  }

  if (parsed.port && parsed.port !== "80" && parsed.port !== "443") {
    addFinding("medium", 10, "unusualPort", "unusualPortDesc");
  }

  const encodedCharacters = (parsed.href.match(/%[0-9a-f]{2}/gi) || []).length;

  if (encodedCharacters >= 4) {
    addFinding("medium", 6, "encoded", "encodedDesc");
  }

  if (hostname === "localhost") {
    addFinding("info", 0, "localhost", "localhostDesc");
  }

  if (findings.length === 1 && findings[0].titleKey === "safeHttps") {
    addFinding("info", 0, "noWarning", "noWarningDesc");
  }

  const totalPoints = findings.reduce((total, finding) => {
    return total + finding.points;
  }, 0);

  const score = Math.min(totalPoints, 100);

  let level = "low";

  if (score >= 45) {
    level = "high";
  } else if (score >= 20) {
    level = "medium";
  }

  return {
    score,
    level,
    findings,
  };
}

function renderResult(result) {
  const level = result.level;

  riskBadge.className = "risk-badge " + level;
  riskBadge.textContent = getText(level + "Badge");

  riskTitle.textContent = getText(level + "Title");
  riskDesc.textContent = getText(level + "Desc");

  riskScore.textContent = result.score;
  scoreCircle.style.setProperty("--score", result.score);

  if (level === "high") {
    scoreCircle.style.setProperty("--score-color", "var(--red)");
  } else if (level === "medium") {
    scoreCircle.style.setProperty("--score-color", "var(--orange)");
  } else {
    scoreCircle.style.setProperty("--score-color", "var(--green)");
  }

  findingCount.textContent = result.findings.length;
  scanStatus.textContent = getText("status");

  analysisList.replaceChildren();

  result.findings.forEach((finding) => {
    const item = document.createElement("div");
    item.className = "finding-item " + finding.severity;

    const mark = document.createElement("span");
    mark.className = "finding-mark";
    mark.textContent = finding.severity === "info" ? "i" : "!";

    const copy = document.createElement("div");
    copy.className = "finding-copy";

    const title = document.createElement("strong");
    title.textContent = getText(finding.titleKey);

    const description = document.createElement("p");
    description.textContent = getText(finding.descKey);

    copy.append(title, description);
    item.append(mark, copy);
    analysisList.appendChild(item);
  });
}

function resetResult() {
  lastResult = null;

  riskBadge.className = "risk-badge";
  riskBadge.textContent = getText("notAnalyzed");

  riskTitle.textContent = getText("readyTitle");
  riskDesc.textContent = getText("readyDesc");

  riskScore.textContent = "0";
  scoreCircle.style.setProperty("--score", 0);
  scoreCircle.style.setProperty("--score-color", "var(--green)");

  findingCount.textContent = "0";
  scanStatus.textContent = "READY";

  analysisList.replaceChildren();

  const empty = document.createElement("div");
  empty.className = "empty-result";

  const icon = document.createElement("span");
  icon.className = "empty-icon";
  icon.textContent = "⌕";

  const message = document.createElement("p");
  message.textContent = getText("emptyResult");

  empty.append(icon, message);
  analysisList.appendChild(empty);
}

urlForm.addEventListener("submit", (event) => {
  event.preventDefault();

  clearInputError();

  try {
    const result = analyzeURL(urlInput.value);

    lastResult = result;
    renderResult(result);
  } catch (error) {
    if (error.message === "empty") {
      setInputError(getText("empty"));
    } else if (error.message === "spaces") {
      setInputError(getText("spaces"));
    } else if (error.message === "protocol") {
      setInputError(getText("protocol"));
    } else {
      setInputError(getText("invalid"));
    }
  }
});

clearUrlBtn.addEventListener("click", () => {
  urlInput.value = "";
  clearInputError();
  resetResult();
  urlInput.focus();
});

document.querySelectorAll(".sample-btn").forEach((button) => {
  button.addEventListener("click", () => {
    urlInput.value = button.dataset.sample;
    clearInputError();
    urlInput.focus();
  });
});

urlInput.addEventListener("input", () => {
  clearInputError();
});

langSwitch.addEventListener("click", () => {
  currentLang = currentLang === "vi" ? "en" : "vi";
  applyLanguage();
});

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");

  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.setAttribute(
    "aria-label",
    isOpen ? getText("menuClose") : getText("menuOpen"),
  );
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

resetResult();
applyLanguage();
