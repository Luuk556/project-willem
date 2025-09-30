import React from "react"
import "./Profile.css"

interface ProfileProps{fieldname: string}

const Field: React.FC<ProfileProps> = ({fieldname = "n/a"}) => {
    return (
        <div className="profilefield">
            <div>{fieldname}</div>
            <input type="text" className="field-input" placeholder={"Type new "+fieldname+".."}></input>
        </div>
    )
}

const Profile: React.FC = () => {
    return (
        <div className="container">
            <Field fieldname="Email"></Field>
            <Field fieldname="Password"></Field>
            <Field fieldname="First Name"></Field>
            <Field fieldname="Last Name"></Field>
            <button className="submit-button">Submit</button>
        </div>
    )
}

export default Profile;