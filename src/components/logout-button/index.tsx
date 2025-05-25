import {useAppDispatch} from "@hooks/redux.ts";
import {logout} from "../../store/reducers/User/slice/User.ts";
import {useNavigate} from "react-router-dom";

export const LogoutButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const clickHandler = () =>{
        dispatch(logout())
        navigate("/login")
    }

    return <span className="btn btn-sm btn-danger" onClick={clickHandler}>Log Out</span>
}
