import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import Spinner from '../../layout/Spinner';
import { getAttendance } from "../../../actions/student";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from './Table'
import Sidebar from './Sidebar';

const StudentAttendance = ({ getAttendance, student: { attendance }, auth: { user }, match }) => {

    useEffect(() => {
        getAttendance(match.params.course);

    }, [getAttendance, match.params.course]);

    let present = 0;
    let total = 0;
    console.log(attendance);
    if (attendance.length > 0) {
        attendance.map(record => {
            total++;
            if (record.status === "Present")
                present++;
        })
    }

    let percent = present * 100 / total;

    return attendance.length > 0 ? (
        <div className="grid-container">
            <Sidebar user={user} />
            <div>
                <h1>Course: {match.params.course} </h1>

                <h3>
                    {present}
                    <br />
                    {percent}
                </h3>
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
                <h1>No records created for {match.params.course} yet.</h1>


            </div>
        )
}

StudentAttendance.propTypes = {
    getAttendance: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    student: state.student,
    auth: state.auth
});

export default connect(mapStateToProps, { getAttendance })(StudentAttendance);
