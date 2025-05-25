import {Modal} from "@components/modal";
import styles from './style.module.css'
import {useAppDispatch, useAppSelector} from "@hooks/redux.ts";
import {getUserResumes} from "../../store/reducers/Resume/selectors/selector.ts";
import {useEffect, useState} from "react";
import {fetchUserResumes} from "../../store/reducers/Resume/thunk/fetchUserResume.ts";
import {getUser} from "../../store/reducers/User/selectors/selector.ts";
import {Link} from "react-router-dom";

interface Props {
    handleModalClose: VoidFunction,
    isModalOpen: boolean,
    onResponse: (resumeId?: number) => void,
}

export const SelectResumeModal = ({handleModalClose, isModalOpen, onResponse}: Props) => {
    const resume = useAppSelector(getUserResumes)
    const user = useAppSelector(getUser)
    const dispatch = useAppDispatch()

    const [selected, setSelected] = useState<number>()

    useEffect(() => {
        if (resume.length === 0) dispatch(fetchUserResumes(user!.id))
    }, []);

    const onSelect = (id: number) => () => {
        setSelected(id)
    }

    const onApply = () =>{
        onResponse(selected)
    }

    console.log(resume)

    return (
        <>
            {isModalOpen && <Modal onClose={handleModalClose} position="center">
                <div className={styles.wrapper}>
                    <h3>Select resume :</h3>
                    <div className={styles.resumes}>
                        {resume.filter(resume => resume.status === "Published").map(({title, id}) =>
                            <div className={`${styles.resumeCard} ${selected === id && styles.selected}`}
                                 onClick={onSelect(id)}>
                                <p>Resume: {title}</p>
                                <Link to={`/view/resume/${id}`}>View resume</Link>
                            </div>
                        )}
                    </div>
                    <div className="action-buttons d-flex justify-content-end">
                        <span className="btn btn-success" onClick={onApply}>Apply now</span>
                    </div>
                </div>
            </Modal>}
        </>
    )
}
