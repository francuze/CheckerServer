import axios from "axios"; // Импорт модуля для HTTP-запросов
import { ServerResponse } from "../Interface/contract"; // Импорт интерфейса ServerResponse
import { Logger } from "./Logger";

class ContractVerifier {
  // Статический метод для проверки контракта
  static async CheckVerify(
    url: string, // URL для запроса
    expectedMessage: string // Ожидаемое сообщение
  ): Promise<boolean> {
    try {
      console.log(url); // Выводим URL для запроса в консоль
      const response = await axios.get<ServerResponse>(url); // Выполняем GET-запрос и ожидаем объект ServerResponse
      const actualMessage = response.data.message; // Извлекаем фактическое сообщение из ответа

      Logger.log("Получено сообщение:", actualMessage); // Выводим фактическое сообщение в консоль

      return actualMessage === expectedMessage; // Возвращаем результат сравнения ожидаемого и фактического сообщений
    } catch (error) {
      Logger.error("Ошибка:", error.message); // Выводим сообщение об ошибке в консоль
      return false; // Возвращаем false в случае ошибки
    }
  }
}

export default ContractVerifier; // Экспортируем класс ContractVerifier
