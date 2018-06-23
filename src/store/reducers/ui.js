import { ON_LOADING_END, ON_LOADING_START } from '../actions/ui';

const initialState = {
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOADING_END:
      return {
        ...state,
        loading: false,
      };
    case ON_LOADING_START:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default reducer;
