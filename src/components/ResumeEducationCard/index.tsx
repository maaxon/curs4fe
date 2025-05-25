import {Education} from "@type/types.ts";
import {formatDateToDdMonYyyy} from "@utils/formatDate";


export interface ResumeEducationCardProps {
    education: Education;
}

export const ResumeEducationCard = ({
                                        education: {
                                            degree,
                                            description,
                                            major,
                                            school,
                                            from_date,
                                            to_date
                                        }
                                    }: ResumeEducationCardProps) => {
    return (
        <div className="col-xs-12">
            <div className="item-block">
                <header>
                    <img src="/logo-mit.png" alt=""/>
                    <div className="hgroup">
                        <h4>{degree} <small>{major}</small></h4>
                        <h5>{school}</h5>
                    </div>
                    <h6 className="time">{formatDateToDdMonYyyy(from_date)} - {formatDateToDdMonYyyy(to_date)}</h6>
                </header>
                <div className="item-body">
                    <p>{description}</p>
                </div>
            </div>
        </div>

    )
}
