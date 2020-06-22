import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

export const Card = ({ auth,
    course: { faculty, course } }) => {
    return (

        <div className="overviewcard">
            <Link to={`/student/courses/${course}`}><h2 style={{ color: "white", textAlign: "center" }}>{course}</h2></Link>
        </div>




    )
}

Card.propTypes = {
    student: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showActions: PropTypes.bool
};

const mapStateToProps = state => ({
    auth: state.auth,
    student: state.student
});

export default connect(
    mapStateToProps,
    null
)(Card);
