//Task 1
function formatCurrencyArray (arr){
    if (!Array.isArray (arr)){
        return 'Ошибка: нужно передать массив.';
        //Проверка точно ли пришел массив
    }
    const result = arr.map((item) => {
        //выбран метод map чтобы вернуть новый массив результатов
        if (typeof item !== 'string'){
            return `Ошибка: значение "${item}" не является строкой.`;
            //Проверка, что элемент строка
        }
        const trimmedValue = item.trim ();
        //используем метод trim чтобы удалить пробелы в начале и в конце строки
        if (trimmedValue === ''){
            return 'Ошибка: пустая строка не является числом.';
            //проверяем является ли пустой строка
        }
        const numberValue = Number (trimmedValue);
        // Преобразуем значение trimmedValue в число, использую функцию Number
        if (isNaN (numberValue)) {
            return `Ошибка: значение "${item}" не является корректным числом.`;
        }
        //с помощью функции isNaN является ли numberValue Not-a-Number (не числом)
        return numberValue.toLocaleString ('en-US', {
            //метод toLocaleString превращает число в строку в удобном формате, 
            //('en-US') - указываем локаль, которая задает правила форматирвоания числа
            style: "currency",
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        //Обьект с настройками как именно нужно форматировать число
        // как валюту USD c 2 знаками в дробной части
    });
    return result;
    //возвращаем массив, который создал map()
}
const currencyData = [ '12345', '5000.9', 'abc', '', ' 10000 '];
console.log (formatCurrencyArray (currencyData));

//Task 2
function removeFalsyAndSortDesc (arr) {
    if  (!Array.isArray (arr)) {
        return 'Ошибка: нужно передать массив.';
    }
    //Используем метод обьекта Array isArray, чтобы проверить что переменная arr является массивом
    //Если не является возвращать ошибку
    //Если arr не массив, то код может работать неправильно или выдать ошибку
    const filteredArray = arr.filter (Boolean);
    //Используем встроенный метод массива filter чтобы оставить значения true
    //falsy-значения при преобразовании в Boolean становятся false
    const sortedArray = filteredArray.sort ((a,b) => b-a);
    //Используем метод sort чтобы отсортировать массив,  
    //дальше передается функция ((a,b) => b-a), чтобы отсортировать массив по убыванию
    return sortedArray;   
}
const data = [0, 44, false, 105, '', 1 , null, 6, undefined, NaN, 3];
console.log (removeFalsyAndSortDesc (data));

//Task 3
function groupPeopleByAge (arr) {
    if (!Array.isArray (arr)){
    return 'Ошибка: нужно передать массив.';
    }
    const result = arr.reduce ((acc, person)=> {
    //Используем метод reduce чтобы пройтись по массиву и собрать из него один результат
        if (typeof person !== 'object' || person === null) 
            //если person не объект или равен null
            {
            return acc;
            //если person не объект или равен null, то пропускаем его
        }
        if (!('name' in person) || !('age' in person))
            return acc;
        //если нет name или age пропустить этот обьект

        if (!acc[person.age]) {
            acc [person.age] = [];
            //если для возраста нет массива, нужно создать его
        }
        acc [person.age].push (person.name);
        //добавляем имя текущего человека в массив, который соответствует его возрасту
        return acc;
    }, {});
    //{} означает что проверка начинается с пустого обьекта, а потом он заполняется
    return result;
}
const people = [
        {name: 'Александр', age: 12},
        {name: 'Петр', age: 12},
        {name: 'Семен', age: 89},
        {name: 'Агата', age: 22},
        {name: 'Карен', age: 34},
        {name: 'Игорь', age: 89},
    ]
    console.log (groupPeopleByAge (people));

    //Task 4
    async function runPronisesInParallel(functionArray) {
        if (!Array.isArray (functionArray)){
        throw new Error ('Ошибка: нужно передать массив функций.')
    }
    const areAllFunctions = functionArray.every ((fn) => typeof fn === 'function');
    //С помощью метода every проверяем все ли элементы массива подходит под условие
    //Каждый элемент массива functionArray функция
    if (!areAllFunctions) {
        throw new Error ('Ошибка: Все элементы массива должны быть функциями.');
    }
    const promises = functionArray.map((fn)=> fn ());
    //Проходим по массиву функций, вызываем каждую функцию и собираем полученные промисы в новый массив
    const results = await Promise.all(promises);
    //метод all обьекта Promise ждет пока выполнятся все промисы и затем возвращает массив их результатов
    // await останавливает выполнение, пока все промисы не завершатся
    return results;
}
const asyncFunction = [
    () => Promise.resolve ('Первый результат'),
    () => Promise.resolve ('Второй результат'),
    () => Promise.resolve ('Третий результат'),
];
runPronisesInParallel(asyncFunction)
    .then ((results)=> {
        console.log (results);
    })
    .catch ((error) => {
        console.log (error.message);
    })

//Task 5 
function printMultiplicationTable(n) 
//n - число, до которого строится таблица
{
    if (isNaN(n)) {
        console.log('Ошибка: нужно ввести число.');
        return;
    }
    if (!Number.isInteger(n)) {
        console.log('Ошибка: нужно ввести целое число.');
        return;
    }
    if (n < 1) {
        console.log('Ошибка: число должно быть больше или равно 1.');
        return;
    }
    const cellWidth = String(n * n).length + 2;
    //переводим число в строку, чтобы узнать с помощью length длину строки, 
    //+2 - добавляем места для выравнивания
    const rowSums = [];
    const columnSums = new Array(n).fill(0);
    //создаем массив длиной n и заполняем его нулями
    let totalSum = 0;
    let header = 'x'.padStart(cellWidth) + ' |';
    // с помощью padStart(cellWidth) добавляем столько пробелов,
    // чтобы строка занимала ширину одной ячейки

    for (let i = 1; i <= n; i++) {
        header += String(i).padStart(cellWidth);
        //добавляем очередное число в строку заголовка
        //String(i) потому что padStart работает только со строками
    }
    const separator = '-'.repeat(header.length);
    //делаем разделитель такой же длины, как заголовок

    console.log(separator);
    console.log(header);
    console.log(separator);
    // выводим заголовок таблицы
 
    for (let i = 1; i <= n; i++) {
        let row = String(i).padStart(cellWidth) + ' |';
        let rowSum = 0;
        for (let j = 1; j <= n; j++) {
            const value = i * j;
            row += String(value).padStart(cellWidth);
            rowSum += value;
            columnSums[j - 1] += value;
            totalSum += value;
        }
        rowSums.push(rowSum);
        console.log(row);
    }
    console.log(separator);
    console.log('Суммы строк:    ' + rowSums.map((sum) => String(sum).padStart(cellWidth)).join(''));
    console.log('Суммы столбцов: ' + columnSums.map((sum) => String(sum).padStart(cellWidth)).join(''));
    console.log('Общая сумма таблицы: ' + totalSum);
}
printMultiplicationTable(6);
 