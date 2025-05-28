import {User} from "../store/reducers/User/types/types.ts";

type UserInfo = Omit<User, 'role'>;

export interface Resume {
    image?: string,
    title: string;
    description: string;
    salary: number;
    location: string;
    user: UserInfo
}

export interface Education {
    img?: string,
    degree: string,
    school: string,
    from_date: string,
    to_date: string,
    description: string,
    major: string
}

export interface Experience {
    img?: string,
    company: string,
    position: string,
    from_date: string,
    to_date: string,
    description: string,
}

export interface Skill {
    name: string,
    proficiencyLevel: string;
}

export interface FullResume extends Resume {
    education: Education[],
    experience: Experience[],
    skills?: Skill[],
}

export interface FullResumeWithIds extends Resume {
    id: string,
    education: EducationWithId[],
    experience: ExperienceWithId[],
    skills: SkillWithId[],
}



interface ExperienceWithId extends Experience {
    id: string,
}

interface EducationWithId extends Education {
    id: string,
}

interface SkillWithId extends Skill {
    id: string,
}

export interface ResumeFormContext {
    data?: FullResume,
    setData: (data: FullResume) => void,
}

export interface Vacancy {
    title: string;
    company_name: string;
    short_description: string;
    description: string;
    salary: number;
    location: string;
    job_type: 'Full time' | 'Part time' | 'Internship' | 'Freelance' | 'Remote';
    degree: 'Postdoc' | 'Ph.D.' | 'Master' | 'Bachelor';
    working_hours: number;
    experience: number;
    tags: string[]
}

export interface VacancyWithId extends Vacancy {
    id: string,
    user_id: number;
    rating: number
}

export interface UserVacancy extends VacancyWithId {
    status: string
}

export interface Rate {
    rate: number,
    owner: number,
    user?: number
}

export interface Response {
    user_id: number | string,
    employer_id: number | string,
    vacancy_id: number | string,
    resume_id: number | string,
}

export interface UserResponse extends Response {
    id: number,
    status: string,
    vacancy_title: string
    resume_title: string
}

export interface EmployerResponse extends UserResponse {
    user_name: string
}
