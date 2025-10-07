import React from "react"
import "./Profile.css"

let editing: boolean = false;

interface ProfileProps{fieldname: string}

const Field: React.FC<ProfileProps> = ({fieldname = "n/a"}) => {
    let input_type: string = "text"
    let placeholder: string; // haal value op uit database?

    if (fieldname === "Password") {
        input_type = "password"
    }

    if (editing) {
        placeholder = "Type new "+fieldname+".."
    } else {
        placeholder = "fieldvalue"
    }

    return (
        <div className="profilefield">
            <div>{fieldname}</div>
            <input type={input_type} className="field-input" placeholder={placeholder}></input>
        </div>
    )
}

const Profile: React.FC = () => {
    
    function Edit() {
        editing = true;
    }

    return (
        <div className="container">
            <button className="submit-button" onClick={Edit}>Edit</button>
            <Field fieldname="Email"></Field>
            <Field fieldname="Password"></Field>
            <Field fieldname="First Name"></Field>
            <Field fieldname="Last Name"></Field>
            <button className="submit-button">Submit</button>
        </div>
    )
}

export default Profile;