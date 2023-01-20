//? 1. Write a program to print the following pattern

// Sample Input :-
//1. Please enter your lucky number: 5
//2. Please enter your lucky number: 3

//!1 expected output :

//          1
//        1 3 A
//      1 3 5 A B
//    1 3 5 7 A B C
//  1 3 5 7 9 A B C D
//    1 3 5 7 A B C
//      1 3 5 A B
//        1 3 A
//          1

//!2 expected output :

//     1
//   1 3 A
// 1 3 5 A B
//   1 3 A
//     1

//! Ans
const prompt = require("prompt-sync")();

let num = prompt("Please enter your lucky number: ");

let i, j, k, m;
let string = "";

for (i = 1; i <= num; i++) {
  for (j = 0; j < num - i; j++) {
    string += "  ";
  }
  for (k = 0; k <= i * 2 - 1; k++) {
    if (k % 2 != 0) {
      string += " " + k;
      if (k != 1 && k == i * 2 - 1) {
        for (m = 0; m < i - 1; m++) {
          string += " " + String.fromCharCode(m + 65);
        }
      }
    }
  }
  string += "\n";
}

for (i = num - 1; i > 0; i--) {
  for (j = 0; j < num - i; j++) {
    string += "  ";
  }
  for (k = 1; k <= i * 2 - 1; k++) {
    if (k % 2 != 0) {
      string += " " + k;
      if (k != 1 && k == i * 2 - 1) {
        for (m = 0; m < i - 1; m++) {
          string += " " + String.fromCharCode(m + 65);
        }
      }
    }
  }
  string += "\n";
}

console.log(string);
