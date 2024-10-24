import { isString } from "./helpers.js";

//------------------------------------------------------------------------------
// Fastar

/** Íslenskir samhljóðar */
const CONSONANTS = "bcdfghjklmnpqrstvwxz".split("");

/** Íslenskir sérhljóðar */
const VOWELS = "aeiouyáéýúíóöæ".split("");

//------------------------------------------------------------------------------
// Hjálparföll

function split(str, separator = " ") {
  if (!isString(str)) {
    return [];
  }

  return str.split(separator);
}

function longest(str) {
  if (!isString(str)) {
    return null;
  }

  const words = split(str, " ");

  let longestWord = "";
  for (const word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }
  return longestWord;
}
console.assert(
  longest("halló hæ") === "halló",
  "longest: skilar lengsta orðinu"
);
console.assert(
  longest("halló halli") === "halló",
  "longest: skilar fyrsta orðinu ef þau eru jafn löng"
);
console.assert(
  longest(null) === null,
  "longest: skilar null ef ekki er gefinn strengur"
);
console.assert(
  longest("") === "",
  "longest: skilar tómum streng ef tómur strengur er gefinn"
);

/**
 *
 * @param {unknown} str
 * @returns {string | null}
 */
function shortest(str) {
  if (!isString(str)) {
    return null;
  }

  const words = split(str, " ");

  let shortestWord = "";
  for (const word of words) {
    if (shortestWord === "" || word.length < shortestWord.length) {
      shortestWord = word;
    }
  }
  return shortestWord;
}
console.assert(shortest("halló hæ") === "hæ", "shortest: skilar stysta orðinu");
console.assert(
  shortest("halló halli") === "halló",
  "shortest: skilar fyrsta orðinu ef þau eru jafn löng"
);
console.assert(
  shortest(null) === null,
  "shortest: skilar null ef ekki er gefinn strengur"
);
console.assert(
  shortest("") === "",
  "shortest: skilar tómum streng ef tómur strengur er gefinn"
);

function reverse(str) {
  if (!isString(str)) {
    return null;
  }

  return str.split("").reverse().join("");
}
console.assert(
  reverse(null) === null,
  "reverse: skilar tómum streng ef ekki er gefinn strengur"
);
console.assert(
  reverse("") === "",
  "reverse: snúinn tómi strengurinn er tómi strengurinn"
);
console.assert(reverse("hello") === "olleh", "reverse: snýr við streng");

function palindrome(str) {
  if (!isString(str)) {
    return false;
  }

  if (str === "") {
    return false;
  }

  const reversed = reverse(str);

  // Hér lendum við í því að þar sem `reverse` *getur* skilað `null` þá ættum
  // við að athuga það líka þó svo að við vitum að við sendum inn streng.
  // Ef kveikt er á „JS Check“ í VSCode þá kemur villumelding ef við gerum ekki.
  if (!isString(reversed)) {
    return false;
  }

  return str.toLocaleLowerCase() === reversed.toLocaleLowerCase();
}
console.assert(
  palindrome("heh") === true,
  "palindrome: skilar `true` ef `str` er samhverfur"
);
console.assert(
  palindrome("halló") === false,
  "palindrome: skilar `false` ef `str` er ekki samhverfur"
);
console.assert(
  palindrome(null) === false,
  "palindrome: skilar `false` ef `str` er ekki strengur (null)"
);
console.assert(
  palindrome("heh HEH") === true,
  "palindrome: ekki skiptir máli hvort stafir séu hástafir eða lágstafir."
);
console.assert(
  palindrome("heh HEH!") === false,
  "palindrome: ekki þarf að fjarlægja bil, tölustafi eða önnur tákn."
);
console.assert(
  palindrome("") === false,
  "palindrome: tómur strengur er ekki samhverfur."
);

/**
 * Telur fjölda stafa í streng sem eru í characters fylki.
 * @param {string} str Strengur til að telja stafi í
 * @param {string[]} characters Fylki af stöfum sem á að telja
 * @returns {number} Fjöldi stafa í streng sem eru í characters
 */
function countGivenCharactersInString(str, characters) {
  if (!isString(str)) {
    return 0;
  }

  const splitStr = split(str, "");

  let count = 0;

  for (const char of splitStr) {
    if (characters.includes(char)) {
      count += 1;
    }
  }

  return count;
}

console.assert(
  countGivenCharactersInString("", []) === 0,
  "countGivenCharactersInString: skilar 0 ef tómi strengur"
);
console.assert(
  countGivenCharactersInString("asdf", []) === 0,
  "countGivenCharactersInString: skilar 0 ef tóma fylkið"
);
console.assert(
  countGivenCharactersInString("halló", ["a", "l"]) === 3,
  "countGivenCharactersInString: skilar fjölda stafa í streng"
);

function vowels(str) {
  return countGivenCharactersInString(str, VOWELS);
}
console.assert(
  vowels("halló") === 2,
  "vowels: skilar fjölda sérhljóða í streng"
);
console.assert(vowels("") === 0, "vowels: skilar 0 ef tómur strengur");
console.assert(
  vowels(null) === 0,
  "vowels: skilar 0 ef ekki er gefinn strengur"
);

function consonants(str) {
  return countGivenCharactersInString(str, CONSONANTS);
}
console.assert(
  consonants("halló") === 3,
  "consonants: skilar fjölda samhljóða í streng"
);
console.assert(consonants("") === 0, "consonants: skilar 0 ef tómur strengur");
console.assert(
  consonants(null) === 0,
  "consonants: skilar 0 ef ekki er gefinn strengur"
);

//------------------------------------------------------------------------------
// aðal fallið
/**
 * @param {string} str
 */
export function updateOutput(str) {
  const inputElement = document.querySelector(".input");
  if (inputElement) {
    inputElement.textContent = str;
  }

  const longestWordElement = document.querySelector(".longest");
  if (longestWordElement) {
    longestWordElement.textContent = longest(str);
  }
  const shortestWordElement = document.querySelector(".shortest");
  if (shortestWordElement) {
    shortestWordElement.textContent = shortest(str);
  }
  const vowelsElement = document.querySelector(".vowels");
  if (vowelsElement) {
    var vowelAmount = vowels(str) + "";
    vowelsElement.textContent = vowelAmount;
  }
  const consonantsElement = document.querySelector(".consonants");
  if (consonantsElement) {
    var consonantAmount = consonants(str) + "";
    consonantsElement.textContent = consonantAmount;
  }
  const palindromeElement = document.querySelector(".palindrome");
  if (palindromeElement) {
    palindromeElement.textContent = palindrome(str) + "";
  }
  const reversedElement = document.querySelector(".reversed");
  if (reversedElement) {
    reversedElement.textContent = reverse(str);
  }
}
