"use strict";

const notes = [
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
const container = document.querySelector(".results-container");
const heading = document.querySelector(".results-heading");
const table = document.querySelector(".results-table");

userInput.addEventListener("input", (e) => {
  container.classList.add("hide");

  const bpm = Number.parseInt(userInput.value);
  if (Number.isNaN(bpm)) {
    return;
  }

  table.replaceChildren();

  heading.textContent = bpm + " beats per minute";
  const converted = convert(bpm);
  for (const data of converted) {
    const tr = document.createElement("tr");
    const symbol = document.createElement("span");
    const note = document.createElement("td");
    const hz = document.createElement("td");
    const ms = document.createElement("td");

    symbol.textContent = data.symbol;
    note.appendChild(symbol);
    note.appendChild(document.createTextNode(" " + data.note));
    tr.appendChild(note);

    hz.textContent = data.hz + " Hz";
    tr.appendChild(hz);

    ms.textContent = data.ms + " ms";
    tr.appendChild(ms);

    table.appendChild(tr);
  }

  container.classList.remove("hide");
});

function convert(bpm) {
  const results = [];
  for (const note of notes) {
    let hz = bpm / 60 / (4 * note.value);
    hz = hz.toFixed(3);

    let ms = (60000 / bpm) * (4 * note.value);
    ms = Math.round(ms);

    results.push({
      hz,
      ms,
      note: note.name,
      symbol: note.symbol,
    });
  }

  return results;
}
