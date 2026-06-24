const Calculator = require("./calculator");
//Импорт класса Calculator из файла calculator.js
//чтобы в тестах можно было создать обьект этого класса
 
describe("Класс Calculator", () => {
  let calculator;
 
  beforeEach(() => {
    calculator = new Calculator();
  });
 
  describe("Метод add()", () => {
    it("должен возвращать сумму нескольких положительных чисел", () => {
      const numbers = [1, 2, 3];
      const result = calculator.add(...numbers);
      expect(result).toBe(6);
    });
 
    it("должен возвращать сумму отрицательных чисел", () => {
      const numbers = [-1, -2, -3];
      const result = calculator.add(...numbers);
      expect(result).toBe(-6);
    });
 
    it("должен корректно складывать положительные и отрицательные числа", () => {
      const numbers = [10, -3, -2, 5];
      const result = calculator.add(...numbers);
      expect(result).toBe(10);
    });
 
    it("должен возвращать 0 при вызове без аргументов", () => {
      const result = calculator.add();
      expect(result).toBe(0);
    });
 
    it.each([
      [1, 2, 3],
      [-1, -2, -3],
      [5, -5, 0],
      [0, 0, 0],
    ])(
      "должен возвращать %i при сложении %i и %i",
      (a, b, expected) => {
        const result = calculator.add(a, b);
        expect(result).toBe(expected);
      }
    );
  });
 
  describe("Метод multiply()", () => {
    it("должен возвращать произведение нескольких чисел", () => {
      const numbers = [2, 3, 4];
      const result = calculator.multiply(...numbers);
      expect(result).toBe(24);
    });
 
    it("должен возвращать 0 при умножении на ноль", () => {
      const numbers = [5, 0, 10];
      const result = calculator.multiply(...numbers);
      expect(result).toBe(0);
    });
 
    it("должен корректно умножать числа, если одно из них отрицательное", () => {
      const numbers = [-2, 3, 4];
      const result = calculator.multiply(...numbers);
      expect(result).toBe(-24);
    });
 
    it("должен возвращать 1 при вызове без аргументов", () => {
      const result = calculator.multiply();
      expect(result).toBe(1);
    });
  });
 
  describe("Метод subtraction()", () => {
    it("должен корректно выполнять обычное вычитание", () => {
      const reduced = 10;
      const subtrahend = 4;
      const result = calculator.subtraction(reduced, subtrahend);
      expect(result).toBe(6);
    });
 
    it("должен возвращать отрицательный результат, если вычитаемое больше уменьшаемого", () => {
      const reduced = 4;
      const subtrahend = 10;
      const result = calculator.subtraction(reduced, subtrahend);
      expect(result).toBe(-6);
    });
 
    it("должен корректно работать с нулем", () => {
      const reduced = 0;
      const subtrahend = 5;
      const result = calculator.subtraction(reduced, subtrahend);
      expect(result).toBe(-5);
    });
  });
 
  describe("Метод divide()", () => {
    it("должен корректно делить целые числа", () => {
      const dividend = 10;
      const divider = 2;
      const result = calculator.divide(dividend, divider);
      expect(result).toBe(5);
    });
 
    it("должен возвращать дробный результат при делении", () => {
      const dividend = 5;
      const divider = 2;
      const result = calculator.divide(dividend, divider);
      expect(result).toBe(2.5);
    });
 
    it("должен возвращать Infinity при делении на ноль", () => {
      const dividend = 10;
      const divider = 0;
      const result = calculator.divide(dividend, divider);
      expect(result).toBe(Infinity);
    });
  });
 
  describe("Метод exponentiation()", () => {
    it("должен возвращать квадрат положительного числа", () => {
      const number = 5;
      const result = calculator.exponentiation(number);
      expect(result).toBe(25);
    });
 
    it("должен возвращать квадрат отрицательного числа", () => {
      const number = -4;
      const result = calculator.exponentiation(number);
      expect(result).toBe(16);
    });
 
    it("должен возвращать 0, если число равно нулю", () => {
      const number = 0;
      const result = calculator.exponentiation(number);
      expect(result).toBe(0);
    });
  });
 
  describe("Spy / Mocking", () => {
    it("должен отслеживать вызов метода add и его аргументы", () => {
      const spy = jest.spyOn(calculator, "add");
 
      calculator.add(1, 2, 3);
 
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(1, 2, 3);
 
      spy.mockRestore();
    });
  });
 
  describe("Бонус: нестандартные входные данные", () => {
    it("должен склеивать строку и число в методе add", () => {
      const result = calculator.add("1", 2);
      expect(result).toBe("012");
    });
 
    it("должен возвращать NaN при умножении undefined на число", () => {
      const result = calculator.multiply(undefined, 5);
      expect(result).toBeNaN();
    });
 
    it("должен делить null как 0 на число", () => {
      const result = calculator.divide(null, 2);
      expect(result).toBe(0);
    });
 
    it("должен возвращать NaN при сложении NaN и числа", () => {
      const result = calculator.add(NaN, 2);
      expect(result).toBeNaN();
    });
 
    it("должен преобразовывать boolean в число при умножении", () => {
      const result = calculator.multiply(true, 5);
      expect(result).toBe(5);
    });
  });
});
//При передаче нестандартных значений JavaScript автоматически приводит типы,
//поэтому результат может быть неожиданным. Например, строка может привести к конкатенации, 
// undefined — к NaN, null — к 0, а true — к 1. Для JavaScript это ожидаемо,
//  но для калькулятора такое поведение не всегда удобно. Поэтому желательно добавить валидацию входных данных 
// и разрешать работу только с числами.
 
//Краткое описание:
//Протестированы методы add(), multiply(), subtraction(), divide(), exponentiation(). 
// Покрыты edge cases: вызов add() и multiply() без аргументов, умножение на ноль,  
// отрицательный результат вычитания, деление на ноль, работа exponentiation() с нулем. 
// Параметризация использована для метода add() через it.each(). 
// Spy использован для метода add() через jest.spyOn(): проверены факт вызова, количество вызовов и аргументы.