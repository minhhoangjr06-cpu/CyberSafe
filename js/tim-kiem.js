const searchInput = document.getElementById("searchInput");
const libraryGrid = document.getElementById("libraryGrid");
const emptyResult = document.getElementById("emptyResult");
const resultCount = document.getElementById("resultCount");
const clearSearch = document.getElementById("clearSearch");
const filterButtons = document.querySelectorAll(".filter-chip");

let activeFilter = "all";

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .trim();
}

function getCardSearchText(card) {
  const translatedText = Array.from(
    card.querySelectorAll("[data-vi][data-en]"),
  ).flatMap((element) => [element.dataset.vi, element.dataset.en]);

  return normalizeText(
    [card.textContent, card.dataset.keywords || "", ...translatedText].join(
      " ",
    ),
  );
}

function updateResultCount(count) {
  if (!resultCount) return;

  const language = document.documentElement.lang;
  const word = language === "en" ? "topics found" : "chủ đề được hiển thị";
  resultCount.textContent = `${count} ${word}`;
}

function runSearch() {
  if (!searchInput || !libraryGrid) return;

  const keyword = normalizeText(searchInput.value);
  const cards = libraryGrid.querySelectorAll(".knowledge-card");
  let visibleCount = 0;

  cards.forEach((card) => {
    const matchesKeyword = getCardSearchText(card).includes(keyword);
    const matchesFilter =
      activeFilter === "all" || card.dataset.category === activeFilter;
    const isVisible = matchesKeyword && matchesFilter;

    card.hidden = !isVisible;

    if (isVisible) visibleCount++;
  });

  if (emptyResult) {
    emptyResult.classList.toggle("visible", visibleCount === 0);
  }

  updateResultCount(visibleCount);
}

if (searchInput) {
  searchInput.addEventListener("input", runSearch);
}

if (clearSearch && searchInput) {
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    runSearch();
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter || "all";

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    runSearch();
  });
});

window.addEventListener("languageChanged", () => {
  setTimeout(runSearch, 50);
});

runSearch();
