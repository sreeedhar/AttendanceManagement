import React, { useState } from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { facultyRegister } from '../../../actions/auth';
import PropTypes from "prop-types";


const FacultyRegister = ({ facultyRegister, setAlert, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        dept: ''
    });

    const { email, password, name, dept } = formData;



    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        facultyRegister({ email, password, name, dept })
    };

    //if isAuthenticated
    if (isAuthenticated) {
        return <Redirect to='/faculty/posts' />
    }

    return (
        <div>
            <div className="modal-dialog text-center" id="register">
                <div className="col-sm-12 main-section">
                    <div className="modal-content">
                        <div className="col-12 user-img">
                        </div>
                        <form className="col-12" onSubmit={e => onSubmit(e)}>

                            <label className="reg-email"><b>Enter your email :</b></label>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="email id" id="EmailID"
                                    name='email' value={email}
                                    onChange={e => onChange(e)} />
                            </div>
                            <label className="reg-pass">Enter password :</label>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="password" id="Password"
                                    name='password' value={password}
                                    onChange={e => onChange(e)} />
                            </div>

                            <label className="reg-label">Enter your name :</label>
                            <div className="form-group">
                                <input type="text" className="form-control" name='name' placeholder="name" id="Username"
                                    value={name}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <label className="reg-pass">Enter course:</label>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="course" id="course"
                                    name='dept' value={dept}
                                    onChange={e => onChange(e)} />
                            </div>

                            <button type="submit" className="btn btn-info">Register</button>
                        </form>

                        <div className="col-12 log">
                            <Link to='/faculty/login' style={{ color: "white" }}>Already registered? Click here to login!</Link>
                        </div>
                        <br />
                    </div>
                </div>
            </div>


        </div>
    )
}

FacultyRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    facultyRegister: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(
    mapStateToProps,
    { setAlert, facultyRegister }
)(FacultyRegister);
