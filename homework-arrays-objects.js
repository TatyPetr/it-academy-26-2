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
const secret = 3487;
const guess = 3794;
let secretDigits = String (secret).split('');
let guessDigits = String (guess).split('');
console.log (secretDigits);
console.log (guessDigits);
let samePosition = 0;
let sameValuePosition = 0;
for (let i = 0; i < secretDigits.length; i++) {
    if (secretDigits[i] === guessDigits [i]) {
        samePosition++;
    }
    else if (secretDigits.includes(guessDigits[i]))
    {
    sameValuePosition++;
}
}
console.log ('Same position:', samePosition);
console.log ('Same value but different position:',sameValuePosition);

//Task 5 Sort and filter users
const users = [
  { name: "Alex", age: 25, city: "Warsaw" },
  { name: "Maria", age: 32, city: "Gdansk" },
  { name: "John", age: 19, city: "Berlin" },
  { name: "Oleg", age: 41, city: "Warsaw" },
  { name: "Anna", age: 25, city: "Krakow" }
];
 
const usersByAgeAsc = users.slice().sort(function(a, b) {
//Создаем новую переменную usersByAgeAsc, в нее записываем пользователей по возрасту по возрастанию
//users.slice() создает копию массива, сортируем копию массива с помощью sort()
//и функции сравнения, чтобы не изменять исходный массив
  return a.age - b.age;
});
 
const usersByAgeDesc = users.slice().sort(function(a, b) {
  return b.age - a.age;
});
//аналогично делаем сортировку по возрастe по убыванию
 
const usersByName = users.slice().sort(function(a, b)
//Создаем новую переменную usersByName, в которой пользователи будут отсортированы по имени
 {
  if (a.name > b.name) {
    return 1;
    // возвращаем return 1, чтобы поставить a после b
  }
  if (a.name < b.name) {
    return -1;
    // возвращаем return -1, чтобы поставить a перед b
  }
  return 0;
  // возвращаем return 0, чтобы ничего не менять, когда имена одинаковые
});

 
const userNames = [];
for (let i = 0; i < users.length; i++) {
  userNames.push(users[i].name);
}
 
const usersOlderThan25 = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].age > 25) {
    usersOlderThan25.push(users[i]);
  }
  //Добавлем имя текущего пользователя в конец массива, 
  //если выполняется условие возраст >25
}
 
let firstUserFromWarsaw = null;
//создаем переменную firstUserFromWarsaw и присваиваем ей значение null, 
// потому что пока нужный пользователь не найден
 
for (let i = 0; i < users.length; i++) {
//запускаем цикл по всем пользователям
  if (users[i].city === "Warsaw") {
    //проверяем у текущего пользователя свойство city
    firstUserFromWarsaw = users[i];
    break;
    //останавливаем цикл, если найден пользователь из Варшавы
  }
}

console.log("Users sorted by age ascending");
console.log(usersByAgeAsc);
console.log("Users sorted by age descending");
console.log(usersByAgeDesc);
console.log("Users sorted by name");
console.log(usersByName);
console.log("User names");
console.log(userNames);
console.log("Users older than 25");
console.log(usersOlderThan25);
console.log("First user from Warsaw");
console.log(firstUserFromWarsaw);

//Task 6
const products = [
  { id: 1, title: "Phone", price: 1200, category: "electronics" },
  { id: 2, title: "Laptop", price: 2500, category: "electronics" },
  { id: 3, title: "Book", price: 40, category: "books" },
  { id: 4, title: "Phone", price: 1200, category: "electronics" },
  { id: 5, title: "Pen", price: 5, category: "stationery" },
  { id: 6, title: "Book", price: 40, category: "books" }
];
const uniqueProducts = [];
for (let i=0; i<products.length; i++) {
    let isDuplicate = false;
//перебираю все товары, считаю, что товар не дубликат
for (let j = 0; j<uniqueProducts.length; j++){
//сравниваю текущий товар с уже уникальными товарами
if (products[i].title === uniqueProducts[j].title &&
    products[i].price === uniqueProducts[j].price
){
    isDuplicate = true;
//если название и цена одинаковые, то товар повторяется
}
}
if (isDuplicate === false)
//если значение осталось false, то товар уникальный
{
uniqueProducts.push(products[i])
//добавлем текущий товар в конец массива
}
}//получаем массив всех названий не повторяющихся товаров
const productTitles = [];
for (let i = 0; i < uniqueProducts.length; i++) {
productTitles.push(uniqueProducts[i].title);
}
console.log(productTitles);

const uniqueCategories=[];
for (let i = 0; i < uniqueProducts.length; i++){
if (!uniqueCategories.includes(uniqueProducts[i].category))
    //проверяет, если такой кактегории еще нет
{
    uniqueCategories.push (uniqueProducts[i].category)
//добавляет категорию в конец массива
}
}
console.log (uniqueCategories);

let totalPrice = 0;
for (let i = 0; i < uniqueProducts.length; i++) {
totalPrice = totalPrice + uniqueProducts[i].price;
}
console.log('Total price',totalPrice);

const categoryCount = {};
//создала пустой обьект
for (let i = 0; i < uniqueProducts.length; i++) {
const category = uniqueProducts[i].category;
//запускаем цикл и сохраняем категорию текущего токара в category
if (categoryCount[category]) {
categoryCount[category] = categoryCount[category] + 1;
//проверяем есть ли уже категория, если есть увеличиваем ее значение
} else {
categoryCount[category] = 1;
//если категория встретилась первый раз создаем это свойство в объекте со значением 1
}
}
console.log (categoryCount);
const oneProduct = uniqueProducts[2];
console.log ('Object keys:')
console.log (Object.keys(oneProduct));
//показываем все ключи объекта
console.log ('Object values:')
console.log (Object.values(oneProduct));
//показываем все значение объекта
console.log ('Object entries:')
console.log (Object.entries(oneProduct));
//показываем все пары ключ-значение объекта
 