const isStringLengthValid = (string, maxLength) => {
  return string.length <= maxLength;
}

console.log(isStringLengthValid('dfgdfgdfg', 12));
console.log(isStringLengthValid('dfdfgdfg', 5));
console.log(isStringLengthValid('dfgdfgdfgasd', 12));

const isPalindrome = (string) => {
  string = string.replaceAll(" ", "").toLowerCase();
  let cleanedString = '';

  for (let i = (string.length - 1); i >= 0; i--) {
    cleanedString += string[i];
  }
  return cleanedString === string;
}

// Строка является палиндромом
console.log(isPalindrome('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalindrome('ДовОд')); // true
// Это не палиндром
console.log(isPalindrome('Кекс')); // false

const getNumbers = (string) => {
  let newString = '';
  let isNumber;
  for (let i = 0; i < string.length; i++) {
    isNumber = parseInt(string[i], 10);
    Number.isNaN(isNumber) ? '' : newString += isNumber;
  }
  return newString;
}

console.log(getNumbers('2023 год')); // 2023
console.log(getNumbers('ECMAScript 2022')); // 2022
console.log(getNumbers('1 кефир, 0.5 батона')); // 105
console.log(getNumbers('агент 007')); // 7
console.log(getNumbers('а я томат')); // NaN
