import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ItemActions from '../../actions/ItemActions'
import ButtonFavourite from '../ButtonFavourite/ButtonFavourite.1';


class Item extends Component {
  componentWillMount() {
    this.onHomeClick = this.onHomeClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchItem(this.props.itemId);
  }

  render() {
    const item = this.props.item;
    return <div className="container">
      <div className='row py-4'>
        <div className='col'>
          <button onClick={this.onHomeClick} className='btn btn-outline-warning'>{'<'} Home</button>
        </div>
        <div className='col text-center'>
          <h2>Item page</h2>
        </div>
        <div className='col' />
      </div>
      {this.props.fetching ? 'Loading...' : this.props.item ? <div>
        <div className='row'>
          <div className='col'>
            <div className='text-right'>
              <ButtonFavourite favourite={item.favourite} onClick={this.onToggleFavourite(item.id)} />
            </div>
            <img src={item.image} alt={item.title} />
          </div>
          <div className='col'>
            <h3>{item.title}</h3>
            <p>{this.itemPrice}</p>

            <h5>Measurements:</h5>
            {item.measurements ? <p>{item.measurements.display}</p> : ''}

            <div className='row mb-3'>
              <div className='col'>
                <button type='button' className='btn btn-block btn-outline-warning' disabled>
                  Purchase
                </button>
              </div>
              <div className='col'>
                <button type='button' className='btn btn-block btn-outline-warning' disabled>
                  Make offer
                </button>
              </div>
            </div>

            <p>{item.description}</p>
            <p>Creator: {item.creators}</p>
          </div>
        </div>
      </div> : ''}
    </div>;
  }

  onToggleFavourite(id) {
    return () => {
      return this.props.toggleFavourite(id)
    };
  }

  onHomeClick() {
    this.props.navigateToHome();
  }

  get itemPrice() {
    let item = this.props.item;
    if (item.price && item.price.amounts && item.price.amounts.USD) {
      return item.price.amounts.USD;
    }
    return 'Price Upon Request';
  }
}

export default connect((state) => {
  return {
    item: state.item.item,
    fetched: state.item.fetched,
    fetching: state.item.fetching,
  }
}, (dispatch) => {
  return {
    fetchItem: id => dispatch(ItemActions.fetchItem(id)),
    toggleFavourite: id => dispatch(ItemActions.toggleFavourite(id)),
    navigateToHome: () => dispatch(ItemActions.navigateToHome())
  }
})(Item);
