const ADD_QUESTION = 'ADD_QUESTION';
const MARK_QUESTION = 'MARK_QUESTION';
const REQUEST_GET = 'REQUEST_GET';

import { combineReducers } from 'redux'

const reducer = (state={}, action) => {
    if (!state) { 
        state = {}
    }

    switch(action.type){
        case ADD_QUESTION:
            return {questions: [...state, action.question1]}
        case MARK_QUESTION:
            return {mark_question_data:action.mark_question}
        default:
           let aClone = { ...{questions: [14]}  } ; 
            return ({
                ...aClone,   
                state   
            })
    }
}


 const requestReducer = (state = { }, action) => {
  switch (action.type) {
    case REQUEST_GET:
    //   console.log(action.request_data);
      return {
        request:'test request',
        request_data: action.request_data
      }
    default:
      return {...state}
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
          return comments;
        // dispatch(requestGet(comments))
    });
   
  }

export const requestGet = (request_data) => {
    return { type: REQUEST_GET, request_data}
}

export const fetchDataInGet = data => (dispatch, getState)  => {
    return requestComments(dispatch);
}

// export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
//     return dispatch(fetchDataInGet(subreddit))   
// }

// export const fetchDataInGet = data => (dispatch, getState)  => {
//     // dispatch(requestGet(data))  
//     // return fetch('../../client/data/comment.json')
//     // .then(response => response.json())
//     // .then(json =>{console.log(json);} ) 
//     return requestComments(dispatch);
// }


// 结合起来，返回一对象
const rootReducer = combineReducers({
//   reducer,
  requestReducer
})

export {requestReducer,rootReducer} 

