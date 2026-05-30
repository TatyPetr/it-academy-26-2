// Task 1 
let numbers = [1, 2, 3, 4, 5, 6];
let reversedNumbers = numbers.slice().reverse();
console.log(reversedNumbers);
//Исходный массив важно не изменять, так как он дальше может использоваться и это приведет к ошибкам

//Task 2
//Option 1
let numbers2 = [3, 67, 15, 89, 24, 7, 101, 36];
let maxNumberValue = numbers2[0];
let minNumberValue = numbers2[0];
for (let i = 1; i < numbers2.length; i++) 
{if (numbers2[i] > maxNumberValue) 
{maxNumberValue = numbers2[i]} 
{if (numbers2[i] < minNumberValue)
minNumberValue= numbers2[i]}}
console.log ('Max number:', maxNumberValue);
console.log ('Min number:', minNumberValue);

//Option 2
let maxNumberMath = Math.max (...numbers2);
let minNumberMath = Math.min (...numbers2);

console.log ('Max number Math:', maxNumberMath);
console.log ('Min number Math:', minNumberMath);

//Task 3
let startIndex = 3;
let length = 7;
let fibonachi = [0,1];
for (let i = 2; i < startIndex+length; i++) {
    fibonachi [i] = fibonachi [i-1] + fibonachi [i-2];
}
let result = fibonachi.slice (startIndex, startIndex + length);

console.log (result);

//Task 4
