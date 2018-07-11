import React, { Component } from 'react';
import './ListItem.css'
import ButtonFavourite from '../ButtonFavourite/ButtonFavourite.1';

class ListItem extends Component {
  render() {
    const item = this.props.item;

    return (
      <div className='list-item' onClick={this.props.onItemClick}>
        <img src={item.image} alt={item.title} />
        <div className='row'>
          <div className='col text-left'>{this.itemPrice}</div>
          <div className='col text-right'>
            <ButtonFavourite favourite={item.favourite} onClick={this.props.onToggleFavourite} />
          </div>
        </div>
      </div>
    );
  }

  get itemPrice() {
    let item = this.props.item;
    if (item.price && item.price.amounts && item.price.amounts.USD) {
      return item.price.amounts.USD;
    }
    return 'Price Upon Request';
  }
}

export default ListItem;
