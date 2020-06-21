import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import { getCourses, } from '../../../actions/faculty';
import { logout } from '../../../actions/auth';
import Card from './Card'
import Sidebar from './Sidebar'
import './style.css'

const FacultyHome = ({ getCourses, logout, faculty: { loading, courses }, auth: { user } }) => {

    useEffect(() => {
        getCourses();
    }, [getCourses]);
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
                                <h1 style={{ fontWeight: "750px" }}>{user.name} </h1>
                                <h4 style={{ fontSize: "28" }}>{user.dept} department faculty</h4>
                            </div>
                        </div>
                    </div>

                    <div className="main-overview" style={{ color: "white" }}>
                        {courses.map(course => (
                            <ul>
                                <Link to={`/faculty/courses/${course.course}`}>
                                    <Card course={course} />
                                </Link>
                            </ul>
                        ))}
                    </div>


                </main>

                <footer className="footer">
                    <div className="footer__copyright">&copy; June 2020</div>
                    <div className="footer__signature">The Ultimate Attendance Management Tool</div>
                </footer>



            </div>

        )

}


FacultyHome.propTypes = {
    getCourses: PropTypes.func.isRequired,
    faculty: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    faculty: state.faculty,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getCourses, }
)(FacultyHome);