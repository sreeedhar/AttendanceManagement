import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../../layout/Spinner';
import { getStudentAttendance } from "../../../actions/faculty";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DetailsRow from './DetailsRow'
import Sidebar from './Sidebar';

const StudentDetails = ({ getStudentAttendance, faculty: { studentRecords, courses }, auth: { user }, match }) => {

    useEffect(() => {
        getStudentAttendance(match.params.year, match.params.roll, match.params.course);
    }, [getStudentAttendance], match.params.course, match.params.roll, match.params.year);


    return studentRecords.length > 0 ? (
        <Fragment>
            <div className="grid-container">
                <Sidebar user={user} />

                <div>


                    <h1>Course: {match.params.course} </h1>x

                    <table id="attendance-table" className="table table-bordered table-striped">
                        <thead className="thead-dark heading">
                            <tr>
                                <th className="faculty-table-header">S.No</th>
                                <th className="faculty-table-header">Roll</th>
                                <th className="faculty-table-header">Name</th>
                                <th className="faculty-table-header">Date</th>
                                <th className="faculty-table-header">Status</th>
                                <th className="faculty-table-header">Edit</th>
                            </tr>
                        </thead>
                        <tbody id="myTable">

                            {studentRecords.map((record, index) => (
                                < DetailsRow record={record} index={index + 1} course={match.params.course} />
                            )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
        :
        (
            <div className="grid-container">
                <Sidebar user={user} />
                <h1>No records created for {match.params.course} yet.</h1>


            </div>
        )
}

StudentDetails.propTypes = {
    getStudentAttendance: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    faculty: state.faculty,
    auth: state.auth
});

export default connect(mapStateToProps, { getStudentAttendance })(StudentDetails);

