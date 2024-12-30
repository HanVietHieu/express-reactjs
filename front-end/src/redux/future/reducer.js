import { TYPE_BITEL_AIRTIME } from "./type";
const initialState = {
    revenue: [],
  };
  
export const reducerAirtimeBitel = (state = initialState, action) => {
    switch (action.type) {
      case TYPE_BITEL_AIRTIME:
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };