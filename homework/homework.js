//Task 1 Объявление переменных
const name ='Tatsyana';
console.log (name);
let age = 37;
console.log (age);
let city ;
console.log (city);
let salary = null;
console.log (salary);

//Task 2 Проверка типов данных
console.log (typeof name);
//string возвращает точный результат для простых типов данных
console.log (typeof age);
//number возвращает точный результат для простых типов данных
console.log (typeof city);
//undefined так как значения нет, не присвоено
console.log (typeof salary);
//object так как значение null, это баг JavaScript

//Task 3. Undefined vs Null
let country;
console.log (country);
console.log (typeof country);
let postcode = null;
console.log (postcode);
console.log (typeof postcode);
//разница в том, что undefined - значение переменной не присвоено, его просто нет, а null значение переменной задано, как "пустое"

//Task 4. Boolean, truthy и falsy значения
let emptyString = "";
let zero = 0;
let empty = null;
let undefined;
let notEmpty = 'Hello';
let number = 34;

console.log (Boolean (emptyString)); //false
console.log (Boolean (zero)); // false
console.log (Boolean (empty)); // false
console.log (Boolean (undefined)); // false
console.log (Boolean (notEmpty)); // true
console.log (Boolean (number)); //true

//Task 5. Number и преобразование типов
let integer = 24;
let fraction = 1.5;
let stringWithNumber = '25';
let stringWithText = 'Добрый';

console.log (typeof integer);
console.log (typeof franction);
console.log (typeof parseInt(stringWithNumber));
console.log (typeof parseInt(stringWithText)); // так как нельзя преобразовать строку в число, отображается тип NaN (Not-a-Number)

// Task 6. Проблема точности Number
console.log (0.1+0.2 === 0.3);
//Так как, числа с плавающей точкой могут не всегда точно представлять десятичные значения

//Task 7. Работа со строками
let text = ' Изучение Java Script ';
console.log (text.length);
let trimmedText = text.trim();
console.log(trimmedText);
let upperText = trimmedText.toUpperCase();
console.log(upperText);
let lowerText = trimmedText.toLowerCase();
console.log(lowerText);
console.log(trimmedText.includes("язык"));
console.log(trimmedText.indexOf("Java"));
let newText = `Новая строка: ${trimmedText}`;
console.log(newText);
