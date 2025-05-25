import {useModalOpen} from "@hooks/use-modal-open/use-modal-open.ts";
import {Modal} from "@components/modal";
import styles from "@components/response-modal/style.module.css";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
import {ErrorMessage} from "@components/ErrorMessage";
import axios from "axios";
import {changeName, logout} from "../../store/reducers/User/slice/User.ts";
import {useNavigate} from "react-router-dom";

export const UserSettingsModal = () => {
    const {isModalOpen, handleModalOpen, handleModalClose} = useModalOpen();
    const dispatch = useAppDispatch();
    const user = useAppSelector(getUser);
    const [{name, password}, setForm] = useState({password: '', name: user?.name});
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const onChangeSubmit = (name: string, value: string | undefined) => async () => {
        setError(null)
        try {
            if (!value || value.length < 3) throw new Error("Name should be at least 3 characters");
            await axios.put(`${process.env.BACK_URL}/users/change-${name}/${user?.id}`, {
                [name]: value
            })
            setForm(prevState => ({...prevState, password: ''}))
            if (name === 'name') dispatch(changeName(value))
            handleModalClose();
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message)
            }
            setError('Error on update user')
        }
    }

    const onDelete = async () => {
        setError(null)
        try {
            await axios.delete(`${process.env.BACK_URL}/users/${user?.id}`)
            dispatch(logout())
            navigate('/login')
            handleModalClose();
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message)
            }
            setError('Error on delete user')
        }
    }

    return (
        <>
            {error && <ErrorMessage error={error}/>}
            <span className="btn btn-sm btn-danger" onClick={handleModalOpen}>settings</span>
            {isModalOpen && <Modal onClose={handleModalClose}>
                <div className={styles.wrapper}>
                    <h1>Change user</h1>
                    <div className="d-flex form-group w-75">
                        <input className="form-control" type="text" name="name" value={name} onChange={onChange}/>
                        <button style={{marginLeft: 15}} className="btn btn-primary"
                                onClick={onChangeSubmit('name', name)}>change name
                        </button>
                    </div>
                    {!user?.loggedByGoogle &&
                        <div className="d-flex form-group w-75">
                            <input className="form-control" placeholder="Enter new password" type="password"
                                   name="password" value={password} onChange={onChange}/>
                            <button style={{marginLeft: 15}} className="btn btn-primary"
                                    onClick={onChangeSubmit('password', password)}>change
                                password
                            </button>
                        </div>
                    }
                    <br/>
                    <div>
                        <button className="btn btn-danger" onClick={onDelete}>Remove user</button>
                    </div>
                </div>
            </Modal>}
        </>
    )
}
