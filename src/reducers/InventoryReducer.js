import {
  NEW_LIST,
  NEW_LIST_FAILED,
  NEW_ITEM,
  NEW_ITEM_FAILED,
  GET_LISTS,
} from '../actions/types'


const INITIAL_STATE = {
  currentList: {
    id: 1,
    inventoryLists: []
  },
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_LIST:
      return { ...state, currentList: action.payload }
    case NEW_LIST_FAILED: 
      return { ...state, }
    case NEW_ITEM: 
      return { ...state, }
    case NEW_ITEM_FAILED: 
      return { ...state, }
    case GET_LISTS: 
      return { ...state, inventoryLists: action.payload} 
    default:
      return state;
  }
}