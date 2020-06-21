import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_COURSES_STUDENT,
    GET_COURSE,
    POST_ERROR,
    GET_ATTENDANCE,
    GET_COURSES_FACULTY,
    GET_STUDENTS,
    MARK,
    GET_STUDENT_ATTENDANCE
} from './types';


// Get subjects
export const getCourses = () => async dispatch => {
    try {
        const res = await axios.get('/api/faculty/courses');

        dispatch({
            type: GET_COURSES_FACULTY,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
};


// Get attendance for a course
export const getAttendance = (course) => async dispatch => {
    try {
        const res = await axios.get(`/api/faculty/students/${course}`);

        dispatch({
            type: GET_ATTENDANCE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
};


// Get attendance for a course
export const getStudents = (year) => async dispatch => {
    try {
        const res = await axios.get(`/api/faculty/students/${year}`);

        dispatch({
            type: GET_STUDENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
};

// Get attendance for a course
export const getStudentAttendance = (year, roll, course) => async dispatch => {
    try {
        const res = await axios.get(`/api/faculty/attendance/${year}/${roll}/${course}`);

        dispatch({
            type: GET_STUDENT_ATTENDANCE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
};


// Get attendance for a course
export const markAttendance = (year, roll, course, { date, status }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const formData = JSON.stringify({ date, status });

    try {
        const res = await axios.post(`/api/faculty/attendance/${year}/${roll}/${course}`, formData, config);
        console.log("FIRING");
        dispatch({
            type: MARK,
            payload: res.data
        });

        dispatch(setAlert('Attendance marked', 'success'));

    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
};