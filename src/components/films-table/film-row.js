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
        if (this.props.editorMode) {
            // triggers parents function that updates the view
            this.props.deleteFilm(this.props.film.id);
        } else {
            this.toggleInfo();
        }
    };

    infoRowHTML = () => {
        // used for row expand animation
        const {height} = this.state;
        return (
            <AnimateHeight duration={ 1000 }
                           height={ height }
                           className="info-row-container"
                           contentClassName="row-container">
                <InfoRow film={this.props.film}/>
            </AnimateHeight>
        )
    };

    render() {
        return (
            <div className="row-container">
                <div className="row-container-row">
                    <div className="row-container-cell row-container-cell--film-name">
                        <span className="main-title">{this.props.film.title}</span>
                    </div>
                    <div className="row-container-cell row-container-cell--film-info">
                        <div className="row-container-cell--content">
                            <i onClick={this.handleInfoIconClick}
                               title={this.props.editorMode ? "Delete film" : "Show info"}
                               className={this.props.editorMode ? "ion-android-cancel" : "ion-help-circled"}/>
                        </div>
                    </div>
                </div>
                {this.props.editorMode ? null : this.infoRowHTML()}
            </div>
        );
    }
}

export default Film;