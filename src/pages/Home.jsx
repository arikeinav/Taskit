import React from 'react'
import { Link } from 'react-router-dom'



export function Home() {
    return (
        <div>
            <div className="home flex column ">
                <h1>Welcome To Task<span className="logo-i">i</span>t</h1>
                <pre>Organizing your</pre><pre>daily tasks</pre>


                <Link to="/board"><p>Start</p></Link>
            </div>
            <div className="home-details-comtainer">
                <h1>THE POWERS OF TASKIT</h1>
                <section className="home-details flex">
                    <img src="https://res.cloudinary.com/cloudinary-img/image/upload/v1600856698/Taskit/marvin-meyer-SYTO3xs06fU-unsplash_rsc7gd.jpg" alt="img"/>
                    <div className="info">
                        <h2>Web Sockets</h2>
                        <p>With the power of web sockets, you and your team can enjoy a workspace that updates in real-time, keeping everyone synced and up to date.</p>
                    </div>
                </section>

                <section className="home-details flex">
                    <div className="info">
                        <h2>Drag n Drop!</h2>
                        <p>Try our Drag n Drop technology to easily move & update your tasks with your mouse or finger.</p>
                    </div>
                    <img src="https://res.cloudinary.com/cloudinary-img/image/upload/v1600352679/Taskit/tony-yeung-Exq6e9gH4Ag-unsplash_e7ltjx.jpg" alt="img"/>
                </section>

                <section className="home-details flex">
                    <img src="https://res.cloudinary.com/cloudinary-img/image/upload/v1600352679/Taskit/tony-yeung-Exq6e9gH4Ag-unsplash_e7ltjx.jpg" alt="img"/>
                    <div className="info">
                        <h2>Make it yours</h2>
                        <p>Make it feel like home for you and your team. Customize the board's appearance, Organize your lists to fit the team's flow.</p>
                    </div>
                </section>
            </div>
        </div>
    )
}
