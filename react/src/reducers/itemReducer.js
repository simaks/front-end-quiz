import * as ItemActions from '../actions/ItemActions'

const initialState = {
    fetched: true,
    fetching: false,
    item: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ItemActions.FETCH_ITEM:
            return { ...state, fetched: false, fetching: true }
        case ItemActions.FETCH_ITEM_RESPONSE:
            return { ...state, fetched: true, fetching: false, item: action.payload }
        default:
            return state;
    }
}
