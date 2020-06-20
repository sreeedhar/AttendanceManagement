import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { loginFaculty, loadFaculty } from '../../../actions/auth';
import PropTypes from "prop-types";
import store from '../../../store';

const FacultyLogin = ({ setAlert, loginFaculty, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;



    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        loginFaculty(email, password);
    };

    //if isAuthenticated
    if (isAuthenticated) {
        return <Redirect to='/faculty/posts' />
    }

    return (
        <div class="modal-dialog text-center">
            <div class="col-sm-8 main-section">
                <div class="modal-content">
                    <div class="col-12 user-img">
                    </div>
                    <form class="col-12" onSubmit={e => onSubmit(e)}>
                        <div class="form-group">
                            <input type="text" class="form-control" placeholder="Enter username" name='email' value={email} onChange={e => onChange(e)} />
                        </div>
                        <div class="form-group-pass">
                            <input value={password} type="password" class="form-control" placeholder="Enter password" name='password' onChange={e => onChange(e)} />
                        </div>


                        <br />
                        <button type="submit" class="btn btn-info">Login</button>
                    </form>



                    <div class="col-12 reg">
                        <Link to='/faculty/register' style={{ color: "white" }}>Not an existing user? Click here to register!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

FacultyLogin.propTypes = {
    loginFaculty: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { setAlert, loginFaculty }
)(FacultyLogin);
