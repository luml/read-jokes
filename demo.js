// *** global content area  ***
let globalColor = "peru";
let cacheColor = "rgb(233, 225, 178)";

// #1 Part one: Jokes
let i = true;
while (i) {
  let article = document.createElement("article");
  let jokeP = document.createElement("p");
  article.appendChild(jokeP);
  article.style.color = globalColor;
  document.querySelector(".main").appendChild(article);
  // make sure height > screenHeight, not very true
  if (document.querySelector(".main").offsetHeight > window.outerHeight / 4) {
    const articleNum = document.querySelectorAll(".main article").length;
    if (articleNum > 1) {
      document.querySelectorAll(".main article")[articleNum - 1].remove();
    }
    i = false;
  }
}

for (let item of document.querySelectorAll("article")) {
  // make a joke
  item.innerText = "Be ready for a joke...";
  item.style.color = cacheColor;
  getData(item);
}

async function getData(article) {
  try {
    let chuckJokes = await fetch(
      `https://api.chucknorris.io/jokes/random`
    ).then(res => res.json());
    article.innerText = chuckJokes.value;
    const words = chuckJokes.value.length;
    if (words >= 600) {
      article.style.gridColumn = "span 3";
      article.style.backgroundColor = "rgb(178, 202, 163)";
    }
    if (words >= 300 && words < 600) {
      article.style.gridColumn = "span 2";
      article.style.backgroundColor = "rgb(78, 202, 163)";
    }
    article.style.color = globalColor;
  } catch (error) {
    console.warn(`We have an error here: ${error}`);
  } finally {
    console.log("Finally will fire no matter what!");
  }
}

// #2 Part two: songs; not open it in a new tab window
// document.querySelector(".writeSong button").onclick = function() {
//   window.open("./song.html");
// };
