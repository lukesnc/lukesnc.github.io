"use strict";

const notes = [
  { value: 960, name: "4", symbol: "𝅝𝅝𝅝𝅝" },
  { value: 480, name: "2", symbol: "𝅝𝅝" },
  { value: 240, name: "1", symbol: "𝅝" },
  { value: 120, name: "1/2", symbol: "𝅗𝅥" },
  { value: 60, name: "1/4", symbol: "♩" },
  { value: 40, name: "1/4T", symbol: "" },
  { value: 30, name: "1/8", symbol: "𝅘𝅥𝅮" },
  { value: 20, name: "1/8T", symbol: "" },
  { value: 15, name: "1/16", symbol: "𝅘𝅥𝅯" },
  { value: 10, name: "1/16T", symbol: "" },
  { value: 7.5, name: "1/32", symbol: "𝅘𝅥𝅰" },
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
    let hz = bpm / note.value;
    hz = hz.toFixed(3);

    let ms = (note.value / bpm) * 1000;
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
