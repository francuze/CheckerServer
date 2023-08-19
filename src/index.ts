import checkContracts from "./core/functions/CheckContract"; // Импортируем модуль для проверки контракта
import { Logger } from "./core/functions/Logger";
import serverA from "./core/routes/serverA"; // Импорт модуля сервера A
import serverB from "./core/routes/serverB"; // Импорт модуля сервера B
import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
export const server = Fastify();

class ServerManager {
  private serverAPort: number; // Порт для сервера A
  private serverBPort: number; // Порт для сервера B

  constructor() {
    this.serverAPort = 3001; // Устанавливаем порт для сервера A
    this.serverBPort = 3002; // Устанавливаем порт для сервера B

    this.startServers().then(() => {
      this.checkContract(); // После запуска серверов выполняем проверку контракта
    });
  }

  private async startServers(): Promise<void> {
    const startServer = (server, port): Promise<void> => {
      return new Promise((resolve, reject) => {
        server.listen({ port }, (err) => {
          if (err) {
            reject(err); // Если есть ошибка при запуске сервера, отклоняем промис с ошибкой
          } else {
            console.log(server.addresses())
            Logger.log(`Server listening on port ${port}`); // Отправляет логи в файл Log.log
            resolve(); // Разрешаем промис
          }
        });
      });
    };
    await Promise.all([
      startServer(serverA, this.serverAPort), // Запускаем сервер A
      startServer(serverB, this.serverBPort), // Запускаем сервер B
    ]);
  }

  private async checkContract(): Promise<void> {
    try {
        
      const resultA = await checkContracts.CheckVerify(
        `http://localhost:${this.serverAPort}/data`,
        "Hello from Server A"
      ); // Проверяем контракт на сервере A
      const resultB = await checkContracts.CheckVerify(
        `http://localhost:${this.serverBPort}/data`,
        "Hello from Server B"
      ); // Проверяем контракт на сервере B
      Logger.log(`Проверка сервер A - ${resultA} сервер B - ${resultB}`); // Отправляет логи в файл Log.log
    } catch (error) {
      Logger.error("Error while checking contract:", error); // Отправляет логи в файл Log.log
    }
  }
}

const serverManager = new ServerManager(); // Создаем экземпляр класса ServerManager и запускаем управление серверами
