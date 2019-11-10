let i = true;
while (i) {
  let article = document.createElement("article");
  let jokeP = document.createElement("p");
  article.appendChild(jokeP);
  article.style.color = "deeppink";
  document.querySelector(".main").appendChild(article);
  // make sure height > screenHeight, not very true
  if (document.querySelector(".main").offsetHeight > window.outerHeight / 4) {
    i = false;
  }
}

for (let item of document.querySelectorAll("article")) {
  // make a joke
  item.innerText = "Be ready for a joke...";
  item.style.color = "green";
  getData(item);
  // item.style.padding = "5px 0 0 5px";
}

async function getData(article) {
  try {
    let chuckJokes = await fetch(
      `https://api.chucknorris.io/jokes/random`
    ).then(res => res.json());
    article.innerText = chuckJokes.value;
    article.style.color = "deeppink";
  } catch (error) {
    console.warn(`We have an error here: ${error}`);
  } finally {
    console.log("Finally will fire no matter what!");
  }
}
