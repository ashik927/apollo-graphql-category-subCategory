import { FOO, ISMOBILE,CATEGORY_UPDATE } from "../actionTypes";
import { HYDRATE } from "next-redux-wrapper";
const reducer = (state = { foo: "",isMobile:false }, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    case FOO:
      return { ...state, foo: action.payload };
    case CATEGORY_UPDATE:
      debugger
      return { ...state, foo: action.payload };
    case ISMOBILE:
      return { ...state, isMobile: action.payload };
    default:
      return state;
  }
};

export default reducer;
