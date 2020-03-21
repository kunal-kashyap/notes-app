import React from 'react'

import './style.css'

const Button = (props) => {

    return (
        <div className="form-group">
            <button type={props.type} className={props.btnClass} onClick={props.clickHandler}>
                {props.value}
            </button>
        </div>
    )

}

export default Button