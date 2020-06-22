import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';



//Components

//Authentication
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing/Landing';
import StudentLogin from './components/auth/student/Login';
import FacultyLogin from './components/auth/faculty/Login';
import ParentLogin from './components/auth/parent/Login';

//Parent view
import ParentHome from './components/dashboard/parent/StudentHome';
import ParentAttendance from './components/dashboard/parent/Attendance'
import ParentRoom from './components/dashboard/parent/Room'
import ParentChatpage from './components/dashboard/parent/Chatpage'

//Student view
import StudentHome from './components/dashboard/student/StudentHome';
import StudentAttendance from './components/dashboard/student/Attendance'
import StuRoom from './components/dashboard/student/Room'
import StuChatpage from './components/dashboard/student/Chatpage'

//Faculty view
import FacultyHome from './components/dashboard/faculty/FacultyHome';
import FacultyAttendance from './components/dashboard/faculty/Attendance'
import StudentDetails from './components/dashboard/faculty/StudentDetails'
import FacRoom from './components/dashboard/faculty/Room'
import FacChatpage from './components/dashboard/faculty/Chatpage'
import CreatePage from './components/dashboard/faculty/CreatePage'
import Archive from './components/dashboard/faculty/Archive'

// Redux
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from './store';
import Choose from './components/auth/Choose';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <Alert />
          <Switch>
            <Route exact path='/login' component={Choose} />
            <Route exact path='/register' component={Choose} />
            <Route exact path='/faculty/login' component={FacultyLogin} />
            <Route exact path='/student/login' component={StudentLogin} />
            <Route exact path='/parent/login' component={ParentLogin} />
            <PrivateRoute exact path='/student/courses' component={StudentHome} />
            <PrivateRoute exact path='/parent/courses' component={ParentHome} />
            <PrivateRoute exact path='/student/courses/:course' component={StudentAttendance} />
            <PrivateRoute exact path='/faculty/courses' component={FacultyHome} />
            <PrivateRoute exact path='/faculty/chat' component={FacRoom} />
            <PrivateRoute exact path='/student/chat' component={StuRoom} />
            <PrivateRoute exact path='/parent/chat' component={ParentRoom} />
            <PrivateRoute exact path='/faculty/courses/:course' component={FacultyAttendance} />
            <PrivateRoute exact path='/parent/courses/:course' component={ParentAttendance} />
            <PrivateRoute exact path='/faculty/attendance/:course/:roll/:year' component={StudentDetails} />
            <PrivateRoute exact path='/faculty/chat/:course/:year' component={FacChatpage} />
            <PrivateRoute exact path='/student/chat/:course/:year' component={StuChatpage} />
            <PrivateRoute exact path='/parent/chat/:course/:year' component={ParentChatpage} />
            <PrivateRoute exact path='/faculty/create' component={CreatePage} />
            <PrivateRoute exact path='/faculty/archives' component={Archive} />

          </Switch>

        </Fragment>
      </Router>
    </Provider>

  );
}

export default App;
