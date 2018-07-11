import React, { Component } from 'react';
import './ButtonFavourite.css';

class ButtonFavourite extends Component {
    render() {
        return <button type='button' className='btn-favourite' onClick={this.props.onClick}>
            <i className={this.props.favourite ? 'fas fa-heart' : 'far fa-heart'} />
        </button>;
    }
}

export default ButtonFavourite;
