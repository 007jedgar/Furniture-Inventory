import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER,
    SIGNUP_USER_FAIL,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER,
    LOGOUT_USER_SUCCESS,
    GET_USER
} from './types'
import AsyncStorage from '@react-native-community/async-storage';
const uuidv1 = require('uuid/v1');

export const getUser = () => {
    return async (dispatch) => {
        dispatch({ type: LOGIN_USER })
        const user = firebase.auth().currentUser
        if (!user) {
            try {
                const value = await AsyncStorage.getItem('uuid')
                if(value !== null) {
                    // value previously stored
                } else {
                    saveTempId()
                }
            } catch(e) {
                dispatch({ type: LOGIN_USER_FAILED })
            }
        }

        firebase.firestore().collection('users')
        .doc(user.uid).get().then((doc) => {
            let info = doc.data()

            dispatch({ type: GET_USER, payload: info })
        })
    }
}

const saveTempId = () => {
    return (dispatch) => {
        storeData = async () => {
            try {
                let uuid = uuidv1()
                await AsyncStorage.setItem('uuid', uuid)
                let user = { id: uuid }
                dispatch({ type: LOGIN_USER_SUCCESS, payload: user })
            } catch (e) {
                dispatch({ type: LOGIN_USER_FAILED })
            }
          }
    }
}

export const signin = (email, password) => {
  return (dispatch) => {
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword()
    .then((user) => {
      console.log(user)
      dispatch({ type: LOGIN_USER_SUCCESS, payload: user.user })
    })
  }
}

export const signup = (email, password) => {
    return (dispatch) => {
        dispatch({ type: SIGNUP_USER })
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            dispatch({ type: SIGNUP_USER_SUCCESS })
        }).catch((error) => {
            dispatch({ type: SIGNUP_USER_FAIL, payload: error })
        })
    }
}

export const logout = () => {
  return (dispatch) => {
    firebase.auth().signout().then(() => {
      dispatch({ type: LOGOUT_USER_SUCCESS })
    })
  }
}

// TODO :
/*

 1. Change email
 2. Change Password 
 
*/