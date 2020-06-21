import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_COURSES_STUDENT,
    GET_COURSE,
    POST_ERROR,
    GET_ATTENDANCE
} from './types';


// Get subjects
export const getCourses = () => async dispatch => {
    try {
        const res = await axios.get('/api/student/courses');

        dispatch({
            type: GET_COURSES_STUDENT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response }
        });
    }
};


// Get subjects
export const getCourse = () => async dispatch => {
    try {
        const res = await axios.get('/api/student/courses/:course');

        dispatch({
            type: GET_COURSE,
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
        const res = await axios.get(`/api/student/attendance/${course}`);

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