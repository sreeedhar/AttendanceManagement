import React, { useState } from 'react'
import PropTypes from 'prop-types'

const DetailsRow = ({ index, record: { date, roll, name, id, status } }) => {
    const [formData, setFormData] = useState({
        update: ''
    });


    const { update } = formData;
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const Submit = async e => {
        console.log('inside submit');
        e.preventDefault();
    };

    return (
        <tr>
            <td style={{ fontWeight: "700", fontSize: "36" }}>{index}</td>
            <td style={{ fontWeight: "700", fontSize: "36" }}>{roll}</td>
            <td style={{ fontWeight: "700" }}>{name}</td>
            <td style={{ fontWeight: "700", fontSize: "36" }}>{date}</td>
            <td>{status}</td>
            <td><select name="update" value={update} onChange={e => onChange(e)}>
                <option value="volvo">Present</option>
                <option value="saab">Absent</option>
            </select></td>
        </tr>
    )
}

DetailsRow.propTypes = {

}

export default DetailsRow
