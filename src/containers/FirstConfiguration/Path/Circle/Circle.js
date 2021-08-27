import React from 'react';

const circle = (props) => {
    let fillLine = props.isFill ? "path-line fill" : "path-line";
    let fillCircle = props.isFill ? "fill" : "";

    return (
        <div className={props.classes}>
            <span className={fillLine}></span>
            <svg className={fillCircle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.53 73.53"><defs></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><circle className="cls-1" cx="36.77" cy="36.77" r="36.77" /></g></g></svg>
        </div>
    );
}

export default circle;