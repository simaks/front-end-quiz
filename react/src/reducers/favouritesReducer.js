import * as ItemActions from '../actions/ItemActions'

const initialState = {
    fetched: false,
    fetching: false,
    favourites: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ItemActions.FETCH_FAVOURITES:
            return { ...state, fetching: true }
        case ItemActions.FETCH_FAVOURITES_RESPONSE:
            return {
                ...state,
                favourites: action.payload,
                fetched: true,
                fetching: false,
            }
        default:
            return state;
    }
}
