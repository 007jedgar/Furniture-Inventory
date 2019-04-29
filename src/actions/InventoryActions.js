import {
  NEW_LIST,
  NEW_LIST_FAILED,
  NEW_ITEM,
  NEW_ITEM_FAILED,
  GET_LISTS
} from './types'
import firebase from 'react-native-firebase'
import {
  Platform
} from 'react-native';
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
      dispatch({ type: NEW_LIST })

      docRef = doc
      let listId = doc.id
      return getImgURL(listId, imgData, listInfo.createdBy)
    }).then((url) => {
      return docRef.update({
        listImgURL: url
      })
    }).then(() => console.log('done')).catch((err) => {
      console.log(err)
      dispatch({ type: NEW_LIST_FAILED })
    })
  }
}

export const newItem = (listId, itemInfo) => {
  return (dispatch) => {
    
    firebase.firestore().collection('lists')
    .doc(listId).collection('items')
    .add(itemInfo).then(() => {
      dispatch({ type: NEW_ITEM })
    }).catch((err) => {
      console.log(err)
      dispatch({ type: NEW_ITEM_FAILED })
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