import React from "react";

const HomeHeader: React.FC = () => {
    return (
        <>
            <header className="page-header bg-img" style={{backgroundImage: `url(./bg-banner1.jpg)`,marginBottom:0}}>
                <div className="container page-name">
                    <h1 className="text-center">Browse resumes</h1>
                    <p className="lead text-center">Use following search box to find resumes that fits your position
                        better</p>
                </div>

            </header>
        </>
    );
};

export default HomeHeader;
