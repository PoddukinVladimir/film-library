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

    render() {
        const {height} = this.state;

        return (
            <div className="row-container">
                <div className="row-container-row">
                    <div className="row-container-cell film-name-cell">
                        <span className="main-title">{this.props.film.title}</span>
                    </div>
                    <div className="row-container-cell film-info-cell">
                        <div className="row-container-cell--content access-link-content">
                            <a href="#0">
                                <i onClick={this.toggleInfo} className="ion-help-circled" title="Show info"/>
                            </a>
                        </div>
                    </div>
                </div>
                <AnimateHeight duration={ 1000 }
                               height={ height }
                               className="info-row-container"
                               contentClassName="row-container">
                    <InfoRow film={this.props.film}/>
                </AnimateHeight>
            </div>
        );
    }
}

export default Film;