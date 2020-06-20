import React from 'react'
import { Link, Redirect } from "react-router-dom";


const Choose = () => {
    return (
        <div className="content">

            <section className="student">
                <Link className="bln btn btn-dark btn-lg" to="/student/login">Student</Link>
            </section>

            <section className="faculty">
                <Link className="bln btn btn-dark btn-lg" to="/faculty/login">Faculty</Link>
            </section>

            <section className="parent">
                <Link className="bln btn btn-dark btn-lg" to="/parent/login">Parent</Link>
            </section>

        </div>
    )
}

export default Choose;