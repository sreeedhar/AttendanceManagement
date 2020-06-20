import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../../layout/Spinner';
import { connect } from 'react-redux';
import { getCourses } from '../../../actions/student';

const StudentHome = ({ getCourses, student: { loading, courses }, auth: { user } }) => {

    useEffect(() => {
        getCourses();
    }, [getCourses]);


    (user ? console.log(courses) : console.log('nothing'));

    return loading ? (
        <Spinner />
    ) : (
            <Fragment>

                <br />

                <div className="center-text">
                    {(user ? <Fragment><h1 className="alignleft" style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: 50 }}> <b> Welcome, {user.name}</b> </h1></Fragment> : console.log('nothing'))}
                    <hr />
                    {(user ? <Fragment><h1 style={{ fontFamily: "Montserrat", fontWeight: 900, fontSize: 65 }}> <b> {user.coursename}</b> </h1></Fragment> : console.log('nothing'))}
                    <h1 style={{ fontFamily: "Montserrat", fontSize: 50, fontWeight: 400 }}><b>All courses: </b> </h1>

                    <br />
                    {courses.length > 0 ? courses.map((course, i) => (

                        <div class="container" style={{ marginTop: "10 %" }}>
                            <ul key={`${course.faculty}_${course.course}`}>
                                {course.course} <br />
                                {course.faculty}


                            </ul>


                        </div>

                    ))
                        :
                        <h2> No courses yet.</h2>
                    }

                </div>
            </Fragment>
        )

}


StudentHome.propTypes = {
    getCourses: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    student: state.student,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getCourses }
)(StudentHome);
