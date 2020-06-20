import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



//Components
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing/Landing';
import StudentLogin from './components/auth/student/StudentLogin';
import StudentRegister from './components/auth/student/StudentRegister';
import FacultyLogin from './components/auth/faculty/FacultyLogin';
import FacultyRegister from './components/auth/faculty/FacultyRegister';
import ParentLogin from './components/auth/parent/ParentLogin';
import ParentRegister from './components/auth/parent/ParentRegister';

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
            <Route exact path='/faculty/register' component={FacultyRegister} />
            <Route exact path='/faculty/login' component={FacultyLogin} />
            <Route exact path='/student/login' component={StudentLogin} />
            <Route exact path='/student/register' component={StudentRegister} />
            <Route exact path='/parent/login' component={ParentLogin} />
            <Route exact path='/parent/register' component={ParentRegister} />
          </Switch>

        </Fragment>
      </Router>
    </Provider>

  );
}

export default App;
