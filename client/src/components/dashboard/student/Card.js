import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

export const Card = ({ auth,
    course: { faculty, course } }) => {
    return (

        <div className="overviewcard">
            <div className="overviewcard__icon">
                <h4 style={{ color: "white" }}>{course}</h4>
            </div>
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
