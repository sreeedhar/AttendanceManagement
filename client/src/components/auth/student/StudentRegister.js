import React, { useState } from 'react'
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../../actions/alert";
import { studentRegister } from '../../../actions/auth';
import PropTypes from "prop-types";

const StudentRegister = ({ setAlert, studentRegister, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        roll: '',
        dept: '',
        year: ''
    });

    const { name, email, password, roll, dept, year } = formData;



    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        console.log(formData);
        studentRegister({ name, email, password, roll, dept, year });
    };

    //if isAuthenticated
    if (isAuthenticated) {
        return <Redirect to='/student/courses' />
    }

    return (
        <div>
            <div className="modal-dialog text-center">
                <div className="col-sm-12 main-section">
                    <div className="modal-content">
                        <div className="col-12 user-img">
                        </div>
                        <form className="col-12" onSubmit={e => onSubmit(e)}>
                            <label className="reg-label">Enter your name :</label>
                            <div className="form-group">
                                <input type="text" className="form-control" name='name' placeholder="name" id="Username"
                                    value={name}
                                    onChange={e => onChange(e)}
                                />
                            </div>

                            <label className="reg-email">Enter your email :</label>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="email id" id="EmailID"
                                    name='email' value={email}
                                    onChange={e => onChange(e)} />
                            </div>
                            <label className="reg-pass">Enter Password :</label>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="password" id="Password"
                                    name='password' value={password}
                                    onChange={e => onChange(e)} />
                            </div>

                            <label className="reg-pass">Enter roll:</label>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="roll" id="roll"
                                    name='roll' value={roll}
                                    onChange={e => onChange(e)} />
                            </div>

                            <label className="reg-pass">Enter dept:</label>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="roll" id="roll"
                                    name='dept' value={dept}
                                    onChange={e => onChange(e)} />
                            </div>

                            <label className="reg-pass">Enter year:</label>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="year" id="year"
                                    name='year' value={year}
                                    onChange={e => onChange(e)} />
                            </div>

                            <button type="submit" className="btn btn-info">Register</button>
                        </form>

                        <div className="col-12 log">
                            <Link to='/student/login' style={{ color: "white" }}>Already registered? Click here to login!</Link>
                        </div>
                        <br />
                    </div>
                </div>
            </div>


        </div>
    )
}

StudentRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    studentRegister: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(
    mapStateToProps,
    { setAlert, studentRegister }
)(StudentRegister);
