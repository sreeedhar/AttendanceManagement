import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import { getCourses, getAttendance, getAvg } from '../../../actions/parent';
import { logout } from '../../../actions/auth';
import Card from './Card'
import Sidebar from './Sidebar'
import './style.css'

const ParentHome = ({ getAttendance, getAvg, getCourses, logout, parent: { loading, courses, avg }, auth: { user } }) => {
    console.log("HELLO");
    useEffect(() => {
        getCourses();
    }, [getCourses]);

    useEffect(() => {
        getAvg();
    }, [getAvg]);

    let percent = Math.ceil(avg.avg);


    return loading ? (
        <Spinner />
    ) : (

            <div className="grid-container">
                <div className="menu-icon">
                    <i className="fas fa-bars header__menu"></i>
                </div>

                <header className="header">
                    <div className="header__search"><img src={require("./SecondaryReversedLogo.png")} style={{ height: "3.5rem" }} alt="see" /></div>
                    <div className="header__logo">Attendance DashBoard</div>
                </header>

                <Sidebar user={user} />

                <main className="main">
                    <div className="container_head">
                        <div className="main-header">
                            <div className="main-header__heading">
                                <h1 style={{ fontSize: "40px", fontWeight: "750px" }}>{user.name} </h1>
                            </div>
                            <div className="main-header__updates">
                                <h2>{user.roll}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="main-overview" style={{ color: "white" }}>
                        {courses.map(course => (
                            <ul>
                                <Link to={`/parent/courses/${course.course}`}>
                                    <Card course={course} />
                                </Link>
                            </ul>


                        ))}
                    </div>


                    <br />
                    <br />

                    <div className="card">
                        <h2><b>Average Attendance Record</b></h2>
                        <h6>Number of classes attended till date : {avg.present}</h6>

                        <div className={`c100 p${percent}`}>
                            <span>{percent}%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>

                        </div>

                    </div>

                </main>

                <footer className="footer">
                    <div className="footer__copyright">&copy; June 2020</div>
                    <div className="footer__signature">The Ultimate Attendance Management Tool</div>
                </footer>



            </div>

        )

}


ParentHome.propTypes = {
    getCourses: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    getAttendance: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    getAvg: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    parent: state.parent,
    student: state.student,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getCourses, getAttendance, getAvg }
)(ParentHome);