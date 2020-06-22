import { combineReducers } from "redux";
import alert from './alert';
import auth from './auth';
import faculty from './faculty';
import student from './student';
import parent from './parent';

export default combineReducers({
    alert,
    auth,
    faculty,
    student,
    parent

});