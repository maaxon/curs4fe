import  {Experience} from "@type/types.ts";
import {formatDateToDdMonYyyy} from "@utils/formatDate";

export interface ResumeExperienceCardProps {
    experience: Experience;
}

export const ResumeExperienceCard = ({
                                        experience: {
                                            position,
                                            description,
                                            company,
                                            from_date,
                                            to_date
                                        }
                                    }: ResumeExperienceCardProps) => {
    return (
        <div className="col-xs-12">
            <div className="item-block">
                <header>
                    <img src="assets/img/logo-google.jpg" alt=""/>
                    <div className="hgroup">
                        <h4>{company}</h4>
                        <h5>{position}</h5>
                    </div>
                    <h6 className="time">{formatDateToDdMonYyyy(from_date)} - {formatDateToDdMonYyyy(to_date)}</h6>
                </header>
                <div className="item-body">
                    <p>Responsibilities:</p>
                    <p>
                        {description}
                    </p>
                </div>
            </div>
        </div>


    )
}
