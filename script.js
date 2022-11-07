const fetchDataBtn = document.querySelector("#fetchdata");
const input = document.querySelector("input");

const renderError = function (msg) {
  document.querySelector("#app").insertAdjacentHTML("afterbegin", msg);
};

// const createUserHTML = function (user) {
//   return `
//     <div class=user>
//       <p><img src="${user.avatar_url}" alt="${user.name}"/></p>
//       <p>Login: ${user.login}</p>
//       <p>GitHub Profile: <a href="${user.html_url}" target="_blank">${user.login}</a></p>
//     </div>
//   `;
// };

// const renderWiki = function (data) {
//   const html = data.map((article) => createUserHTML(article)).join("");
//   document.querySelector("#app").insertAdjacentHTML("beforeend", html);
// };

const fetchWiki = async function () {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${input.value}`
    );
    if (!res.ok) throw new Error(`This is not a valid search term.`);
    const data = await res.json();
    console.log(data.query.search[0]);
    //   const html = createUserHTML(data);
    //   document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
  } catch (err) {
    renderError(err);
  }
};

fetchDataBtn.addEventListener("click", fetchWiki);
