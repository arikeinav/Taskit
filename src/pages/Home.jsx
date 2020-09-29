import React from 'react'
import { Link } from 'react-router-dom'




export function Home() {
    return (
        <div>
            <div className="home flex column align-center justify-center">
            <Link className="enter flex" to="/board"><p>Enter</p></Link>
        <img src="https://res.cloudinary.com/dib9frb0w/image/upload/v1601370863/kanban5_wdldql.jpg" alt=""/>
            
            </div>
            <div className="home-details-container">
              
                <div className="home-details flex">
                    <img src="https://res.cloudinary.com/dsfnyykw9/image/upload/v1601040007/vectorstock_25716430_e79vvh.jpg" alt="img"/>
                    <div className="info">
                        <h2>Efficient Organizing Tool</h2>
                        <p>Taskit provides the upmost efficient platform to architecte your work time table. Allow us to help you do, What You Do, Better! </p>
                    </div>
                </div >

                
                <div  className="home-details second  flex">
                    <div className="info">
                        <h2>Manage your Performance</h2>
                        <p>Be it your mobile phone, tablet or desktop computer, team leaders are now able to supervise their team's effort, gain a closer look at the team's work-progress, delegate authority to team members and manage the project more effectively</p>
                    </div>
                    <img src="https://res.cloudinary.com/dsfnyykw9/image/upload/v1601042641/vectorstock_29242780_wd2ele.jpg" alt="img"/>
                </div >

                <div  className="home-details flex">
                    <img src="https://res.cloudinary.com/dsfnyykw9/image/upload/v1601043061/vectorstock_31608808_og58qj.jpg" alt="img"/>
                    <div className="info">
                        <h2>Make it yours</h2>
                        <p>Make it feel like home for you and your team. Customize the board's design, organize your lists to fit the team's flow. Taskit, along with its many features allow an accesible and flexible design to all.</p>
                    </div>
                </div >
            </div>
        </div>
    )
}
