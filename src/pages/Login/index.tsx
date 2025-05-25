import {Link, useNavigate} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import {loginUser} from "../../store/reducers/User/thunk/login.ts";
import {getUser, getUserError, getUserLoading} from "../../store/reducers/User/selectors/selector.ts";
import {ErrorMessage} from "@components/ErrorMessage";
import {auth, googleProvider} from "../../firebase.ts";
import { signInWithPopup } from "firebase/auth";


export const LoginPage = () => {
    const [{email, password}, setLoginData] = useState({email: "", password: ""});
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(getUserError)
    const loading = useAppSelector(getUserLoading)
    const user = useAppSelector(getUser)

    console.log('x')

    useEffect(() => {
        if (!error && !loading && user && user.role === 'user') navigate("/vacancies");
        if (!error && !loading && user && user.role === 'employer') navigate("/");
        if (!error && !loading && user && user.role === 'admin') navigate("/admin/manage-resume");
    }, [user]);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            dispatch(loginUser({email: email, password: password}))
    }

    const handleSignupWithGoogleClick = async () => {
        await signInWithPopup(auth, googleProvider).then(async (userCredential) => {
            const {email} = userCredential.user;
            if (email) dispatch(loginUser({email: email, password: email, loggedByGoogle: true}))
        });
    };


    return (
        <div className="login-page">
            {error && <ErrorMessage error={"Failed to login"}/>     }
            <main>

                <div className="login-block">
                    <img src="logo.png" alt=""/>
                    <h1>Log into your account</h1>

                    <form onSubmit={onSubmit}>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                <input type="text" name="email" value={email} onChange={changeHandler}
                                       className="form-control" placeholder="Email"/>
                            </div>
                        </div>

                        <hr className="hr-xs"/>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <input type="password" value={password} name="password" onChange={changeHandler}
                                       className="form-control" placeholder="Password"/>
                            </div>
                        </div>

                        <button className="btn btn-primary btn-block" type="submit">Login</button>
                        <button className="btn btn-primary btn-block" type="button" onClick={handleSignupWithGoogleClick}>Login with google</button>


                    </form>
                </div>

                <div className="login-links">
                    <Link className="pull-right" to={'/register'}>Register an account</Link>
                </div>

            </main>
        </div>
    )
}
