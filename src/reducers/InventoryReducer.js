import {
  NEW_LIST,
  NEW_LIST_FAILED,
  NEW_ITEM,
  NEW_ITEM_FAILED,
  GET_LISTS,
  GET_ITEMS,
  UPDATE_INPUT,
  CLEAR_INPUT
} from '../actions/types'

const INITIAL_STATE = {
  currentList: {
    id: '8XrdQ2SKUEB5GjVReiCW',
  },
  inventoryLists: [],
  itemsInList: [],
  listImg: require('../assets/icons/camera.png'),
  itemNums: 0,
  name: '',
  tags: '',
  imgUri: '',
  x: '',
  y: '',
  z: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_LIST:
      return { ...state, currentList: action.payload }
    case NEW_LIST_FAILED: 
      return { ...state, }
    case NEW_ITEM: 
      return { ...state, itemsInList: [ ...state.itemsInList, action.payload ]}
    case NEW_ITEM_FAILED: 
      return { ...state, }
    case GET_LISTS: 
      return { ...state, inventoryLists: action.payload} 
    case GET_ITEMS: 
      return { ...state, itemsInList: action.payload} 
    case UPDATE_INPUT: 
      return { ...state, [action.payload.key]: action.payload.i} 
    case CLEAR_INPUT: 
      return { 
        ...state, 
        listImg: require('../assets/icons/camera.png'),
        itemNums: 0,
        name: ' ',
        tags: ' ',
        imgUri: ' ',
        x: ' ',
        y: ' ',
        z: ' ',
      } 
    default:
      return state;
  }
}