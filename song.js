document
  .querySelector('textarea[name="keyline"]')
  .addEventListener("keydown", function(event) {
    let keyLine = document.querySelector('textarea[name="keyline"]');
    const line = keyLine.value;
    let finalLine;
    if (line.includes("you") || line.includes("love")) {
      finalLine = `You need anything?`;
    } else {
      finalLine = `You're just blue, make a cup of tea and do something, and you'll be fine`;
    }
    if (event.key === "Enter" && event.code === "Enter") {
      keyLine.value = finalLine;
      keyLine.style.color = "deeppink";
    } else if (event.key === "Escape" && event.code === "Escape") {
      finalLine = "";
      keyLine.value = finalLine;
      keyLine.style.color = "teal";
    }
  });
