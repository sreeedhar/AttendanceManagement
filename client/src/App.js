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

//Student view
import StudentHome from './components/dashboard/student/StudentHome';


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
          </Switch>

        </Fragment>
      </Router>
    </Provider>

  );
}

export default App;
