import React, {createContext, useContext, useState} from 'react';
import {FullResume, ResumeFormContext} from "@type/types.ts";

const BookmarkContext = createContext<ResumeFormContext | undefined>(undefined);

const initialState: FullResume = {
    title: "",
    description: "",
    salary: 0,
    location: "",
    education: [
        {
            img: "", // URL изображения, если есть
            degree: "",
            school: "",
            from_date: "",
            to_date: "",
            description: "",
            major: ""
        }
    ],
    experience: [
        {
            img: "", // URL логотипа компании, если есть
            company: "",
            position: "",
            from_date: "",
            to_date: "",
            description: "",
        },
        {
            img: "", // URL логотипа компании, если есть
            company: "",
            position: "",
            from_date: "",
            to_date: "",
            description: "",
        }
    ],
    user: {
        id: 0,
        name: '',
        email: ''
    }
};

export const ResumeContext: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
    const [data, setData] = useState<FullResume | undefined>(initialState);


    return (
        <BookmarkContext.Provider value={{data, setData}}>{children}</BookmarkContext.Provider>
    );
};

export const useResumeFormContext = () => {
    const context = useContext(BookmarkContext);
    if (context === undefined) {
        throw new Error('useBookmarks must be used within a BookmarkProvider');
    }
    return context;
};
