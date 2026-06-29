//Подключаем библиотеку ajv для проверки JSON схемы
const Ajv = require("ajv");
//подключаем настроенный api-клиент для http-запросов
const api = require("../clients/apiClients");
//подключаем схему book
const bookSchema = require("../schemas/book.schema.v1");
//подключаем тестовые данные
const {
  createBookBody,
  updateBookBody,
  invalidBookBody,
  invalidBookId,
} = require("../fixtures/book.fixture");

//Создаем объект валидатора, который умеет проверять данные по schema
const ajv = new Ajv();
//делаем из schema функцию проверки, чтобы проверить, что response body
//соответствует ожидаемой структуре JSON схемы
const validateBook = ajv.compile(bookSchema);
 
describe("Books API - CRUD integration tests", () => {
  describe("READ operations", () => {
    //тест проверяет получение списка книг
    test("should return books list", async () => {
      //запоминаем время начала запроса для проверки скорости ответа
      const start = Date.now();
      const response = await api.get("/Books");
      //вычисляем длительность выполнения запроса в милисекундах
      const duration = Date.now() - start;
      //проверяем что запрос вернул статус код 200
      expect(response.status).toBe(200);
      //проверяем, что данные ответа являются массивом
      expect(Array.isArray(response.data)).toBe(true);
      //проверяем, что массив книг не пустой
      expect(response.data.length).toBeGreaterThan(0);
      //валидируем первую книгу по JSON-схеме
      const isValid = validateBook(response.data[0]);
      //Проверяем, что структура первой книги корректа
      expect(isValid).toBe(true);
      //Проверяем, что ошибок валидации нет
      expect(validateBook.errors).toBeNull();
      //что ответ пришел быстрее 1000 мс
      expect(duration).toBeLessThan(1000);
    });
    //Параметризированный тест, проверяем получение книги по нескольким корректным id
    test.each([1, 2, 3])("should return book by valid id %i", async (id) => {
      const response = await api.get(`/Books/${id}`);
 
      expect(response.status).toBe(200);
      //Проверяем, что в ответе есть поле id
      expect(response.data).toHaveProperty("id");
      //Проверяем, что id в ответе совпадает с запрошенным
      expect(response.data.id).toBe(id);
 
      const isValid = validateBook(response.data);
      expect(isValid).toBe(true);
      expect(validateBook.errors).toBeNull();
    });
  });

  
  describe("CREATE operation", () => {
    test("should create a new book and return created entity", async () => {
      const response = await api.post("/Books", createBookBody);
 
      expect([200, 201]).toContain(response.status);
 
      expect(response.data.id).toBe(createBookBody.id);
      expect(response.data.title).toBe(createBookBody.title);
      expect(response.data.description).toBe(createBookBody.description);
      expect(response.data.pageCount).toBe(createBookBody.pageCount);
      expect(response.data.excerpt).toBe(createBookBody.excerpt);
      expect(response.data.publishDate).toBe(createBookBody.publishDate);
 
      const isValid = validateBook(response.data);
      expect(isValid).toBe(true);
      expect(validateBook.errors).toBeNull();
    });
  });
 
  describe("UPDATE operation", () => {
    test("should update existing book by stable id", async () => {
      const response = await api.put("/Books/1", updateBookBody);
 
      expect([200, 204]).toContain(response.status);
 
      if (response.status === 200 && response.data) {
        expect(response.data.id).toBe(1);
        expect(response.data.title).toBe(updateBookBody.title);
        expect(response.data.description).toBe(updateBookBody.description);
        expect(response.data.pageCount).toBe(updateBookBody.pageCount);
        expect(response.data.excerpt).toBe(updateBookBody.excerpt);
        expect(response.data.publishDate).toBe(updateBookBody.publishDate);
      }
    });
  });
 
  describe("DELETE operation", () => {
    test("should delete book by stable id", async () => {
      const response = await api.delete("/Books/1");
 
      expect([200, 204]).toContain(response.status);
      //Дополнительно проверяем, что статус код на ходится в диапазоне успешных
      expect(response.status >= 200 && response.status < 300).toBe(true);
    });
  });
 
  describe("Negative cases", () => {
    //Параметризированный тест, проверяем ошибки для некоторых id в GET запросе
    test.each(["invalid-id", "abc", "!@#"])(
      "should return error for GET /Books/%s",
      async (invalidId) => {
        //Отправляем запрос с некорректным id
        const response = await api.get(`/Books/${invalidId}`);
        //Проверяем, что ответ не является успешным
        expect(response.status >= 200 && response.status < 300).toBe(false);
        expect(response.status).toBeGreaterThanOrEqual(400);
      }
    );
 
    test("should return error for GET /Books/999999", async () => {
      const response = await api.get("/Books/999999");
 
      expect(response.status >= 200 && response.status < 300).toBe(false);
      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.data).toBeDefined();
    });
 
    test("should return error for POST /Books with invalid id", async () => {
      const response = await api.post("/Books", invalidBookId);
 
      expect(response.status >= 200 && response.status < 300).toBe(false);
      expect(response.status).toBeGreaterThanOrEqual(400);
    });
 
    test("should return error for PUT /Books/1 with invalid id", async () => {
      const response = await api.put("/Books/1", invalidBookId);
 
      expect(response.status >= 200 && response.status < 300).toBe(false);
      expect(response.status).toBeGreaterThanOrEqual(400);
    });
 
    test("should return error for DELETE /Books/invalid-id", async () => {
      const response = await api.delete("/Books/invalid-id");
 
      expect(response.status >= 200 && response.status < 300).toBe(false);
      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
// Вариант 1. Проверка OpenAPI/Swagger
// 1. Поля совпадают
// 2. В документации swagger обязательные поля не указаны, 
// в моей схеме указаны
// 3. id	integer($int32)
//    title	string, nullable
//    description	string, nullable
//    pageCount	integer($int32)
//    excerpt	string, nullable
//    publishDate	string($date-time)
//  4. В документации можно указать обязательные поля и указать какие значения могут быть null
