export interface User {
    id: number;         // Идентификатор пользователя
    email: string;     // Электронная почта пользователя
    name: string;      // Имя пользователя
    role: 'user' | 'admin' | 'employer'; // Роль пользователя
    loggedByGoogle?: boolean
}
