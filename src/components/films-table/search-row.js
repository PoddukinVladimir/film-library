import React, {Component} from 'react';

class SearchRow extends Component {
    constructor() {
        super();
    }

    toggleSearchByActors = () => {
        PubSub.publish('searchCriteriaChanged');
    };

    changeSearchCriteriaHTML = () => {
        const className = "row-container-cell row-container-cell--content row-container-cell--content-actor-search";
        return (
            <div className={this.props.searchByActorsActive ? className + " actor-search-active" : className}
                 onClick={this.toggleSearchByActors}>
                <i title="Search by actor name" className="ion-android-contacts"/>
            </div>
        )
    };

    render() {
        return (
            <div className="row-container">
                <div className="row-container-row">
                    <input id="row-container-row-search" name="searchPredicate" onChange={this.props.onChange}
                           placeholder="Search..." type="text"/>
                    {this.props.redactorMode ? null : this.changeSearchCriteriaHTML()}
                </div>
            </div>
        )
    }
}

export default SearchRow;