import React from 'react';

import '../css/loader.css';

const Loader = () => {
    return (
        <div>
            <div className="loader"></div>
            <div className="info-title info-title--loading">Loading data...</div>
        </div>
    )
};

export default Loader;