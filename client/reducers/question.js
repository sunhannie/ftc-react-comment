const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const MARK_QUESTION = 'MARK_QUESTION';
const REQUEST_GET = 'REQUEST_GET';
const REQUEST_POST = 'REQUEST_POST';
const REQUEST_AJAX = 'REQUEST_AJAX';
import { combineReducers } from 'redux'
import {SetCookie,isLocal} from '../../util/api'

const initialState = {
  comments: [],
  users: {}
}

const reducer = (state=initialState.users, action) => {
    if (!state) { 
        state = {}
    }
    switch(action.type){
        case ADD_COMMENT:
            return {questions: [...state, action.dataAdded]}
        case DELETE_COMMENT:
            return {questions: [
          ...state.questions.slice(0, action.indexDeleted),
          ...state.questions.slice(action.indexDeleted + 1)
        ]}
        case MARK_QUESTION:
            return {mark_question_data:action.mark_question}
        case REQUEST_AJAX:
            return { ...state,
                users: action.request_ajax
            }
        default:
            return {...state}
    }
}


 const requestReducer = (state=initialState.comments, action) => {   
  switch (action.type) {  
    case REQUEST_GET:
        state=action.request_data;    
    //   return {
    //       ...state, 
    //       comments:action.request_data
    //     }
        return action.request_data
    default:
        // initialState = state;
    //   console.log(state);  //数组就可以，默认的state值会用上次的state值
      return state 
        //为什么不能返回initialState
  }
}

const requestPostReducer = (state = { }, action) => {
  switch (action.type) {
    case REQUEST_POST:
    console.log('REQUEST_POST');
      return action.request_post
    default:
      return state
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
    const url = 'http://localhost:3002/';  //设置mode: 'cors'，这个能get到'http://localhost:3001/'网址
    const init = {
      method:  'POST',
      headers:{ 
        "Content-Type": "application/x-www-form-urlencoded"
      },
      mode: 'cors',
      credentials: 'include',
      body: data
    }
    fetch(url,init)
      .then(res => {
          return res.json()
        })
      .then( json => { 
          console.log(JSON.stringify(json));  //得出的值为什么是键
    });  
}
// 发现一个现象，ajax请求会请求2此，fetch是一次，这是为什么？加上xhr.readyState === XMLHttpRequest.DONE 执行一次
function ajax(dispatch,obj) {
    let url = '';
    if(isLocal()){
      url = 'http://localhost:3002/checkemail'
    }else{
      url = '/ajax/checkemail'
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);              
    xhr.setRequestHeader('Content-Type', 'text/plain');
    xhr.onreadystatechange = () => {    
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { 
          var res = xhr.responseText; 
          var res1 = JSON.parse(res);
          dispatch(requestAjax(res1))
        }
    }
    
    xhr.send(JSON.stringify(obj));  
}


export const addComment = (dataAdded) => {
    return { type: ADD_COMMENT, dataAdded}
}
// 删除评论，应该怎么更新state，state包含什么呢？隐藏那个标签，按理是更新comment总值的，可以使用一个json对象来仿真
export const deleteComment = (indexDeleted) => {
    return { type: DELETE_COMMENT, indexDeleted}
}

export const requestGet = (request_data) => {
    return { type: REQUEST_GET, request_data}
}

export const requestPost = (request_post) => {
    return { type: REQUEST_POST, request_post}
}

export const requestAjax = (request_ajax) => {
    return { type: REQUEST_AJAX, request_ajax}
}

export const fetchDataInGet = data => (dispatch, getState)  => {
    return requestComments(dispatch);
}

export const fetchDataInPost = data => (dispatch, getState)  => {
    return postComments(dispatch,data);
}

export const fetchDataInAjax = data => (dispatch, getState)  => {
    return ajax(dispatch,data);
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

// state.requestReducer会跟随action.type跟新变化
// 结合起来，返回一对象
const rootReducer = combineReducers({
  reducer,
  requestReducer,
  requestPostReducer
})

export {requestReducer,rootReducer} 

