import React, { useEffect } from 'react'
import '../../../App.css'
import { Link } from 'react-router-dom'

export const Landing = () => {

    return (
        <div className="landing">
            <section className="colored-section" id="title">

                <div className="container-fluid">

                    <div className="row">

                        <div className="col-lg-6">
                            <h1 style={{ fontWeight: 800 }} className="big-heading"><b> The #1 online classroom assessment and resource quid pro quo.</b></h1>
                            <h2 style={{ fontWeight: 300 }} className="caption"><b>Turning in assignments or exchanging resources between students and faculty has never been more easier.</b></h2>

                        </div>

                        <div className="col-lg-6">
                            <img className="title-image" alt="title-image-mockup" />
                        </div>

                    </div>

                </div>
            </section>

            <section className="white-section" id="features">
                <div className="container-fluid">
                    <div className="row">
                        <div className="feature-box col-lg-4">
                            <i className="icon fas fa-check-circle fa-4x"></i>
                            <h3 style={{ color: "black" }} className="feature-title">Easy to use.</h3>
                            <p style={{ color: "#8f8f8f" }}>Simple and super-fast transfer between students and faculty.</p>
                        </div>
                        <div className="feature-box col-lg-4">
                            <i className="icon fas fa-file-code fa-4x"></i>
                            <h3 style={{ color: "black" }} className="feature-title">Simple code-sharing process.</h3>
                            <p style={{ color: "#8f8f8f" }}>Code submission for evaluation, without any hassles.</p>

                        </div>
                        <div className="feature-box col-lg-4">
                            <i className="icon fas fa-stopwatch fa-4x"></i>
                            <h3 style={{ color: "black" }} className="feature-title">Track submission times.</h3>
                            <p style={{ color: "#8f8f8f" }}>Keep track of deadlines, all in one place. </p>
                        </div>
                        <div className="feature-box col-lg-4">
                            <i className="icon fas fa-archive fa-4x"></i>
                            <h3 style={{ color: "black" }} className="feature-title">Maintain archives.</h3>
                            <p style={{ color: "#8f8f8f" }}>Save your submissions and notes for later reference. </p>
                        </div>
                        <div className="feature-box col-lg-4">
                            <i className="icon fas fa-comments fa-4x"></i>
                            <h3 style={{ color: "black" }} className="feature-title">Elegant Comment threads.</h3>
                            <p style={{ color: "#8f8f8f" }}>For collective learning to take place. </p>
                        </div>
                        <div className="feature-box col-lg-4">
                            <i className="icon fas fa-shield-alt fa-4x"></i>
                            <h3 style={{ color: "black" }} className="feature-title">Safety of data ensured.</h3>
                            <p style={{ color: "#8f8f8f" }}>Gone are the days of plagiarism and data-theft. Your files cannot be more safer.</p>
                        </div>

                    </div>
                </div>

            </section>


            <section className="colored-section" id="testimonial">
                <br /><br />
                <h1 className="testimonial-head">What our customers are saying...</h1>

                <div id="testimonial-carousel" className="carousel slide" data-ride="false">
                    <div className="carousel-inner">
                        <div className="carousel-item active container-fluid">
                            <h2 className="testimonial-text"><em>"StudyBuddy helps me evaluate assignments from the comfort of my home."</em></h2>
                            <img className="testimonial-image" alt="sir-profile" />
                            <em>Dr.Jagadeesh Kakarla, Professor</em>
                        </div>
                        <div className="carousel-item container-fluid">
                            <h2 className="testimonial-text"><em>"StudyBuddy is the buddy in school I never had."</em></h2>
                            <img className="testimonial-image" alt="lokesh-profile" />
                            <em>Lokeshwer, Student</em>
                        </div>
                        <div className="carousel-item container-fluid">
                            <h2 className="testimonial-text"><em>"I use StudyBuddy to refer to all notes I have ever been sent. Its a lifesaver before exams!"</em></h2>
                            <img className="testimonial-image" alt="sam-profile" />
                            <em>Samrat, Student</em>
                        </div>

                    </div>
                    <a className="carousel-control-prev" href="#testimonial-carousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#testimonial-carousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
                <br />
                <br />
                <br />
                <br />

            </section>


            <section className="white-section" id="team">
                <br /><br />
                <h2 className="testimonial-head">Our Team</h2>
                <p style={{ color: "#8f8f8f" }}>The minds at work behind StudyBuddy.</p>
                <div className="row">
                    <div className="feature-box col-lg-4">
                        <img className="team-image" alt="Sreedhar pic" />
                        <h3 style={{ color: "black" }} className="team-name">Sreedhar Arumugam</h3>
                        <p style={{ color: "#8f8f8f" }}>Founder, StudyBuddy</p>
                    </div>
                    <div className="feature-box col-lg-4">
                        <img className="team-image" alt="Pratyush pic" />
                        <h3 style={{ color: "black" }} className="team-name">Pratyush VM</h3>
                        <p style={{ color: "#8f8f8f" }}>CEO, StudyBuddy</p>
                    </div>
                    <div className="feature-box col-lg-4">
                        <img className="team-image" alt="Viknesh pic" />
                        <h3 style={{ color: "black" }} className="team-name">Viknesh Rajaramon</h3>
                        <p style={{ color: "#8f8f8f" }}>COO, StudyBuddy</p>
                    </div>
                    <div className="feature-box col-lg-4">
                        <img className="team-image" alt="Balajee pic" />
                        <h3 style={{ color: "black" }} className="team-name">Balajee D</h3>
                        <p style={{ color: "#8f8f8f" }}>CFO, StudyBuddy</p>
                    </div>
                    <div className="feature-box col-lg-4">
                        <img className="team-image" alt="Bavesh pic" />
                        <h3 style={{ color: "black" }} className="team-name">Bavesh Balaji</h3>
                        <p style={{ color: "#8f8f8f" }}>CDO, StudyBuddy</p>
                    </div>
                    <div className="feature-box col-lg-4">
                        <img className="team-image" t="BV pic" />
                        <h3 style={{ color: "black" }} className="team-name">B Vignesh</h3>
                        <p style={{ color: "#8f8f8f" }}>MD, StudyBuddy</p>
                    </div>
                </div>

            </section>


            <section className="container-fluid colored-section" id="cta">

                <h4 className="big-heading1">Get your hands on the ultimate companion to remote classroom operations.</h4>
                <Link to='/login' ><button type="button" className="download-button btn btn-lg btn-dark"><i className="fas fa-sign-in-alt"></i>  Login   </button></Link>
                <Link to='/register' > <button type="button" className="download-button btn btn-lg btn-dark"><i className="fas fa-plus-square"></i>  Register   </button></Link>
            </section>


            <section className="white-section" id="footer">
                <i className="social-icon fab fa-facebook-f"></i>
                <i className="social-icon fab fa-github"></i>
                <i className="social-icon fab fa-instagram"></i>
                <i className="social-icon fas fa-envelope"></i>
                <p style={{ color: "#8f8f8f" }}>© Copyright 2020 StudyBuddy</p>
                <br />
            </section>

        </div>


    )
}

export default Landing;