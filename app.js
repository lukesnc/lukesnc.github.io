// Author: lukesnc

const NOTES = [
  { value: 4, name: "4", symbol: "𝅝𝅝𝅝𝅝" },
  { value: 2, name: "2", symbol: "𝅝𝅝" },
  { value: 1, name: "1", symbol: "𝅝" },
  { value: 1 / 2, name: "1/2", symbol: "𝅗𝅥" },
  { value: 1 / 4, name: "1/4", symbol: "♩" },
  { value: 1 / 8, name: "1/8", symbol: "𝅘𝅥𝅮" },
  { value: 1 / 16, name: "1/16", symbol: "𝅘𝅥𝅯" },
  { value: 1 / 32, name: "1/32", symbol: "𝅘𝅥𝅰" },
];

const userInput = document.getElementById("bpm");
userInput.addEventListener("input", (e) => {
  const resultsNote = document.querySelector(".results-note");
  const resultsHz = document.querySelector(".results-hz");
  const resultsMs = document.querySelector(".results-ms");
  const resultsHeading = document.querySelector(".results-heading");
  const legend = document.querySelector(".legend");

  resultsNote.textContent = "";
  resultsHz.textContent = "";
  resultsMs.textContent = "";
  resultsHeading.textContent = "";
  legend.classList.add("hide");

  const bpm = Number.parseInt(userInput.value);
  if (Number.isNaN(bpm)) {
    return;
  }

  resultsHeading.textContent = bpm + " beats per minute";
  const converted = convert(bpm);
  for (const entry of converted) {
    //resultsNote.innerHTML += "<span>" + entry.symbol + "</span> ";
    resultsNote.innerHTML += entry.note + "<br />";
    resultsHz.innerHTML += entry.hz + " Hz<br />";
    resultsMs.innerHTML += entry.ms + " ms<br />";
  }
  legend.classList.remove("hide");
});

function convert(bpm) {
  let results = [];
  for (const note of NOTES) {
    let hz = bpm / 60 / (4 * note.value);
    hz = hz.toFixed(3);

    let ms = (60000 / bpm) * (4 * note.value);
    ms = Number.parseInt(ms);

    results.push({
      note: note.name,
      symbol: note.symbol,
      hz: hz,
      ms: ms,
    });
  }
  return results;
}
