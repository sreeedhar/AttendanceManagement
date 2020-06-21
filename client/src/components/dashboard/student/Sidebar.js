import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';


export const Sidebar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    return (
        <aside className="sidenav">
            <div className="sidenav__close-icon">
                <i className="fas fa-times sidenav__brand-close"></i>
            </div>
            <ul className="sidenav__list">
                <li className="sidenav__list-item-avt" style={{ marginRight: "20px" }} ><img src="https://visualpharm.com/assets/657/Student%20Male-595b40b85ba036ed117dab91.svg" alt="Student Avatar" /></li>
                <li className="sidenav__list-item"><b style={{ fontWeight: "700px", fontSize: "22px" }}>Welcome,<br />{user.name}!</b></li>

                <li className="sidenav__list-item"><Link style={{ color: "white", fontWeight: "500px" }} to="/student/courses"><b>Dashboard</b></Link></li>
                <li className="sidenav__list-item"><Link style={{ color: "white", fontWeight: "500px" }} to="/student/chat"><b>Interaction</b></Link></li>
                <li className="sidenav__list-item" onClick={logout}>
                    <Link to="/login" style={{ color: "white", fontWeight: "500px" }}><b>Logout</b></Link>
                </li>
            </ul>
        </aside>
    )
}

Sidebar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(Sidebar);

