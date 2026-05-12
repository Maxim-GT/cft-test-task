# Тестовое задание frontend

Клиентское SPA на React с авторизацией по телефону и OTP, получение профиля пользователя.

## Стек технологий

| Слой | Технологии |
|------|------------|
| **UI** | React 19, React Router 7, CSS Modules |
| **Формы и валидация** | React Hook Form, Zod, `@hookform/resolvers` |
| **Данные и состояние** | TanStack Query (React Query), Zustand |
| **HTTP** | Axios (инстанс с перехватчиками, Bearer-токен) |
| **Уведомления и ошибки** | Sonner, `react-error-boundary` |
| **Сборка и язык** | Vite 8, TypeScript 6 |
| **Качество кода** | ESLint 10, Prettier 3 |
| **Архитектура** | Feature-Sliced Design (`app` / `pages` / `widgets` / `features` / `entities` / `shared`) |

## Запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Переменные окружения

Бэкенд задаётся через `VITE_API_URL` (без завершающего слэша; префикс `/api` к базе добавляется в коде).

Создайте в корне проекта файл `.env` (или `.env.local`):

```env
VITE_API_URL=https://example.com
```

### 3. Режим разработки

```bash
npm run dev
```

### 4. Сборка и предпросмотр продакшн-сборки

```bash
npm run build
npm run preview
```

### Полезные скрипты

| Команда | Назначение |
|---------|------------|
| `npm run lint` | проверка ESLint |
| `npm run lint:fix` | ESLint с автоисправлением |
| `npm run format` | Prettier по проекту |
| `npm run format:check` | проверка форматирования без записи |

