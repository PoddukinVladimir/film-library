import React, {Component} from 'react';

import '../../css/sorting-popup.css';

class SortingPopup extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="sorting-popup-container">
                <div className="popup-button" onClick={this.props.toggleSortingPanel}>
                    <i className="ion-android-arrow-dropdown"/>
                </div>
                {this.props.isShown ? <div className="popup-content">
                    <div className="sorting-popup-item" onClick={this.props.sortFilms.bind(this, "asc")}>
                        <i className="ion-android-arrow-up"/>
                        <span className="popup-content-title">Sort ascending</span>
                    </div>
                    <div className="sorting-popup-item" onClick={this.props.sortFilms.bind(this, "desc")}>
                        <i className="ion-android-arrow-down"/>
                        <span className="popup-content-title">Sort descending</span>
                    </div>
                    <div className="sorting-popup-item" onClick={this.props.sortFilms}>
                        <i className="ion-android-close"/>
                        <span className="popup-content-title">Disable sorting</span>
                    </div>
                </div> : null}
            </div>
        )
    }
}

export default SortingPopup;