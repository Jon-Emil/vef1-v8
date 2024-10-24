/**
 * Sýnilausn á verkefni 8 í Vefforritun 1, 2024.
 * Byggir á sýnilausn á verkefni 7.
 * Notar jsdoc til að skrifa lýsingu á föllum, inntaki og úttaki.
 * Kveikið á `Check JS` í Visual Studio Code til að sjá mögulegar villur.
 * Notar `console.assert` til að athuga hvort föll virki rétt.
 */

import { isString, splitOnWhitespace } from "./lib/helpers.js";
import { removeHidden } from "./lib/removeHidden.js";
import { updateOutput } from "./lib/updateOutput.js";
import { addHidden } from "./lib/addHidden.js";

function submitHandler(event) {
  event.preventDefault();
  const outputElement = document.querySelector(".output");
  if (outputElement) {
    removeHidden(outputElement);
  }
  const textareaElement = document.querySelector("textarea");
  if (textareaElement) {
    updateOutput(textareaElement.value);
  }
}

function resetHandler() {
  const outputElement = document.querySelector(".output");
  if (outputElement) {
    addHidden(outputElement);
  }
}

const formElement = document.querySelector("form");

if (formElement) {
  formElement.addEventListener("submit", submitHandler);
  formElement.addEventListener("reset", resetHandler);

  const textareaElement = document.querySelector("textarea");

  if (textareaElement) {
    textareaElement.addEventListener("input", submitHandler);
  }
}
