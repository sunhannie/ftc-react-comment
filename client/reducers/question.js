const ADD_QUESTION = 'ADD_QUESTION';
const MARK_QUESTION = 'MARK_QUESTION';
const REQUEST_GET = 'REQUEST_GET';
const ADD_COUNT = 'ADD_COUNT';
import { combineReducers } from 'redux'
// 对象怎么合并？写法上需要熟悉。抓取数据，dispatch动作
export const reducer = (state, action) => {
// export default  function (state, action){  //这样写可以不写函数名
    // console.log(state);
    if (!state) { 
        state = {}
    }

    /**
     * 下一步研究的是怎么获取到默认state
     */
    // [...'hello']  
    // let aClone = Object.assign({}, [1,2,3]);
    // var aClone = {...[1,2,3]};  
    // let aClone = { ...{questions1: [14]} }; //对象和数组都是可以运行
    switch(action.type){
        case ADD_QUESTION:
            return {questions: [...state, action.question1]}
        case MARK_QUESTION:
        console.log(action.mark_question);//这里的值就是触发传过来的值，得到{answeredQ: false, valueQ: "50"}。我该怎么样把此处的值更新到页面中
            return {mark_question_data:action.mark_question}
        default:
        // 此处state是默认值，即为{}
           let aClone = { ...{questions1: [14]}  } ; 
            // console.log( { ...state });
            return ({
                ...aClone,   
                state   
            })
    }
}


export const requestReducer = (state = { }, action) => {
  switch (action.type) {
    case REQUEST_GET:
    console.log('action.request_get_data:'+action.request_get_data);
      return {
        ...state,
        request: 'request result'
      }
    case ADD_COUNT:
        return {add_count:'add_count'}
    default:
      return state
  }
}

export function addCount() {
    console.log('addCount execute');
  return {type: ADD_COUNT}
}
 
export function addCountAsync() {
  console.log('addCountAsync execute');
  return (dispatch,getState) => {
    console.log('addCountAsync dispatch'); //触发在store.dipatch，这里才起作用（也就是thunk起作用）
    setTimeout( () => {
      dispatch(addCount())
    },2000)
  }
}

// 结合起来，返回一对象
export const rootReducer = combineReducers({
  reducer,
  requestReducer
})


function requestQuestion(value) {
  
    const key = value.toLowerCase().replace(/\s/g, '-');
    const data = '../../client/data/china.json';
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
      .then(({ questions }) => {
        console.log(questions);
    });
   
  }

export const addQuestion = (question1) => {
    return { type: ADD_QUESTION, question1 }
}

export const markQuestion1 = (mark_question) => {
    return { type: MARK_QUESTION, mark_question}
}

export const requestGet = (request_get_data) => {
    return { type: REQUEST_GET, request_get_data}
}

export const fetchDataInGet = data => dispatch => {
    console.log('data'+data);
    dispatch(requestGet(data))  
    // return fetch('https://www.reddit.com/r/reactjs.json')
    // .then(response => response.json())
    // .then(json =>{console.log('json');} ) 
    return requestQuestion('zzz');
}