import {
    GET_COURSE,
    GET_COURSES_FACULTY,
    POST_ERROR,
    GET_ATTENDANCE,
    GET_STUDENTS,
    MARK,
    GET_STUDENT_ATTENDANCE
} from '../actions/types';

const initialState = {
    attendance: [],
    studentRecords: [],
    courses: [],
    students: [],
    course: null,
    post: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_COURSES_FACULTY:
            return {
                ...state,
                courses: payload,
                loading: false
            };
        case GET_ATTENDANCE:
            return {
                ...state,
                attendance: payload,
                loading: false
            };

        case GET_STUDENT_ATTENDANCE:
            return {
                ...state,
                studentRecords: payload,
                loading: false
            };

        case GET_STUDENTS:
            return {
                ...state,
                students: payload,
                loading: false
            };
        case GET_COURSE:
            return {
                ...state,
                course: payload,
                loading: false
            };

        case MARK:
            return {
                ...state,
                attendance: [payload, ...state.attendance],
                loading: false
            };

        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };


        default:
            return state;
    }
}