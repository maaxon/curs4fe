import {RootState} from "../../../store.ts";

export const getResumes = (state: RootState) => state.resume.resumes;
export const getUserResumes = (state: RootState) => state.resume.userResume;
export const getResume = (state: RootState) => state.resume.selectedResume;
export const getResumeError = (state: RootState) => state.resume.error;

export const getEducation = (state: RootState) => state.resume.selectedResume?.education;
export const getExperience = (state: RootState) => state.resume.selectedResume?.experience;
export const getSkills = (state: RootState) => state.resume.selectedResume?.skills;
