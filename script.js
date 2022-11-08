const fetchDataBtn = document.querySelector("#fetchdata");
const input = document.querySelector("input");

const renderError = function (msg) {
  document.querySelector("#app").insertAdjacentHTML("afterbegin", msg);
};

const createUserHTML = function (user) {
  console.log(user);
  return `
    <div class=user>
      <p>${user.query.search[0].snippet}</p>

    </div>
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
    // console.log(data.query.search[0].snippet);
    const html = createUserHTML(data);
    document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
    // return renderWiki(data);
  } catch (err) {
    renderError(err);
  }
};

fetchDataBtn.addEventListener("click", fetchWiki);
