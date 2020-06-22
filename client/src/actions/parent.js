import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_COURSES_STUDENT,
    GET_COURSE,
    POST_ERROR,
    GET_ATTENDANCE,
    GET_COMMENTS,
    ADD_COMMENT,
    GET_AVG
} from './types';


// Get subjects
export const getCourses = () => async dispatch => {
    try {
        const res = await axios.get('/api/parent/courses');

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

// Get attendance for a course
export const getAvg = (course) => async dispatch => {
    try {
        const res = await axios.get(`/api/parent/attendance`);

        dispatch({
            type: GET_AVG,
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
        const res = await axios.get('/api/parent/courses/:course');

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
        const res = await axios.get(`/api/parent/attendance/${course}`);

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

// Get comment
export const getComments = (course, year) => async dispatch => {
    try {
        const res = await axios.get(`/api/parent/chat/${course}/${year}`);

        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

// Add post
export const addComment = (formData, course, year) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log("WORKS");
    try {
        const res = await axios.post(`/api/parent/chat/${course}/${year}`, formData, config);
        console.log("FIRING");
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        });

        dispatch(setAlert('Comment Created', 'success'));
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response, status: err.response.status }
        });
    }
};