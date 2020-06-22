import React, { Fragment, useEffect, useState } from 'react'
import './assignment.css';
import Comment from './Comment';
import Moment from 'react-moment';
import Spinner from '../../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Sidebar from './Sidebar'
import { getComments, addComment } from "../../../actions/faculty";


const FacChatPage = ({ addComment, getComments, faculty: { comments }, auth: { user }, match }) => {

    useEffect(() => {
        getComments(match.params.course, match.params.year);
    }, [getComments, match.params.year, match.params.course]);
    const [formData, setFormData] = useState({
        msg: ''
    });
    console.log(comments);
    const { msg } = formData;
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onCommentSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        addComment({ msg }, match.params.course, match.params.year);
    };


    return (
        <div className="grid-container">
            <div className="menu-icon">
                <i className="fas fa-bars header__menu"></i>
            </div>

            <header className="header">
                <div className="header__search"><img src={require("./SecondaryReversedLogo.png")} style={{ height: "3.5rem" }} alt="see" /></div>
                <div className="header__logo">Attendance DashBoard</div>
            </header>

            <Sidebar user={user} />


            <div>
                <div className="row">
                    <div className="col-12">
                        <div className="comments">

                            <div className="comment-box add-comment">
                                <span className="commenter-pic">
                                </span>
                                <span className="commenter-name">
                                    <div>
                                        <form onSubmit={e => onCommentSubmit(e)}>
                                            <input type="text" placeholder="Add a public comment" name="msg" value={msg} onChange={e => onChange(e)} />
                                            <button type="submit" className="btn btn-default col-lg-6">Comment</button>

                                        </form>
                                    </div>

                                </span>

                                <br />
                                <br />
                            </div>

                            {comments.length > 0 ?
                                comments.map(comment => (
                                    <ul>
                                        <Comment comment={comment} />
                                    </ul>

                                ))
                                :
                                <h2> No comments yet.</h2>
                            }
                        </div>
                    </div>
                </div>
            </div >

        </div>

    )
}

FacChatPage.propTypes = {
    getComments: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    faculty: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    student: state.student,
    faculty: state.faculty,
    auth: state.auth
});


export default connect(
    mapStateToProps,
    { addComment, getComments }
)(FacChatPage);
