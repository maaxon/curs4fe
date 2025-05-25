import Header from "@pages/AdminResumeManage/Header.tsx";
import ManageResumeCard from "@components/Admin/ManageResumeCard";
import {useGetAdminResumesQuery} from "../../store/api/admin/resumes";

const AdminManageResumes = () => {
    const {data: resumes, isLoading} = useGetAdminResumesQuery();

    return (
        <>
            <Header/>
            <main>
                <section className="no-padding-top bg-alt">
                    <div className="container">
                        <div className="row">
                            {isLoading && <h1>Loading...</h1>}
                            {resumes && resumes.map(({id, location, title, salary,user,}) =>
                                <ManageResumeCard key={id} id={id} location={location} title={title} salary={salary}
                                                    name={user.name}/>)}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );


};

export default AdminManageResumes