//Подключаем библиотеку dotenv, чтобы читать переменные из файла .env
require("dotenv").config();
//Подключаем библиотеку axios, чтобы с ее помощью отправлять запросы к api
const axios = require("axios");
//Создаем экземпляр axios с базовым url
const apiClient = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
//validateStatus: () => true позволяет не выбрасывать exception на ответы с ошибками 4xx/5xx.
// Это нужно для негативынх тестов
  validateStatus: () => true
});
//экспортируем apiClients, чтобы использовать его в тестах 
module.exports = apiClient