import { GET_WALLETS, GET_WALLET_TRANX } from "../actions/types";

const initialState = {
  wallets: [],
  wallet_tranx: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WALLETS:
      return {
        ...state,
        wallets: action.payload,
      };
    case GET_WALLET_TRANX:
      return {
        ...state,
        wallet_tranx: action.payload,
      };

    default:
      return state;
  }
}
