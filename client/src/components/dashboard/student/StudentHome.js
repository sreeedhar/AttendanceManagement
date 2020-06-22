import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import { getCourses, getAttendance, getAvg } from '../../../actions/student';
import { logout } from '../../../actions/auth';
import Card from './Card'
import Sidebar from './Sidebar'
import './style.css'
import LineChart from './Line Chart';

const StudentHome = ({ getAvg, getAttendance, getCourses, logout, student: { loading, courses, avg }, auth: { user } }) => {

    useEffect(() => {
        getCourses();
    }, [getCourses]);

    useEffect(() => {
        getAvg();
    }, [getAvg]);

    let percent = Math.ceil(avg.avg);

    let ongoing = courses.filter(course => {
        if (course.archived == 0) return course;
    });


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
                                <h4>{user.dept}{user.year} </h4>
                            </div>
                            <div className="main-header__updates">
                                <h2>{user.roll}</h2>
                            </div>
                        </div>
                    </div>

                    <h1 style={{ paddingLeft: "26px" }}>Ongoing courses: </h1>
                    <div className="main-overview" style={{ color: "white" }}>

                        {ongoing.map(course => (

                            <Card course={course} />


                        ))}
                    </div>

                    <br />
                    <br />


                    <div className="card">
                        <h2><b>Average Attendance Record</b></h2>
                        <h6>Number of classes attended till date : {avg.present}</h6>
                        <div className={`c100 p${percent}`}>
                            <span><b>{percent}%</b></span>
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


StudentHome.propTypes = {
    getCourses: PropTypes.func.isRequired,
    getAvg: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    getAttendance: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    student: state.student,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getCourses, getAttendance, getAvg }
)(StudentHome);