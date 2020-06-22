import React, { useEffect } from 'react'
import '../../../App.css'
import { Link } from 'react-router-dom'

export const Landing = () => {

    return (
        <div data-spy="scroll" data-target="#navbarResponsive">
            <div id="home">

                <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <a className="navbar-brand" href="index.html">
                        <img src={require("./SecondaryReversedLogo.png")} />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#features">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="landing">
                    <div className="home-wrap">
                        <div className="home-inner">
                            <div className="home-bg">

                            </div>

                        </div>
                    </div>
                </div>
                <div className="caption text-center" style={{ textAlign: "center" }}>
                    <h1>Welcome to iiitdm's <br />web-based attendance management system</h1>
                    <h3></h3>
                    <Link className="btn btn-outline-light btn-lg" to="/login">Get Started</Link>
                </div>


            </div>


            <div id="features" className="offset">
                <div className="white-section">
                    <div className="narrow">
                        <div className="col-12">
                            <h3 className="heading">Features</h3>
                            <div className="heading-underline"></div>

                            <div className="row text-center">
                                <div className="col-md-4">
                                    <div className="feature">
                                        <i className="fas fa-stream fa-4x" data-fa-transform="shrink-4.15 up-4.5"></i>
                                        <h3>Real-time Monitoring </h3>
                                        <p>Provides convenient and real-time monitoring of the student's attendance</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="feature">
                                        <i className="fas fa-archive fa-4x" data-fa-transform="shrink-3 up-5"></i>
                                        <h3>Attendance Archive</h3>
                                        <p>Provides a record archival policy. The attendance records will be archived after the
                                    student has graduated.</p>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="feature">
                                        <i className="fas fa-user-shield fa-4x" data-fa-transform="shrink-3 up-5"></i>
                                        <h3>Parental View</h3>
                                        <p>The student's attendance status can be monitored by their respective parents.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="jumbotron" id="team">
                <br /><br />

                <div className="row">
                    <div className="feature-box col-lg-4">
                        <img className="team-image" src={require("./sreedhar.jpeg")} alt="Sreedhar pic" />
                        <h3 className="team-name">Sreedhar Arumugam</h3>
                    </div>
                    <div className="feature-box col-lg-4">
                        <img className="team-image" src={require("./pratyush.jpeg")} alt="Pratyush pic" />
                        <h3 className="team-name">Pratyush VM</h3>
                    </div>
                    <div className="feature-box col-lg-4">
                        <img className="team-image" src={require("./viknesh.jpeg")} alt="Viknesh pic" />
                        <h3 className="team-name">Viknesh Rajaramon</h3>
                    </div>
                    <div className="feature-box col-lg-4">
                        <img className="team-image" src={require("./balajee.jpeg")} alt="Balajee pic" />
                        <h3 className="team-name">Balajee D</h3>
                    </div>
                    <div className="feature-box col-lg-4">
                        <img className="team-image" src={require("./bavesh.jpeg")} alt="Bavesh pic" />
                        <h3 className="team-name">Bavesh Balaji</h3>
                    </div>
                    <div className="feature-box col-lg-4">
                        <img className="team-image" src={require("./bv.jpeg")} alt="BV pic" />
                        <h3 className="team-name">B Vignesh</h3>
                    </div>

                </div>

            </section>




            <div id="contact" className="offset">
                <footer>
                    <div className="row justify-content-center">
                        <div className="col-md-5 text-center">
                            <img src={require("./SecondaryReversedLogo.png")} /> <br />
                            <strong>Contact info</strong>
                            <br />
                            <p>Vandalur-Kelambakkam Road,
                            Chennai: 600127.
                        <br /><i className="fas fa-phone "></i> +91-44-2747 6300 | <i className="fas fa-print"></i> +91-44-2747
                        6301.
                        <br />
                                <i className="fas fa-envelope"></i> office@iiitdm.ac.in</p>
                        </div>
                    </div>
                </footer>
            </div>

        </div>
    );
}

export default Landing;