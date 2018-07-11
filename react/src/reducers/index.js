import { combineReducers } from 'redux'
import itemsReducer from './itemsReducer'
import itemReducer from './itemReducer'
import favouritesReducer from './favouritesReducer'

export default combineReducers({
    items: itemsReducer,
    item: itemReducer,
    favourites: favouritesReducer,
})
