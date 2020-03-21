import React from 'react'

const Input = (props) => {

    let changeHandler = (e) => {
        props.changeHandler(e.target.name, e.target.value)
    }

    return (
        <div className="form-group">
            <label>{props.label} : </label>
            <input type={props.type} name={props.name} value={props.value} onChange={(e) => changeHandler(e)} />
        </div>
    )

}

export default Input