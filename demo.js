// *** global content area  ***
let globalColor = "peru";
let cacheColor = "rgb(86, 75, 9)";

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
  // Imply performance API
  const start = new Date().getTime();
  performance.mark("start");

  try {
    let chuckJokes = await fetch(
      `https://api.chucknorris.io/jokes/random`
    ).then(res => res.json());
    const pDiv = document.createElement('div')
    pDiv.innerText = chuckJokes.value
    pDiv.style.height = '70%'
    article.innerText = ''
    article.appendChild(pDiv)
    const words = chuckJokes.value.length;
    if (words >= 300) {
      article.style.gridColumn = "span 3";
      article.style.backgroundColor = "rgb(178, 202, 163)";
      // shape-outside and clip-path make a sharp shape starts right
      const newDiv = document.createElement('div');
      newDiv.style.shapeOutside = 'polygon(100% 0,100% 100%,0 100%)'
      newDiv.style.clipPath = 'polygon(100% 0, 100% 100%, 0 100%)'
      article.appendChild(newDivLayout(newDiv));
    }
    if (words >= 180 && words < 300) {
      article.style.gridColumn = "span 2";
      article.style.backgroundColor = "rgb(78, 202, 163)";
      // shape-outside and clip-path make a sharp shape starts left
      const newDiv = document.createElement('div');
      newDiv.style.shapeOutside = 'polygon(0 0,100% 100%,0 100%)'
      newDiv.style.clipPath = 'polygon(0 0, 100% 100%, 0 100%)'
      article.appendChild(newDivLayout(newDiv));
    }
    article.style.color = globalColor;

    // Imply performance API
    const end = new Date().getTime();
    const time = end - start;
    // console.log(time)
    performance.mark("end");
    performance.measure("Fetching all jokes", "start", "end");
    const measurements = performance.getEntriesByType("measure");
    console.log(measurements);
    // Clear out all marks
    performance.clearMarks();
  } catch (error) {
    console.warn(`We have an error here: ${error}`);
  } finally {
    console.log("Finally will fire no matter what!");
  }
}

function newDivLayout(newDiv) {
  newDiv.style.height = '30%'
  newDiv.style.backgroundColor = 'red'
  newDiv.style.borderRadius = '0 0 1em 1em'
  newDiv.style.margin = 0
  return newDiv
}
// #2 Part two: songs; not open it in a new tab window
// document.querySelector(".writeSong button").onclick = function() {
//   window.open("./song.html");
// };
