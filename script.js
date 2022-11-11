const searchWikipedia = document.querySelector("#fetchdata");
const clearSearchBtn = document.querySelector(".clear-search-btn");
const input = document.querySelector(".input-search");

function removeArticles() {
  const articles = document.querySelectorAll(".articles");
  articles.forEach((article) => {
    article.remove();
  });
}

function clearInput() {
  input.value = "";
}

const clearSearch = function () {
  removeArticles();
  clearInput();
};

const renderError = function (msg) {
  document.querySelector("#app").insertAdjacentHTML("afterbegin", msg);
};

//rename createArticleLink
const createArticleHTML = function (article) {
  console.log(article);
  return `
      <a href="https://en.wikipedia.org/?curid=${article.pageid}" target="_blank" class="articles">
          <p>${article.snippet}</p>
      </a>
  `;
};

const fetchWiki = async function () {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${input.value}`
    );
    if (!res.ok) throw new Error(`This is not a valid search term.`);
    const data = await res.json();
    console.log(data);
    const html = data.query.search
      .map((article) => createArticleHTML(article))
      .join("");
    document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
    // return renderWiki(data);
  } catch (err) {
    renderError(err);
  }
};

searchWikipedia.addEventListener("click", fetchWiki);
clearSearchBtn.addEventListener("click", clearSearch);
