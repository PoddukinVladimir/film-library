import React, {Component} from 'react';
import AnimateHeight from 'react-animate-height';

import InfoRow from './info-row';

class Film extends Component {
    constructor() {
        super();
        this.state = {
            height: 0
        };
    }

    toggleInfo = () => {
        const {height} = this.state;
        this.setState({
            height: height === 0 ? 'auto' : 0,
        });
    };

    handleInfoIconClick = () => {
        if (this.props.redactorMode) {

        } else {
            this.toggleInfo();
        }
    };

    render() {
        // used for row expand animation
        const {height} = this.state;
        return (
            <div className="row-container">
                <div className="row-container-row">
                    <div className="row-container-cell film-name-cell">
                        <span className="main-title">{this.props.film.title}</span>
                    </div>
                    <div className="row-container-cell film-info-cell">
                        <div className="row-container-cell--content">
                            <a href="#0">
                                <i onClick={this.handleInfoIconClick} title="Show info"
                                   className={this.props.redactorMode ? "ion-android-cancel" : "ion-help-circled"}/>
                            </a>
                        </div>
                    </div>
                </div>
                {/* Do not show info rows in redactor mode */}
                {this.props.redactorMode ? null :
                    <AnimateHeight duration={ 1000 }
                                   height={ height }
                                   className="info-row-container"
                                   contentClassName="row-container">
                        <InfoRow film={this.props.film}/>
                    </AnimateHeight>}
            </div>
        );
    }
}

export default Film;