import React from 'react'
const Main = React.forwardRef((props,ref)=>{
    const email = "officialuniconnect@gmail.com"; // Company email address
    const subject = "Inquiry about services";
    const body = "Hello,\n\nI would like to know more about your services.\n\nBest regards,\n[Your Name]";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return(
        <div ref={ref} className="main">
            <div id="overlay">
                <h1 className='animated-text'>Welcome to Renty</h1>
                <p className='smallanimated-text'>Connecting Students with Affordable Housing Near Their Universities</p>
                <div className="contact-learn">
                    <a href={mailtoLink} className='contact-btn'>Contact Us</a>
                    <a className='contact-btn'>LearnMore</a>
                </div>
            </div>
        </div>
    )
});
export default Main;