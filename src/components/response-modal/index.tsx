import {Modal} from "@components/modal";
import {useModalOpen} from "@hooks/use-modal-open/use-modal-open.ts";
import styles from './style.module.css'

interface Props{
    children: React.ReactNode | React.ReactNode[];
}

export const ResponseModal = ({children}:Props) => {
    const {isModalOpen, handleModalOpen, handleModalClose} = useModalOpen();

    return (
        <>
            <span className="btn btn-sm btn-primary" onClick={handleModalOpen}>responses</span>
            {isModalOpen && <Modal onClose={handleModalClose}>
                <div className={styles.wrapper}>
                    <h1>Responses</h1>
                    {children}
                </div>
            </Modal>}
        </>
    )
}
