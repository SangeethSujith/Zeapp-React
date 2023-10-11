import mainLogo from '../../assets/zeapp-logo.png';
const Login = () => {
    return (
        <>
            <header>
                <div className="logo"><a href=""><img src="../../../src/assets/zeapp-logo.png" alt="zeapp-Logo.png"/></a> </div>

                <nav className="menu">
                    <ul>
                        <li><a href="" className="active">Home</a></li>
                        <li><a href="">Report</a></li>
                        <li><a href="">Notification</a></li>
                        <li><a href="">Profile</a></li>
                        <li><a href="">Logout</a></li>
                    </ul>
                </nav>
                <button className="burger-button">&#9776;</button>
                <nav className="main-menu">
                    <ul>
                        <li><a href="" className="active">Home</a></li>
                        <li><a href="">Report</a></li>
                        <li><a href="">Notification</a></li>
                        <li><a href="">Profile</a></li>
                        <li><a href="">Logout</a></li>
                    </ul>
                </nav>
            </header>
            <section className="main-section">
                <div className="main-head">
                    {/* <!-- <h1 className="page-header" style="width:100%;">Login</h1> --> */}
                </div>
                <div id="login" className="login-container">
                    <div className="login-card">
                        <div className="close-btn">
                            <span className="close-button" >&times;</span>
                        </div>
                        <form className="login-form">
                            <div className="login-card-head">
                                <h1>Login</h1>
                            </div>
                            <input type="text" className="login-input" placeholder="Username"/>
                                <div className="incorrect" style={{ display: "none" }}>
                                    Incorrect username
                                </div>
                                <input type="password" className="login-input" placeholder="Password"/>
                                    <div className="incorrect" style={{ display: "none" }}>
                                        Incorrect password
                                    </div>
                                    <div className="forgot-pswd">
                                        <a href="">Forgot password</a>
                                    </div>
                                    <button type="submit" className="login-button">Login</button>
                                </form>
                            </div>
                    </div>
            </section>
            <div className="footer">
                <div className="footer-logo"><a href=""><img src={mainLogo} alt="zeapp-Logo" /></a> </div>
                <ul className="footer-menu">
                    <li><a href="" className="active">Home</a></li>
                    <li><a href="">Report</a></li>
                    <li><a href="">Notification</a></li>
                    <li><a href="">Profile</a></li>
                    <li><a href="">Logout</a></li>
                </ul>
                <div className="app-buttons">
                    <button className="app-button">Download on Play Store</button>
                    <button className="app-button">Download on App Store</button>
                </div>
            </div>
            <div className="footer2">
                &copy; 2023 Zeapp All Rights Reserved.
            </div>
        </>
    )
}

export default Login