import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import { getCourses, } from '../../../actions/student';
import { logout } from '../../../actions/auth';
import Card from './Card'
import Sidebar from './Sidebar'
import './style.css'


const StuRoom = ({ getCourses, logout, student: { loading, courses }, auth: { user } }) => {
    useEffect(() => {
        getCourses();
    }, [getCourses]);

    let ongoing = courses.filter(course => {
        if (course.archived == 0) return course;
    });


    return loading ? (
        <Spinner />
    ) : (
            <div className="grid-container">
                <header className="header">
                    <div className="header__search"><img src={require("./SecondaryReversedLogo.png")} style={{ height: "3.5rem" }} alt="see" /></div>
                    <div className="header__logo">Attendance DashBoard</div>
                </header>

                <Sidebar user={user} />

                <main className="main">
                    <h1 style={{ marginLeft: "100px", marginTop: "20px" }}>Chatrooms: </h1>

                    <div className="main-overview" style={{ color: "white" }}>
                        {ongoing.map((course, i) => (
                            <Link to={`/student/chat/${course.course}/${course.year}`}>

                                <Card course={course} />

                            </Link>))}
                    </div>



                </main>
            </div>
        )
}

StuRoom.propTypes = {
    getCourses: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    student: state.student,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getCourses, }
)(StuRoom);
