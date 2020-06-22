import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { archive, unarchive } from '../../../actions/faculty';


export const Card = ({ auth, archive, unarchive,
    course: { faculty, course, archived, year, dept } }) => {

    console.log(course);

    const Archive = async e => {
        console.log("archivee");
        e.preventDefault();
        archive(course, year)
    };

    const Unarchive = async e => {
        console.log("unarchivee");
        e.preventDefault();
        unarchive(course, year)
    };


    return (

        <div className="overviewcard">
            <div>
                {(archived == 1) ?
                    <div>

                        <Link to={`/faculty/courses/${course}`}><h2 style={{ color: "white", textAlign: "center" }}>{course}</h2></Link>
                        <div className="overviewcard__icon">
                            <h4 style={{ color: "white" }}>Batch: {dept}{year}</h4>
                        </div>
                        <button type="submit" style={{ alignContent: "right" }} onClick={e => Unarchive(e)}> Unarchive</button>

                    </div>
                    : (
                        <div>

                            <Link to={`/faculty/courses/${course}`}><h2 style={{ color: "white", textAlign: "center" }}>{course}</h2></Link>
                            <div className="overviewcard__icon">
                                <h4 style={{ color: "white" }}>Batch: {dept}{year}</h4>
                            </div>
                            <button type="submit" style={{ alignContent: "right" }} onClick={e => Archive(e)}> Archive</button>
                        </div>
                    )}
            </div>
        </div>




    )
}

Card.propTypes = {
    faculty: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showActions: PropTypes.bool,
    archive: PropTypes.func.isRequired,
    unarchive: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    student: state.student
});

export default connect(
    mapStateToProps,
    { archive, unarchive }
)(Card);
