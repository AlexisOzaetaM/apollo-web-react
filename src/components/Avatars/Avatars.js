import React from 'react';

import './Avatars.css'

const avatars = (props) => {
    return (
        <div className="wrapper-avatar">
            <span>Elige un avatar</span>
            <div className="cc-selector">
                <input id="av1" type="radio" name="avatars" value="1" required onChange={props.changed} />
                <label className="drinkcard-cc avatar1" htmlFor="av1"></label>

                <input id="av2" type="radio" name="avatars" value="2" required onChange={props.changed} />
                <label className="drinkcard-cc avatar2" htmlFor="av2"></label>

                <input id="av3" type="radio" name="avatars" value="3" required onChange={props.changed} />
                <label className="drinkcard-cc avatar3" htmlFor="av3"></label>

                <input id="av4" type="radio" name="avatars" value="4" required onChange={props.changed} />
                <label className="drinkcard-cc avatar4" htmlFor="av4"></label>

                <input id="av5" type="radio" name="avatars" value="5" required onChange={props.changed} />
                <label className="drinkcard-cc avatar5" htmlFor="av5"></label>
            </div>
        </div>
    );
}

export default avatars;