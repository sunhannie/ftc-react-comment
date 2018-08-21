const ADD_COMMENT = 'ADD_COMMENT';
const MARK_QUESTION = 'MARK_QUESTION';
const REQUEST_GET = 'REQUEST_GET';
const REQUEST_POST = 'REQUEST_POST';
import { combineReducers } from 'redux'

const reducer = (state={}, action) => {
    if (!state) { 
        state = {}
    }

    switch(action.type){
        case ADD_COMMENT:
            return {questions: [...state, action.dataAdded]}
        case MARK_QUESTION:
            return {mark_question_data:action.mark_question}
        default:
           let aClone = { ...{questions: 'default data'}  } ; 
            return ({
                ...aClone,   
                state   
            })
    }
}


 const requestReducer = (state = { }, action) => {
  switch (action.type) {
    case REQUEST_GET:
      return action.request_data
    case REQUEST_POST:
    //   console.log(action.request_data);
      return action.request_data
    default:
      return []
  }
}


/**
 * action
 * @param dispatch 
 */


function requestComments(dispatch) {

    const data = '../../client/data/comment.json';
    const init = {
      method:  'GET',
      headers:{ 
        'Content-Type': 'text/plain',
        'Accept': 'application/json',
      },
      mode: 'same-origin',
      credentials: 'include',
      redirect: 'error'
    }

      fetch(data,init)
      .then(res => res.json())
      .then(( comments ) => { 
       return dispatch(requestGet(comments.result))
    });
   
  }

function postComments(dispatch,data) {
    const url = 'http://localhost:3002/add';  //设置mode: 'cors'，这个能get到'http://localhost:3001/'网址
    const init = {
      method:  'POST',
      headers:{ 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      mode: 'cors',
      credentials: 'include',
      body: 'data'
    }

    fetch(url,init)
      .then(res => res.json())
      .then(( comments ) => { 
          console.log(comments);
    //    return dispatch(requestPost(comments.result))
    });
   
}

export const addComment = (dataAdded) => {
    return { type: ADD_COMMENT, dataAdded}
}

export const requestGet = (request_data) => {
    return { type: REQUEST_GET, request_data}
}

export const requestPost = (request_data) => {
    return { type: REQUEST_POST, request_data}
}

export const fetchDataInGet = data => (dispatch, getState)  => {
    return requestComments(dispatch);
}

export const fetchDataInPost = data => (dispatch, getState)  => {
    return postComments(dispatch);
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
    return dispatch(fetchDataInGet(subreddit))   
}

// export const fetchDataInGet = data => (dispatch, getState)  => {
//     // dispatch(requestGet(data))  
//     // return fetch('../../client/data/comment.json')
//     // .then(response => response.json())
//     // .then(json =>{console.log(json);} ) 
//     return requestComments(dispatch);
// }


// 结合起来，返回一对象
const rootReducer = combineReducers({
  reducer,
  requestReducer
})

export {requestReducer,rootReducer} 

