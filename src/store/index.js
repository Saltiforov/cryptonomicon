import { createStore } from "vuex";
// import { createApp } from 'vue'

export default createStore({
  state: {
    tickers: []
  },
  getters: {
    allTickers: state => {
      return state.tickers;
    }
  },
  mutations: {
    newTicker(state, payload) {
      state.tickers.push(payload);
    },
    deleteTicker(state, payload) {
      state.tickers.splice(payload, 1);
    }
    // currentTicker(state, payload) {
    //   state.tickers.push(payload);
    // }
  },
  actions: {
    getPrices(state) {
      fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${state.tickers.name}&tsyms=USD,JPY,EUR`
      );
    }
  }
});
