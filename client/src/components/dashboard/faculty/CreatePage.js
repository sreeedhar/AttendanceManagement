import React from 'react'
import PropTypes from 'prop-types'
import Sidebar from './Sidebar'
import CreateCourse from './CreateCourse'
import { connect } from 'react-redux';

const CreatePage = ({ auth: { user } }) => {
    return (
        <div className="grid-container">
            <div className="menu-icon">
                <i className="fas fa-bars header__menu"></i>
            </div>

            <header className="header">
                <div className="header__search"><img src={require("./SecondaryReversedLogo.png")} style={{ height: "3.5rem" }} alt="see" /></div>
                <div className="header__logo">Attendance DashBoard</div>
            </header>

            <Sidebar user={user} />
            <CreateCourse />

        </div>
    )
}

CreatePage.propTypes = {

}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(CreatePage);