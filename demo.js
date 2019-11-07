let i = true;
while (i) {
  let article = document.createElement("article");
  article.style.color = "teal";
  article.innerText = document.querySelector(".main").appendChild(article);
  // make sure height > screenHeight, not very true
  if (document.querySelector(".main").offsetHeight > window.outerHeight / 2) {
    i = false;
  }
}

for (let item of document.querySelectorAll("article")) {
  // make a joke
  getData(item);
  item.style.padding = "5px 0 0 5px";
}

async function getData(article) {
  try {
    let chuckJokes = await fetch(
      `https://api.chucknorris.io/jokes/random`
    ).then(res => res.json());
    article.innerText = chuckJokes.value;
  } catch (error) {
    console.warn(`We have an error here: ${error}`);
  } finally {
    console.log("Finally will fire no matter what!");
  }
}
