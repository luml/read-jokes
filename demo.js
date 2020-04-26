// *** global content area  ***
const globals = {
  globalColor: "peru",
  cacheColor: "rgb(86,75,9)",
  wordsColor: "red",
  moreWordsColor: "blue"
};

const span3 = {
  span: "span 3",
  backColor: "rgb(178, 202, 163)",
  shape: "polygon(100% 0,100% 100%,0 100%)",
  clip: "polygon(100% 0,100% 100%,0 100%)"
};

const span2 = {
  span: "span 2",
  backColor: "rgb(78, 202, 163)",
  shape: "polygon(0 0,100% 100%,0 100%)",
  clip: "polygon(0 0,100% 100%,0 100%)"
};

// #1 Part one: Jokes
let i = true;
while (i) {
  let article = document.createElement("article");
  let jokeP = document.createElement("p");
  article.appendChild(jokeP);
  article.style.color = globals.globalColor;
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
  item.textContent = "Be ready for a joke...";
  // item.innerText = "Be ready for a joke...";
  item.style.color = globals.cacheColor;
  getData(item);
}

async function getData(article) {
  // Imply performance API
  const start = new Date().getTime();
  performance.mark("start");

  try {
    let chuckJokes = await fetch(
      `https://api.chucknorris.io/jokes/random`
    ).then(res => res.json());
    const pDiv = document.createElement("div");
    pDiv.textContent = chuckJokes.value;
    // pDiv.innerText = chuckJokes.value
    pDiv.style.height = "70%";
    // There're important differences between textContent and innerText
    article.textContent = null;
    // article.innerText = ''
    article.appendChild(pDiv);
    const words = chuckJokes.value.length;
    if (words >= 300) {
      // TODO make an object for each constants
      article.style.gridColumn = span3.span;
      article.style.backgroundColor = span3.backColor;
      // shape-outside and clip-path make a sharp shape starts right
      const newDiv = document.createElement("div");
      newDiv.style.shapeOutside = span3.shape;
      newDiv.style.clipPath = span3.clip;
      article.appendChild(newDivLayout(newDiv));
      article.firstElementChild.style.color = globals.moreWordsColor;
    }
    if (words >= 180 && words < 300) {
      article.style.gridColumn = span2.span;
      article.style.backgroundColor = span2.backColor;
      // shape-outside and clip-path make a sharp shape starts left
      const newDiv = document.createElement("div");
      newDiv.style.shapeOutside = span2.shape;
      newDiv.style.clipPath = span2.clip;
      article.appendChild(newDivLayout(newDiv));
      article.childNodes[0].style.color = globals.wordsColor;
    }
    article.style.color = globals.globalColor;

    // Imply performance API
    const end = new Date().getTime();
    const time = end - start;
    // add a timer to each joke, millisecond
    article.appendChild(document.createTextNode(`${time / 1000} sec(s)`));

    performance.mark("end");
    performance.measure("Fetching all jokes", "start", "end");
    const measurements = performance.getEntriesByType("measure");
    console.log(measurements);
    // Clear out all marks
    performance.clearMarks();
  } catch (error) {
    console.warn(`We have an error here: ${error}`);
  } finally {
    console.log("Final will fire no matter what!");
  }
}

function newDivLayout(newDiv) {
  newDiv.style.height = "30%";
  newDiv.style.backgroundColor = globals.wordsColor;
  newDiv.style.borderRadius = "0 0 1em 1em";
  newDiv.style.margin = 0;
  return newDiv;
}
// #2 Part two: songs; not open it in a new tab window
// document.querySelector(".writeSong button").onclick = function() {
//   window.open("./song.html");
// };
