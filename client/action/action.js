const ADD_QUESTION = 'ADD_QUESTION';
const MARK_QUESTION = 'MARK_QUESTION';
const REQUEST_GET = 'REQUEST_GET';

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
        dispatch(requestGet(comments))
    });
   
}

export const requestGet = (request_get_data) => {
    return { type: REQUEST_GET, request_get_data}
}

// export const fetchDataInGet = data => (dispatch, getState)  => {
//     return requestComments(dispatch);
// }