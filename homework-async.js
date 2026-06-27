//Task 1
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Используем функцию чтобы получить случайное число
const delay1 = getRandomInt(1000, 5000);
const delay2 = getRandomInt(1000, 5000);
const delay3 = getRandomInt(1000, 5000);
console.log(`Promise 1 delay: ${delay1} ms`);
console.log(`Promise 2 delay: ${delay2} ms`);
console.log(`Promise 3 delay: ${delay3} ms`);

const promise1 = new Promise((resolve) => {
setTimeout(() => {
// Запускаем таймер с задержкой delay1 
resolve(1);
}, delay1);
});

const promise2 = new Promise((resolve) => {
setTimeout(() => {
resolve(2);
}, delay2);
});

const promise3 = new Promise((resolve) => {
setTimeout(() => {
resolve(3);
}, delay3);
});

Promise.race([promise1, promise2, promise3])
// Promise.race() ждёт тот промис, который выполнится первым
.then((result) => {
console.log(`Fastest promise result: ${result}`);
})
.catch((error) => {
console.log("Task 1 error:", error);
// Обработка ошибок, если что-то пойдёт не так
});

//Task 2

function getNum() {
return new Promise((resolve) => {
setTimeout(() => {
const randomNumber = getRandomInt(1, 5);
resolve(randomNumber);
}, 3000);
});
}
async function showSquareOfNumber()
// Создаём асинхронную функцию для получения числа и его квадрата
{
try {
const number = await getNum();
// Ждём выполнения getNum()
const square = number ** 2;
console.log(`Generated number: ${number}`);
console.log(`Square: ${square}`);
} catch (error) {
console.log("Task 2 error:", error);
}
}
showSquareOfNumber();
//запускаем функцию

//Task 3
function getFirstNumber() {
return new Promise((resolve) => {
setTimeout(() => {
const firstNumber = getRandomInt(1, 5);
resolve(firstNumber);
}, 3000);
});
}
function getSecondNumber()
// Функция возвращает промис, который через 5 секунд выдаёт число от 6 до 10
{
return new Promise((resolve) => {
setTimeout(() => {
const secondNumber = getRandomInt(6, 10);
resolve(secondNumber);
}, 5000);
});
}
async function showSumOfNumbers()
// Асинхронная функция для последовательного выполнения двух операций
{try {
const firstNumber = await getFirstNumber();
// Сначала дожидаемся результата первой функции
const secondNumber = await getSecondNumber();
// Только после этого дожидаемся результата второй функции
const sum = firstNumber + secondNumber;
console.log(`First number: ${firstNumber}`);
console.log(`Second number: ${secondNumber}`);
console.log(`Sum: ${sum}`);
} catch (error) {
console.log("Task 3 error:", error);
}
}
showSumOfNumbers();