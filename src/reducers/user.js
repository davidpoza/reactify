import { getPosts } from '../actions/user';

const initialState = {
  isLoading: false,
  posts: [],
  error: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case String(getPosts.fulfilled):
      return {
        ...state,
        posts: action.payload,
        error: false
      };
    default:
      return state;
  }
}

export default reducer;
