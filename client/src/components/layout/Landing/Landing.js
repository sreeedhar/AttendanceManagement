import React, { useEffect } from 'react'
import '../../../App.css'
import { Link } from 'react-router-dom'

export const Landing = () => {

    return (
        <div data-spy="scroll" data-target="#navbarResponsive">
            <div id="home">

                <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                    <a class="navbar-brand" href="index.html">
                        <img src={require("./SecondaryReversedLogo.png")} />
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="#home">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#features">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div class="landing">
                    <div class="home-wrap">
                        <div class="home-inner">
                            <div class="home-bg">

                            </div>

                        </div>
                    </div>
                </div>
                <div class="caption text-center" style={{ textAlign: "center" }}>
                    <h1>Welcome to iiitdm's <br />web-based attendance management system</h1>
                    <h3></h3>
                    <Link class="btn btn-outline-light btn-lg" to="/login">Get Started</Link>
                </div>


            </div>


            <div id="features" class="offset">
                <div class="white-section">
                    <div class="narrow">
                        <div class="col-12">
                            <h3 class="heading">Features</h3>
                            <div class="heading-underline"></div>

                            <div class="row text-center">
                                <div class="col-md-4">
                                    <div class="feature">
                                        <i class="fas fa-stream fa-4x" data-fa-transform="shrink-4.15 up-4.5"></i>
                                        <h3>Real-time Monitoring </h3>
                                        <p>Provides convenient and real-time monitoring of the student's attendance</p>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="feature">
                                        <i class="fas fa-archive fa-4x" data-fa-transform="shrink-3 up-5"></i>
                                        <h3>Attendance Archive</h3>
                                        <p>Provides a record archival policy. The attendance records will be archived after the
                                    student has graduated.</p>
                                    </div>
                                </div>

                                <div class="col-md-4">
                                    <div class="feature">
                                        <i class="fas fa-user-shield fa-4x" data-fa-transform="shrink-3 up-5"></i>
                                        <h3>Parental View</h3>
                                        <p>The student's attendance status can be monitored by their respective parents.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section class="jumbotron" id="team">
                <br /><br />
                <h2 class="contact-title">Our Team</h2>
                <div class="row">
                    <div class="feature-box col-lg-4">
                        <img class="team-image" src={require("./sreedhar.jpeg")} alt="Sreedhar pic" />
                        <h3 class="team-name">Sreedhar Arumugam</h3>
                    </div>
                    <div class="feature-box col-lg-4">
                        <img class="team-image" src={require("./pratyush.jpeg")} alt="Pratyush pic" />
                        <h3 class="team-name">Pratyush VM</h3>
                    </div>
                    <div class="feature-box col-lg-4">
                        <img class="team-image" src={require("./viknesh.jpeg")} alt="Viknesh pic" />
                        <h3 class="team-name">Viknesh Rajaramon</h3>
                    </div>
                    <div class="feature-box col-lg-4">
                        <img class="team-image" src={require("./balajee.jpeg")} alt="Balajee pic" />
                        <h3 class="team-name">Balajee D</h3>
                    </div>
                    <div class="feature-box col-lg-4">
                        <img class="team-image" src={require("./bavesh.jpeg")} alt="Bavesh pic" />
                        <h3 class="team-name">Bavesh Balaji</h3>
                    </div>
                    <div class="feature-box col-lg-4">
                        <img class="team-image" src={require("./bv.jpeg")} alt="BV pic" />
                        <h3 class="team-name">B Vignesh</h3>
                    </div>

                </div>

            </section>




            <div id="contact" class="offset">
                <footer>
                    <div class="row justify-content-center">
                        <div class="col-md-5 text-center">
                            <img src={require("./SecondaryReversedLogo.png")} /> <br />
                            <strong>Contact info</strong>
                            <br />
                            <p>Vandalur-Kelambakkam Road,
                            Chennai: 600127.
                        <br /><i class="fas fa-phone "></i> +91-44-2747 6300 | <i class="fas fa-print"></i> +91-44-2747
                        6301.
                        <br />
                                <i class="fas fa-envelope"></i> office@iiitdm.ac.in</p>
                        </div>
                    </div>
                </footer>
            </div>

        </div>
    );
}

export default Landing;