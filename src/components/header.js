import React, {Component} from 'react';
import {Router, Route, Link} from 'react-router-dom'

import '../css/header.css';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            links: [
                {href: '#', title: 'Home', to: '/'},
                {href: '#', title: 'Redactor', to: '/films'}
            ],
            activeIndex: 0
        }
    }

    setActiveNavItem = (index) => {
        this.setState({activeIndex: index});
    };

    render() {
        return (
            <nav className="navbar">
                {this.state.links.map((link, index) => {
                    const className = this.state.activeIndex === index ? 'nav-item nav-item--active' : 'nav-item';
                    return (
                        <Link className={className} onClick={this.setActiveNavItem.bind(this, index)}
                              key={index} to={link.to}>
                              {link.title}
                        </Link>
                    )
                })}
            </nav>
        )
    }
}
;

export default Header;