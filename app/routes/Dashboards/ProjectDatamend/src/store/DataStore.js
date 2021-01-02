
import {NOTES} from '../shared/notes';
import {WIZ_START} from '../shared/wizstart';
import {WIZ_DRYRUN} from '../shared/wizdryrun';
import {WIZ_RAWDATA} from '../shared/wizrawdata';

var isMock = true;
const isFail = false;
var currentInputType = 'csv';
var inputTypeHook = null;

const DataStore = {
  getIsMock: () => {
    return isMock;
  },
  setIsMock: (flag) => {
    isMock = flag;
    console.log("MockFlag now: " + isMock);
  },
  getCurrentInputType: () => {
    return currentInputType;
  },
  setCurrentInputType: (val) => {
    currentInputType = val;
    console.log("currentInputType now: " + currentInputType);
    if (inputTypeHook) {
      inputTypeHook(currentInputType);
    }
  },
  setCurrentInputTypeHook: (fn) => {
    inputTypeHook = fn;
  },


  fetchTestCSV: () => {
    if (isMock) {
			var promise = new Promise((resolve,reject) => {
				if (isFail) {
			    reject(Error("mock notes failed"));
				} else {
		    	resolve({ notes: NOTES});
				}
			});
    	return promise;
    } else {
    	let url = "http://localhost:8080/testcsv";
    	return DataStore.innerFetchText(url);
    }
  },

  postWizStart: (obj) => {
    if (isMock) {
      var promise = new Promise((resolve,reject) => {
        if (isFail) {
          reject(Error("mock xnotes failed"));
        } else {
          resolve(WIZ_START);
        }
      });
      return promise;
    } else {
      let url = "http://localhost:8080/api/wizard/start";
      return DataStore.innerPost(url, obj);
    }
  },
  postWizRawData: (obj) => {
    if (isMock) {
      var promise = new Promise((resolve,reject) => {
        if (isFail) {
          reject(Error("mock xnotes failed"));
        } else {
          resolve(WIZ_RAWDATA);
        }
      });
      return promise;
    } else {
      let url = "http://localhost:8080/api/wizard/rawdata";
      return DataStore.innerPost(url, obj);
    }
  },
  postWizViewData: (obj) => {
    if (isMock) {
      var promise = new Promise((resolve,reject) => {
        if (isFail) {
          reject(Error("mock xnotes failed"));
        } else {
          resolve(WIZ_RAWDATA);
        }
      });
      return promise;
    } else {
      let url = "http://localhost:8080/api/wizard/viewdata";
      return DataStore.innerPost(url, obj);
    }
  },
  postWizFieldUpdate: (obj) => {
    if (isMock) {
      var promise = new Promise((resolve,reject) => {
        if (isFail) {
          reject(Error("mock xnotes failed"));
        } else {
          resolve({});
        }
      });
      return promise;
    } else {
      let url = "http://localhost:8080/api/wizard/update";
      return DataStore.innerPost(url, obj);
    }
  },
  postWizDryRun: (obj) => {
    if (isMock) {
      var promise = new Promise((resolve,reject) => {
        if (isFail) {
          reject(Error("mock postWizDryRun failed"));
        } else {
          resolve(WIZ_DRYRUN);
        }
      });
      return promise;
    } else {
      let url = "http://localhost:8080/api/wizard/dryrun";
      return DataStore.innerPost(url, obj);
    }
  },
  innerPost: (url,obj) => {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
    .then(responseData => responseData);
  },

  innerFetch: (url) => {
  	console.log("fetching: " + url);
  	return fetch(url)
    .then(res => {
      if (false) {
      	//console.log(res);
      	if (res.status === 500) {
      		throw Error("500 error. " + res.statusText);
      	}
        throw Error(res.statusText);
      } else {
    		return res.json();
    	}
    })
    .then(responseData => responseData)
  },
  innerFetchText: (url) => {
    console.log("fetching: " + url);
    return fetch(url)
    .then(res => {
      if (false) {
        //console.log(res);
        if (res.status === 500) {
          throw Error("500 error. " + res.statusText);
        }
        throw Error(res.statusText);
      } else {
        return res.text();
      }
    })
    .then(responseData => responseData)
  }

}

Object.freeze(DataStore);
export default DataStore;
