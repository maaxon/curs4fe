import {Favorites} from "@pages/Favorites";
import ManageResumes from "@pages/ManageResumes/ManageResumes.tsx";
import {Resume} from "@pages/Resume/Resume.tsx";
import UpdateResume from "@pages/UpdateResume";
import {LoginPage} from "@pages/Login";
import {RegisterPage} from "@pages/Register";
import {CreateVacancy} from "@pages/createVacancy";
import {VacanciesPage} from "@pages/Vacancies";
import {VacancyPage} from "@pages/Vacancy";
import {ManageVacancies} from "@pages/ManageVacancies";
import {UpdateVacancy} from "@pages/UpdateVacancy";
import AdminManageResumes from "@pages/AdminResumeManage";
import {AdminManageVacancies} from "@pages/AdminVacancyManage";

export const DETAIL = "/detail/:id"
export const HOME = "/"
export const FAVORITES = "favorites"
export const RESUMES = "resumes"
export const RESUME = "/resume/:id"
export const UPDATE_RESUME = "update-resume/:id"
export const LOGIN = "/login"
export const REGISTER = "/register"
export const CREATE_VACANCY = "create-vacancy"
export const VACANCIES = "vacancies"
export const VACANCY = "vacancy/:id"
export const MANAGE_VACANCIES = "/manage-vacancies"
export const UPDATE_VACANCY = "update-vacancy/:id"

export const ADMIN_MANAGE_RESUME = "/admin/manage-resume"
export const ADMIN_MANAGE_VACANCY = "/admin/manage-vacancy"

export const VIEW_VACANCY = "/view/vacancy/:id"
export const VIEW_RESUME = "/view/resume/:id"
export const ADMIN_VIEW_RESUME = "/admin/resume/:id"
export const ADMIN_VIEW_VACANCY = "/admin/vacancy/:id"

export const publicRoutes = [
    {path: LOGIN, component: LoginPage},
    {path: REGISTER, component: RegisterPage},]

export const userRoutes = [
    {path: VACANCIES, component: VacanciesPage},
    {path: VACANCY, component: VacancyPage},
    {path: FAVORITES, component: Favorites},
    {path: RESUMES, component: ManageResumes},
    {path: VIEW_RESUME, component: Resume},
    {path: UPDATE_RESUME, component: UpdateResume},
]

export const employerRoutes = [
    {path: CREATE_VACANCY, component: CreateVacancy},
    {path: MANAGE_VACANCIES, component: ManageVacancies},
    {path: UPDATE_VACANCY, component: UpdateVacancy},
    {path: HOME, component: ManageVacancies},
    {path: RESUME, component: Resume},
    {path: VIEW_VACANCY, component: VacancyPage},
]

export const adminRoutes = [
    {path: ADMIN_MANAGE_RESUME,component: AdminManageResumes},
    {path: ADMIN_MANAGE_VACANCY,component: AdminManageVacancies},
    {path: ADMIN_VIEW_RESUME,component: Resume},
    {path: ADMIN_VIEW_VACANCY,component: VacancyPage},
]
