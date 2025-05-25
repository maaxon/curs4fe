import {User} from "../../User/types/types.ts";

export interface Resume {
    id: number;             // Идентификатор резюме
    title: string;          // Заголовок резюме
    description: string;    // Описание резюме
    salary?: number | null;        // Зарплата (необязательное поле)
    location?: string | null;
    user: User;
    image?: string
}

export interface UserResume extends Resume{
    status: string
}
