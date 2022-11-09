const fetchDataBtn = document.querySelector("#fetchdata");
const input = document.querySelector("input");
const clearSearchBtn = document.querySelector(".clear-search-btn");
const articleText = document.querySelector(".user");

function removeDivs() {
  const divs = document.querySelectorAll(".user");
  divs.forEach((div) => {
    div.remove();
  });
}

const clearSearch = function () {
  removeDivs();
};

const renderError = function (msg) {
  document.querySelector("#app").insertAdjacentHTML("afterbegin", msg);
};

const createUserHTML = function (article) {
  console.log(article);
  return `
      <a href="https://en.wikipedia.org/?curid=${article.pageid}" target="_blank">
        <div class=user>
          <p>${article.snippet}</p>
        </div>
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
      .map((article) => createUserHTML(article))
      .join("");
    document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
    // return renderWiki(data);
  } catch (err) {
    renderError(err);
  }
};

fetchDataBtn.addEventListener("click", fetchWiki);
clearSearchBtn.addEventListener("click", clearSearch);
