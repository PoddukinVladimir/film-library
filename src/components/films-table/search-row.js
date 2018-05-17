import React, {Component} from 'react';

class SearchRow extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row-container">
                <div className="row-container-row">
                    <input id="row-container-row-search" name="searchPredicate" onChange={this.props.onChange}
                           placeholder="Search..." type="text"/>
                    <div className="row-container-cell--content">
                        <a href="javascript:;">
                            <i title="Search by actor name" className="ion-android-contacts"/>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchRow;