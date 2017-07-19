/* eslint-disable no-unused-vars */

import Vue from 'vue'
import config from './config'
import {saveDataToStorage, checkDataFromStorage} from './util'

const basePath = config.api.base_path

function getDataViaApi (path, cb, errorHandler, payload) {
  let sessionRes = null
  sessionRes = checkDataFromStorage(path)
  if (sessionRes !== null) {
    console.log('Read from session data : ', path)
    cb(sessionRes)
  } else {
    Vue.http.get(path, {
      params: payload,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'EHEDFkkTW8/I1JP+niBRmjEnwUyYzY/O2UF+XEYJ87rD/z4+hvQzTaWREe28+lfP'
      }
    }).then((res) => {
      console.log('You just call api : ', path)
      saveDataToStorage(path, res)  
      cb(res)
    }, (error) => {
      console.log('Sorry, api ' + path + ' error : ', error)
      if (typeof errorHandler === 'function') {
        errorHandler(error)
      }
    })
  }  
}

export default {
  getPosPemadam: (cb, errorHandler) => {
    let path = `${basePath}pospemadam`
    getDataViaApi(path, cb, errorHandler, null)
  }
}
