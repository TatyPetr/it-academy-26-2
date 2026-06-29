//Валидное тело запроса для создания новой книги
const createBookBody = {
  id: 201,
  title: "Book 201",
  description: "Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.",
  pageCount: 250,
  excerpt: "Lorem lorem lorem. Lorem lorem lorem. Lorem lorem",
  publishDate: "2026-06-29T15:03:42.9474898+00:00"
};

//Валидное тело запроса для обновления новой книги
const updateBookBody = {
  id: 1,
  title: "Updated Book",
  description: "Updated description for test",
  pageCount: 503,
  excerpt: "Updated text.",
  publishDate: "2026-06-28T15:03:42.9474898+00:00"
};
// Неправильный тип данных у id 
const invalidBookId = {
  id: 'id',
  title: "Book 1",
  description: "Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n",
  pageCount: 100,
  excerpt: "Lorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\nLorem lorem lorem. Lorem lorem lorem. Lorem lorem lorem.\n",
  publishDate: "2026-06-27T15:02:42.9474802+00:00"
};
//Экспортируем фикстуры, чтобы использовать их в тестах
module.exports = {
  createBookBody,
  updateBookBody,
  invalidBookId,
};