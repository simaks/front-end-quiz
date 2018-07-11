import { push } from 'connected-react-router'

const serverUrl = 'http://localhost:3001'

export const
    FETCH_ITEMS = 'FETCH_ITEMS',
    FETCH_ITEMS_RESPONSE = 'FETCH_ITEMS_RESPONSE',
    FETCH_ITEMS_ERROR = 'FETCH_ITEMS_ERROR',
    FETCH_ITEM = 'FETCH_ITEM',
    FETCH_ITEM_RESPONSE = 'FETCH_ITEM_RESPONSE',
    FETCH_ITEM_ERROR = 'FETCH_ITEM_ERROR',
    FETCH_FAVOURITES = 'FETCH_FAVOURITES',
    FETCH_FAVOURITES_RESPONSE = 'FETCH_FAVOURITES_RESPONSE',
    FETCH_FAVOURITES_ERROR = 'FETCH_FAVOURITES_ERROR',
    TOGGLE_ITEM_FAVOURITE = 'TOGGLE_ITEM_FAVOURITE',
    NAVIGATE_TO_ITEM = 'NAVIGATE_TO_ITEM';


export function fetchItemsPage(page = 0) {
    const itemsPerPage = 9;
    const start = page * itemsPerPage;
    return (dispatch) => {
        dispatch({ type: FETCH_ITEMS });
        fetch(`${serverUrl}/browse?start=${start}&limit=${itemsPerPage}`).then((response) => {
            return response.json()
        }).then((items) => {
            dispatch({
                payload: { items, loadedPage: page },
                type: FETCH_ITEMS_RESPONSE,
            })
        }).catch((error) => {
            dispatch({
                payload: error,
                type: FETCH_ITEMS_ERROR,
            })
        })
    }
}

export function toggleFavourite(id, value) {
    return (dispatch) => {
        fetch(`${serverUrl}/favourites/set/${id}/${value}`, {method: 'post'}).then((response) => {
            return response.json();
        }).then((favourites) => {
            dispatch(fetchFavourites());
        })
    }
}

export function navigateToItem(id) {
    return (dispatch) => {
        dispatch(push(`/item/${id}`));
    }
}

export function navigateToHome(id) {
    return (dispatch) => {
        dispatch(push('/'));
    }
}

export function fetchItem(id) {
    return (dispatch) => {
        dispatch({ type: FETCH_ITEM });
        fetch(`${serverUrl}/item/${id}`).then((response) => {
            return response.json();
        }).then((items) => {
            dispatch({
                payload: items,
                type: FETCH_ITEM_RESPONSE,
            })
        }).catch((error) => {
            dispatch({
                payload: error,
                type: FETCH_ITEM_ERROR,
            })
        })
    }
}

export function fetchFavourites() {
    return (dispatch) => {
        dispatch({ type: FETCH_FAVOURITES });
        fetch(`${serverUrl}/favourites`).then((response) => {
            return response.json();
        }).then((favourites) => {
            dispatch({
                payload: favourites,
                type: FETCH_FAVOURITES_RESPONSE,
            })
        }).catch((error) => {
            dispatch({
                payload: error,
                type: FETCH_FAVOURITES_ERROR,
            })
        })
    }
}
