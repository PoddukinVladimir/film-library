import React from 'react';

const InfoRow = (props) => {
    return (
        <div className="row-container-row row-container-row-info">
            <div className="row-container-cell row-container-cell-info row-container-cell-info--year">
                <span className="info-title">Year:</span> {props.film.year}
            </div>
            <div className="row-container-cell row-container-cell-info row-container-cell-info--format">
                <span className="info-title">Format: </span>
                <span className="info-title info-title--blue">{props.film.format}</span>
            </div>
            <div className="row-container-cell row-container-cell-info row-container-cell-info--actors">
                <span className="info-title">Actors:</span>
                {props.film.actors.map((actor, index) => {
                    return (
                        <div key={index}>{index + 1}: {actor}</div>
                    )
                })}
            </div>
        </div>
    )
};

export default InfoRow;