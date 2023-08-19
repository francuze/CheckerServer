# Используем базовый образ с Node.js
FROM node:14

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json внутрь контейнера
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

# Устанавливаем зависимости
RUN npm install

# Открываем порты, на которых работают сервера
EXPOSE 3001
EXPOSE 3002

# Команда для запуска приложения внутри контейнера
CMD ["npm","run","dev"]
