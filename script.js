const searchWikipedia = document.querySelector("#fetchdata");
const clearSearchBtn = document.querySelector(".clear-search-btn");
const input = document.querySelector(".input-search");

function removeArticles() {
  const articles = document.querySelectorAll(".articles");
  articles.forEach((article) => {
    article.remove();
  });
}

function clearErrorMessage() {
  const app = document.querySelector("#app");
  app.textContent = "";
}

function clearInput() {
  if (input.value != "") {
    input.value = "";
  }
}

function clearSearch() {
  removeArticles();
  clearInput();
  clearErrorMessage();
}

function renderError(msg) {
  document.querySelector("#app").insertAdjacentHTML("afterbegin", msg);
}

function createArticleHTML(article) {
  removeArticles();
  return `
      <a href="https://en.wikipedia.org/?curid=${article.pageid}" target="_blank" class="articles">
          <p>${article.snippet}</p>
      </a>
  `;
}

async function fetchWiki() {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${input.value}`
    );
    if (!response.ok) throw new Error(`This is not a valid search term.`);
    const data = await response.json();
    const html = data.query.search
      .map((article) => createArticleHTML(article))
      .join("");
    document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
  } catch (err) {
    renderError(err);
  }
}

searchWikipedia.addEventListener("click", fetchWiki);
clearSearchBtn.addEventListener("click", clearSearch);
