import * as ItemActions from '../actions/ItemActions'

const initialState = {
    fetched: false,
    fetching: false,
    items: [],
    totalItems: -1,
    loadedPage: -1,
    activeItem: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ItemActions.FETCH_ITEMS:
            return { ...state, fetching: true }
        case ItemActions.FETCH_ITEMS_RESPONSE:
            const newFetchItems = [...state.items];
            for (const payloadItem of action.payload.items.items) {
                const index = newFetchItems.findIndex((item) => item.id === payloadItem.id);
                if (index === -1) {
                    newFetchItems.push(payloadItem);
                } else {
                    newFetchItems[index] = payloadItem;
                }
            }
            return {
                ...state,
                items: newFetchItems,
                totalItems: action.payload.items.totalItems,
                fetched: true,
                fetching: false,
                loadedPage: action.payload.loadedPage
            }
        case ItemActions.TOGGLE_ITEM_FAVOURITE:
            const newItems = [...state.items];
            let index = state.items.findIndex((item) => item.id === action.payload);
            newItems[index] = {
                ...newItems[index],
                favourite: !newItems[index].favourite
            }
            return {
                ...state,
                items: newItems
            }
        default:
            return state;
    }
}
