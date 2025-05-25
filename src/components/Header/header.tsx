import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../public/app.min.css'
import logo from '../../assets/img/logo-alt.png'
import {Link} from "react-router-dom";
import {LogoutButton} from "@components/logout-button";
import {ResponseModal} from "@components/response-modal";
import {ResponseCard} from "@components/response-modal/response-card";
import {useAppSelector} from "@hooks/redux.ts";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
import {useGetUserResponsesQuery} from "../../store/api/response/user";
import {UserSettingsModal} from "@components/user-settings-modal";

const Header: React.FC = () => {
    const user= useAppSelector(getUser)

    const {data} = useGetUserResponsesQuery(user?.id)


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
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to={"/resumes"}>Resumes</Link>
                        </li>
                        <li>
                            <Link className="active" to={"/favorites"}>Create Resume</Link>
                        </li>
                    </ul>
                    <div className="pull-right user-login">
                        <LogoutButton/>
                        <ResponseModal>
                            {data && data.map((response) => <ResponseCard key={response.id} response={response}/>)}
                        </ResponseModal>
                        <UserSettingsModal/>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
