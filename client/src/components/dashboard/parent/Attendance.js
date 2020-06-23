import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import Spinner from '../../layout/Spinner';
import { getAttendance, getCourses } from "../../../actions/parent";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from './Table'
import Sidebar from './Sidebar';

const ParentAttendance = ({ getAttendance, getCourses, parent: { attendance, courses }, auth: { user }, match }) => {

    useEffect(() => {
        getAttendance(match.params.course);

    }, [getAttendance, match.params.course]);

    useEffect(() => {
        getCourses();

    }, [getCourses]);

    let name;
    courses.map(record => {
        console.log("inside filter");
        if (record.course === match.params.course) name = record.faculty;
    })
    console.log(name);


    let present = 0;
    let total = 0;
    let last = attendance[attendance.length - 1];
    console.log(attendance);
    if (attendance)
        console.log(typeof (last));
    if (attendance.length > 0) {
        attendance.map(record => {
            total++;
            if (record.status === "Present")
                present++;
        })
    }

    let percent = Math.ceil(present * 100 / total);

    return attendance.length > 0 ? (
        <div className="grid-container">
            <Sidebar user={user} />
            <div>
                <h1 style={{ paddingLeft: "100px", paddingTop: "15px" }}>{match.params.course} - {name}</h1>
                <div className="main-cards">
                    <div className="card" style={{ color: "white" }}>
                        <h2>Average Attendance Record</h2>

                        <div className={`c100 p${percent} big`}>
                            <span>{percent}%</span>
                            <div className="slice">
                                <div className="bar"></div>
                                <div className="fill"></div>
                            </div>

                        </div>


                    </div>

                    {percent >= 75 ? <div className="card" style={{ backgroundColor: "green", color: "white" }}>
                        <h4><u>Eligibility (cut-off 75%):</u></h4>
                        <h1> Eligible </h1>
                    </div> : <div className="card" style={{ backgroundColor: "red", color: "white" }}>
                            <h4><u>Eligibility (cut-off 75%)</u></h4>
                            <h1> Not Eligible </h1>
                        </div>}


                </div>

                <table id="attendance-table" className="table table-bordered table-striped">
                    <thead className="thead-dark heading">
                        <tr>
                            <th className="student-table-header">S.No</th>
                            <th className="student-table-header">Student Roll</th>
                            <th className="student-table-header">Student Name</th>
                            <th className="student-table-header">Date</th>
                            <th className="student-table-header">Status</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">

                        {attendance.map((record, index) => (
                            < Table record={record} index={index + 1} />
                        )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
        :
        (
            <div className="grid-container">
                <Sidebar user={user} />
                <h1 style={{ paddingLeft: "100px", paddingTop: "15px" }}>{match.params.course} - {name}</h1>

                <h1 style={{ paddingLeft: "100px", paddingTop: "25px" }}>No records created for {match.params.course} yet.</h1>


            </div>
        )
}

ParentAttendance.propTypes = {
    getAttendance: PropTypes.func.isRequired,
    getCourses: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    student: state.student,
    parent: state.parent,
    auth: state.auth
});

export default connect(mapStateToProps, { getAttendance, getCourses })(ParentAttendance);
