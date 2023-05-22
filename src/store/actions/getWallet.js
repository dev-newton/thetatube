import API from "../../assets/api";
import { GET_WALLETS, GET_WALLET_TRANX } from "./types";

export const postWallet = (data) => async (dispatch) => {
  try {
    await API.createWallet(data);
  } catch (error) {
    throw error.response.data.message;
  }
};

export const fundWallet = (data) => async (dispatch) => {
  try {
    await API.fundWallet(data);
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getWallets = () => async (dispatch) => {
  try {
    const res = await API.getWallets();
    dispatch({
      type: GET_WALLETS,
      payload: res.data,
    });
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getWalletTranx = (id) => async (dispatch) => {
  try {
    const res = await API.getWalletTranx(id);
    dispatch({
      type: GET_WALLET_TRANX,
      payload: res.data,
    });
  } catch (error) {
    throw error.response.data.message;
  }
};
