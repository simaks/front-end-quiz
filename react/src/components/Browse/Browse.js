import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ItemActions from '../../actions/ItemActions';
import { ListItem } from '../';


class Browse extends Component {
  componentWillMount() {
    this.onLoadMoreClick = this.onLoadMoreClick.bind(this);
  }

  componentDidMount() {
    if (this.props.loadedPage < 0) {
      this.props.fetchItemsPage();
    }
    this.props.fetchFavourites();
  }

  render() {
    return <div className="container">
      <h2 className='text-center py-4'>Browse page</h2>
      {this.props.fetched ? <div>
        <div className="row text-center">
          {this.props.items.map((item) => <div className="col" key={item.id}>
            <ListItem item={item}
              favourite={this.props.favourites.indexOf(item.id) !== -1}
              onItemClick={this.onItemClick(item.id)}
              onToggleFavourite={this.onToggleFavourite(item.id, this.props.favourites.indexOf(item.id) === -1)} />
          </div>)}
        </div>
        {this.showLoadMore ? <div className='text-center my-4'>
          <button className='btn btn-lg btn-outline-warning' onClick={this.onLoadMoreClick}>Load more</button>
        </div> : ''}
      </div> : this.props.fetching ? 'Loading...' : 'No items'}
    </div>;
  }

  get showLoadMore() {
    return this.props.items.length < this.props.totalItems;
  }

  onLoadMoreClick() {
    this.props.fetchItemsPage(this.props.loadedPage + 1);
  }

  onItemClick(id) {
    return () => {
      this.props.navigateToItem(id);
    }
  }

  onToggleFavourite(id, value) {
    return (event) => {
      event.stopPropagation();
      return this.props.toggleFavourite(id, value)
    };
  }
}

export default connect((state) => {
  return {
    items: state.items.items,
    totalItems: state.items.totalItems,
    fetched: state.items.fetched,
    fetching: state.items.fetching,
    loadedPage: state.items.loadedPage,
    favourites: state.favourites.favourites,
  }
}, (dispatch) => {
  return {
    fetchItemsPage: page => dispatch(ItemActions.fetchItemsPage(page)),
    fetchFavourites: () => dispatch(ItemActions.fetchFavourites()),
    toggleFavourite: (id, value) => dispatch(ItemActions.toggleFavourite(id, value)),
    navigateToItem: id => dispatch(ItemActions.navigateToItem(id))
  }
})(Browse);
