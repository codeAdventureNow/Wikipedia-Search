const fetchDataBtn = document.querySelector("#fetchdata");
const input = document.querySelector("input");

const renderError = function (msg) {
  document.querySelector("#app").insertAdjacentHTML("afterbegin", msg);
};

const createUserHTML = function (article) {
  console.log(article);
  return `
    
      <a href="https://hotelsiteboston.netlify.app/" target="_blank">
        <div class=user>
          <p>${article.snippet}</p>
        </div>
      </a>
   
  `;
};

// const renderWiki = function (data) {
//   console.log(data);
//   return `
//   <div class=user>
//   <p>Login: ${data}</p>
//     </div>`;
//     const html = data.map((article) => createUserHTML(article)).join("");
//     document.querySelector("#app").insertAdjacentHTML("beforeend", html);
// };

const fetchWiki = async function () {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${input.value}`
    );
    if (!res.ok) throw new Error(`This is not a valid search term.`);
    const data = await res.json();

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
