import {Link, useNavigate} from "react-router-dom";
import React, {ChangeEvent, useState} from "react";
import axios from "axios";
import {ErrorMessage} from "@components/ErrorMessage";
import {signInWithPopup} from "firebase/auth";
import {auth, googleProvider} from "../../firebase.ts";

interface RegisterData {
    email: string;
    password: string;
    name: string;
    role: string
}

export const RegisterPage = () => {
    const [{name, email, password, role}, setRegisterData] = useState<RegisterData>({
        email: "",
        password: "",
        role: "",
        name: ""
    });
    const [withGoogle, setWithGoogle] = useState<boolean>(false);
    const [error, setError] = useState<boolean | null>(null);

    const navigate = useNavigate();

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterData(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    const selectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setRegisterData(prevState => ({...prevState, [e.target.name]: e.target.value}));
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null)
        try {
            await axios.post(`${import.meta.env.VITE_BACK_URL}/users/register`, {name, email, password, role})
            navigate('/login')
        } catch {
            setError(true)
        }
    }

    const handleSignupWithGoogleClick = async () => {
        await signInWithPopup(auth, googleProvider).then(async (userCredential) => {
            const {email} = userCredential.user;
            if (email) {
                setRegisterData(prev => ({...prev, email: email, password: email}))
                setWithGoogle(true)
            }
        });
    };

    return (
        <div className="login-page">
            {error && <ErrorMessage error={"Failed to register"}/>}
            <main>

                <div className="login-block">
                    <img src="/logo.png" alt=""/>
                    <h1>Log into your account</h1>

                    <form onSubmit={onSubmit}>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <input type="text" name="name" value={name} onChange={changeHandler}
                                       className="form-control" placeholder="Your name"/>
                            </div>
                        </div>

                        <hr className="hr-xs"/>

                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                                <input type="text" name="email" value={email} onChange={changeHandler}
                                       className="form-control" placeholder="Your email address"/>
                            </div>
                        </div>

                        <hr className="hr-xs"/>
                        {!withGoogle &&
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                    <input type="password" name="password" value={password} onChange={changeHandler}
                                           className="form-control" placeholder="Choose a password"/>
                                </div>
                            </div>
                        }
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <select name="role" value={role} onChange={selectChangeHandler}
                                        className="form-select w-75 form-select-lg" aria-label="Default select example">
                                    <option value="" selected>Select role</option>
                                    <option value="user">Employee</option>
                                    <option value="employer">Employer</option>
                                </select>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-block" type="submit">Sign up</button>
                        {!withGoogle && <button className="btn btn-primary btn-block" type="button" onClick={handleSignupWithGoogleClick}>Sign up with Google</button>}

                    </form>
                </div>

                <div className="login-links">
                    <p className="text-center">Already have an account? <Link className="txt-brand"
                                                                              to="/login">Login</Link></p>
                </div>

            </main>
        </div>
    )
}
