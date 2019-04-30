import {
  NEW_LIST,
  NEW_LIST_FAILED,
  NEW_ITEM,
  NEW_ITEM_FAILED,
  GET_LISTS,
  GET_ITEMS,
  UPDATE_INPUT,
  CLEAR_INPUT
} from './types'
import firebase from 'react-native-firebase'
import {
  Platform
} from 'react-native';
import { Actions } from 'react-native-router-flux'
import RNFetchBlob from 'rn-fetch-blob';
var _ = require('lodash')
import b64 from 'base64-js'

export const newList = (listInfo) => {
  return (dispatch) => {
    let docRef = {};
    let imgData = listInfo.listImg
    listInfo.listImg = '' 

    firebase.firestore().collection('lists')
    .add(listInfo).then((doc) => {

      docRef = doc
      let listId = doc.id
      listInfo.id = doc.id
      listInfo.docRef = doc.ref
      dispatch({ type: NEW_LIST, payload: listInfo })

      if (imgData) {
        return getImgURL(listId, imgData, listInfo.createdBy)
      }
    }).then((url) => {
      if (!url) {
        return; 
      }
      return docRef.update({
        listImgURL: url
      })
    }).then(() => console.log('done')).catch((err) => {
      console.log(err)
      dispatch({ type: NEW_LIST_FAILED })
    })
  }
}

const getImgURL = (uid, uri, title, mime = 'application/octet-stream') => {
  //Does all the blobifying work and sends blob to
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  return new Promise((resolve, reject) => {
    uri = uri.toString()
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    let uploadBlob = null
    console.log('uid: ', uid, 'title:', title, 'uri:', uri)
    const imageRef = firebase.storage().ref('catalog').child(title + '/' + uid)

    fs.readFile(uploadUri, 'base64')
    .then((data) => { //build blob
      return Blob.build(data, { type: `image/jpeg;BASE64` })
    }).then((blob) => { //upload to firebase storage
      uploadBlob = blob
      return imageRef.put(uri, { contentType: 'image/jpeg' })
    }).then(() => { // get download url from storage
      uploadBlob.close()
      return imageRef.getDownloadURL()
    }).then((url) => { // returns storage download url
      resolve(url) 
    }).catch((error) => {
      reject(error)
    })
  })
}

export const getInventoryLists = (uid) => {
  return (dispatch) => {
    firebase.firestore().collection('lists')
    .where('createdBy', '==', uid).get().then((snap) => {
      if (snap.empty) {
        return 
      }

      let lists = []
      snap.forEach((doc) => {
        let info = doc.data()
        info.ref = doc.ref
        info.id = doc.id

        lists.push(info)
      })
      console.log(lists)
      dispatch({ type: GET_LISTS, payload: lists })
    })
  }
}

export const newItem = (itemInfo, listInfo) => {
  console.log(itemInfo, listInfo)
  return (dispatch) => {
    let uri = itemInfo.imgUri
    let title = itemInfo.name
    let docRef = {}
    itemInfo.imgUri = ""

    firebase.firestore().collection('lists')
    .doc(listInfo.id).collection('items')
    .add(itemInfo).then((doc) => {
      console.log(doc)
      docRef = doc
      let uid = doc.id

      if (uri) {
        return getImgURL(uid, uri, title)
      }
      
    }).then((url) => {
      if (!url) {
        return;
      }
      console.log(docRef)
      return docRef.update({
        imgURL: url
      })
    }).then(() => dispatch({ type: NEW_ITEM }))
    .catch((err) => {
      console.log(err)
      dispatch({ type: NEW_ITEM_FAILED })
    })
  }
}

export const getItems = (listRef) => {
  return (dispatch) => {
    listRef.collection('items').onSnapshot((querySnap) => {
      if (querySnap.empty) {
        return dispatch({ type: GET_ITEMS, payload: [] })
      }

      let items = []
      querySnap.forEach((doc) => {
        let item = doc.data()
        item.ref = doc.ref
        item.id = doc.id

        items.push(item)
      })

      dispatch({ type: GET_ITEMS, payload: items })
    }, (err) => {
      console.log(err)
    })
  }
}

export const deleteItem = (ref) => {
  return (dispatch) => {
    ref.delete().catch(err => {
      // Actions.popTo('inventoryList')
    }) 
  }
}


export const deleteItemList = (docRef) => {
  return (dispatch) => {
    docRef.delete().then(() => {
      return firebase.firestore().collection('lists')
      .where('createdBy', '==', uid).get().then((snap) => {
        if (snap.empty) {
          return 
        }
  
        let lists = []
        snap.forEach((doc) => {
          let info = doc.data()
          info.ref = doc.ref
          info.id = doc.id
  
          lists.push(info)
        })
        console.log(lists)
        dispatch({ type: GET_LISTS, payload: lists })
      })
    }).then(() => {
      Actions.popTo('inventoryList')
    }).catch(err => {
      console.log(err)
    }) 
  }
}

export const setCurrentList = (listInfo) => {
  return (dispatch) => {
    dispatch({ type: NEW_LIST, payload: listInfo })
  }
}

export const updateInput = (i) => {
  return (dispatch) => {
    console.log(i)
    let key = Object.keys(i)[0]
    s = { key, i}
    dispatch({ type: UPDATE_INPUT, payload: s })
  }
}

export const clearInput = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_INPUT })
  }
}