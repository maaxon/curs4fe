import React from 'react';
import logo from '../../../assets/img/logo-alt.png'
import {Link} from "react-router-dom";
import {LogoutButton} from "@components/logout-button";
import {useAppSelector} from "@hooks/redux.ts";
import {getUser} from "../../../store/reducers/User/selectors/selector.ts";
import {ResponseModal} from "@components/response-modal";
import {EmployerResponseCard} from "@components/response-modal/employer-response-card";
import {useGetEmployerResponsesQuery} from "../../../store/api/response/employer";
import {UserSettingsModal} from "@components/user-settings-modal";

const EmployerHeader: React.FC = () => {
    const user = useAppSelector(getUser)

    const {data} = useGetEmployerResponsesQuery(user?.id)
    return (
        <>
            <nav className="navbar">
                <div className="container">
                    <div className="pull-left">
                        <a className="navbar-toggle" href="#" data-toggle="offcanvas"><i className="ti-menu"></i></a>

                        <div className="logo-wrapper">
                            <Link className="logo-alt" to="/"><img src={logo} alt="logo-alt"/></Link>
                        </div>

                    </div>


                    <ul className="nav-menu">
                        <li>
                            <Link to={"/manage-vacancies"}>Vacancies</Link>
                        </li>
                        <li>
                            <Link className="active" to={"/create-vacancy"}>Create Vacancy</Link>
                        </li>
                    </ul>

                    <div className="pull-right user-login">
                        <LogoutButton/>
                        <ResponseModal>
                            {data && data.map((response) => <EmployerResponseCard key={response.id} response={response}/>)}
                        </ResponseModal>
                        <UserSettingsModal/>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default EmployerHeader;
