// Task 1
function playDiceGame(playersCount, throwsCount){
    if (
    !Number.isInteger(playersCount) ||
    !Number.isInteger(throwsCount) ||
    playersCount <= 0 ||
    throwsCount <= 0
  ) {
    console.log("Error: playersCount and throwsCount must be positive integers.");
    return;
  }
    // Массив для хранения информации о каждом игроке
    let playersResults = [];
    //Создаем массив, в котором будет сохраняться результат всех игроков
    for (let i = 1; i <= playersCount; i++) {
    let playerThrows = [];
    let sum = 0;
    // Для каждого игрока создали отдельный массив и создали переменную для суммы очков этого игрока
    for (let j = 0; j < throwsCount; j++) {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    playerThrows.push(diceValue);
    sum += diceValue;
    // Добавляем бросок в массив и увеличиваем общую сумму
    }
    playersResults.push({
      player: i,
      throws: playerThrows,
      total: sum,
    });
    console.log(`Player ${i} throws: ${playerThrows.join(", ")}. Total: ${sum}`);
  }
  let maxTotal = playersResults[0].total;
    // Находим максимальную сумму среди всех игроков
  for (let i = 1; i < playersResults.length; i++) {
    if (playersResults[i].total > maxTotal) {
      maxTotal = playersResults[i].total;
    }
  }
  const winners = [];
   // Ищем всех игроков, у которых сумма равна максимальной
    for (let i = 0; i < playersResults.length; i++) {
      if (playersResults[i].total === maxTotal) {
      winners.push(playersResults[i]);
    }
  }
  // Если победитель один — выводим его
  if (winners.length === 1) {
    console.log(
      `Winner: Player ${winners[0].player} with ${winners[0].total} points`
    );
  } else {
    // Если победителей несколько — это ничья
    const drawPlayers = winners.map((winner) => `Player ${winner.player}`);
    console.log(`Draw between players: ${drawPlayers.join(", ")}`);
  }     
}
playDiceGame(3, 5);

//Task 2
function splitNumber(number, partsCount) {
  if (
    !Number.isInteger(number) ||
    !Number.isInteger(partsCount) ||
    number <= 0 ||
    partsCount <= 0
  ) {
    console.log("Error: number and partsCount must be positive integers.");
    return;
  }
  // Проверка правильности данных, number, partsCount - целые числа, больше 0

  let parts = [];
  //создаем массив, в который будут складываться случайные числа
  let remaining = number;
  for (let i = 0; i < partsCount - 1; i++) 
  //последнюю часть считаем отдельно, чтобы сумма точно совпала
    {
    let randomPart = Math.floor(Math.random() * (remaining + 1));
  //создаем случайное число от 0 до remaining, remaining +1, чтобы могло появиться и само число remaining
    parts.push(randomPart);
    remaining -= randomPart;
  //уменьшаем остаток
  }
  parts.push(remaining);
  for (let i = parts.length - 1; i > 0; i--)
  //перемешиваем элементы массива, так как без перемешивания последняя часть всегда была бы остатком, а не случайным числом
    {
    let j = Math.floor(Math.random() * (i + 1));
    //выбираем случайный индекс
    let temp = parts[i];
    parts[i] = parts[j];
    parts[j] = temp;
    //сохраняем текущий элемент во временную переменную и меняем элементы местами
  }
  console.log(parts);
  return parts;
}
splitNumber(15, 3);
splitNumber(20, 5);

// Task 3
function countFriday13(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  // Преобразуем строки startDate и endDate в объекты Date
  if (isNaN(start.getTime()) || isNaN(end.getTime())) 
    // Проверяем, что даты введены правильно. Если дата неправильная, getTime() вернёт NaN
    {
    console.log("Error: invalid date.");
    return;
  }
 
  if (start > end) {
     // Проверяем, что начальная дата не больше конечной
    console.log("Error: startDate must be earlier than endDate.");
    return;
  }
  let friday13Dates = [];

  let currentDate = new Date(start);
   // Создаём переменную currentDate. В неё записываем копию начальной даты. Именно эту дату будем двигать по одному дню вперёд
  while (currentDate <= end) {
    if (currentDate.getDate() === 13 && currentDate.getDay() === 5) {
      let year = currentDate.getFullYear();
      let month = String(currentDate.getMonth() + 1).padStart(2, "0");
      // getMonth() возвращает месяц от 0 до 11, поэтому прибавляем 1. String(...) превращает число в строку.
      // padStart(2, "0") добавляет 0 слева, если нужно

      let day = String(currentDate.getDate()).padStart(2, "0");
      friday13Dates.push(`${year}-${month}-${day}`);
      // Собираем дату в формате YYYY-MM-DD
      // и добавляем её в массив найденных дат
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  console.log("Friday 13th dates:");
  for (let i = 0; i < friday13Dates.length; i++) {
    console.log(friday13Dates[i]);
    // Выводим все найденные даты по одной
  }
  console.log(`Total Friday 13th count: ${friday13Dates.length}`);
  // Выводим общее количество найденных пятниц 13-го
}
countFriday13("2021-01-01", "2030-12-31");