import {
    GET_COURSE,
    GET_COURSES_STUDENT,
    POST_ERROR
} from '../actions/types';

const initialState = {
    posts: [],
    subjects: [],
    subject: null,
    post: null,
    loading: true,
    error: {}
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_COURSES_STUDENT:
            return {
                ...state,
                posts: payload,
                loading: false
            };

        case GET_COURSE:
            return {
                ...state,
                post: payload,
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