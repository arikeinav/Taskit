import React from 'react'
import { Link } from 'react-router-dom'



export function Home() {
    return (
        <div>
            <div className="home flex column ">
                {/* <h1>Welcome To Task<span className="logo-i">i</span>t</h1>
                <pre>Organizing your</pre><pre>daily tasks</pre> */}


                <Link to="/board"><p>Start</p></Link>
            </div>
            <div className="home-details-comtainer">
               
                <section className="home-details flex">
                    <img src="https://res.cloudinary.com/dsfnyykw9/image/upload/v1601040007/vectorstock_25716430_e79vvh.jpg" alt="img"/>
                    <div className="info">
                        <h2>Real-time updates</h2>
                        <p>Real-time updates are amazingly fast! Almost right away!  you and your team can enjoy a workspace that updates in real-time, keeping everyone synced and up to date!</p>
                    </div>
                </section>

                <section className="home-details second flex">
                    <div className="info">
                        <h2>Use any device</h2>
                        <p>You can use Taskit on any size of the screen. Its interface is much more different from other services. Taskit looks like an App, not a site.</p>
                    </div>
                    <img src="https://res.cloudinary.com/dsfnyykw9/image/upload/v1601042641/vectorstock_29242780_wd2ele.jpg" alt="img"/>
                </section>

                <section className="home-details flex">
                    <img src="https://res.cloudinary.com/dsfnyykw9/image/upload/v1601043061/vectorstock_31608808_og58qj.jpg" alt="img"/>
                    <div className="info">
                        <h2>Make it yours</h2>
                        <p>Make it feel like home for you and your team. Customize the board's appearance, organize your lists to fit the team's flow.</p>
                    </div>
                </section>
            </div>
        </div>
    )
}
