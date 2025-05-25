export const Header = () =>{
    return (
        <header className="page-header bg-img size-lg" style={{backgroundImage: "url(bg-banner1.jpg)"}}>
            <div className="container no-shadow">
                <h1 className="text-center">Manage jobs</h1>
                <p className="lead text-center">Here's the list of your submitted jobs. You can edit or delete them, or
                    even add a new one.</p>
            </div>
        </header>
    )
}