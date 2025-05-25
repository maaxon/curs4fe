import React from 'react';
import logo from '../../../assets/img/logo-alt.png'
import {Link} from "react-router-dom";
import {LogoutButton} from "@components/logout-button";
import {ADMIN_MANAGE_RESUME, ADMIN_MANAGE_VACANCY} from "@constants/routes.ts";

export const AdminHeader: React.FC = () => {

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
                            <Link to={ADMIN_MANAGE_RESUME}>Manage resume</Link>
                        </li>
                        <li>
                            <Link to={ADMIN_MANAGE_VACANCY}>Manage Vacancy</Link>
                        </li>
                    </ul>

                    <div className="pull-right user-login">
                        <LogoutButton/>
                    </div>
                </div>
            </nav>
        </>
    );
};

