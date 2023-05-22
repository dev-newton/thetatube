import axios from "axios";
const LocalURL = `${process.env.REACT_APP_API_ENDPOINT}`;
/* eslint-disable import/no-anonymous-default-export */

export default {
  url: LocalURL,
  headers(fileupload = false) {
    const token = localStorage.getItem("token");

    let header = {};
    if (fileupload) {
      header["Content-type"] = "multipart/form-data";
    } else {
      header["Content-type"] = "application/json";
      header["Accept"] = "*/*";
      header["Access-Control-Allow-Origin"] = "*";
    }
    if (token && token !== undefined) {
      header["Authorization"] = `Bearer ${token}`;
    }
    return header;
  },

  createWallet(data) {
    return axios({
      method: "post",
      url: `${this.url}/wallets`,
      headers: this.headers(),
      data,
    });
  },
  fundWallet(data) {
    return axios({
      method: "post",
      url: `${this.url}/wallets/funds/manual`,
      headers: this.headers(),
      data,
    });
  },
  getWallets() {
    return axios({
      method: "get",
      url: `${this.url}/wallets`,
      headers: this.headers(),
    });
  },
  getWalletTranx(id) {
    return axios({
      method: "get",
      url: `${this.url}/transactions/wallets/${id}`,
      headers: this.headers(),
    });
  },
};
