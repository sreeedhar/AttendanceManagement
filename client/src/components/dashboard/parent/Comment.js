import React, { useEffect, Fragment } from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import Spinner from '../../layout/Spinner'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const Comment = ({ faculty: { loading }, comment: { msg, from, createdAt }, auth: { user } }) => {

    return loading ? (
        <Spinner />
    ) : (
            <Fragment>
                <div>
                    <div className="comment-box">
                        <span className="commenter-pic">
                            <img src={require(`./${from}.jpeg`)} className="img-fluid" />
                        </span>
                        <span className="commenter-name">
                            <a href="#">{from}</a> <span className="comment-time"><Moment format="DD/MM/YYYY" >{createdAt}</Moment></span>
                        </span>
                        <p className="comment-txt more">{msg}</p>
                    </div>

                </div>
            </Fragment>

        )
}

Comment.propTypes = {
    faculty: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showActions: PropTypes.bool
};

const mapStateToProps = state => ({
    auth: state.auth,
    faculty: state.faculty
});

export default connect(
    mapStateToProps,
    null
)(Comment);
