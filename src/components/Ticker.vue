<template>
  <div class="flex">
    <div class="max-w-xs">
      <label for="wallet" class="block text-sm font-medium text-gray-700"
        >Тикер</label
      >
      <div class="mt-1 relative rounded-md shadow-md">
        <input
          type="text"
          name="wallet"
          id="wallet"
          class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          placeholder="Например DOGE"
          v-model="tickerItem"
        />
      </div>
      <div class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
        <span
          class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
        >
          BTC
        </span>
        <span
          class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
        >
          DOGE
        </span>
        <span
          class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
        >
          BCH
        </span>
        <span
          class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer"
        >
          CHD
        </span>
      </div>
      <!--      <div class="text-sm text-red-600">Такой тикер уже добавлен</div>-->
    </div>
  </div>
  <button
    @click="addNewTicker"
    type="button"
    class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
  >
    <svg
      class="-ml-0.5 mr-2 h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="#ffffff"
    >
      <path
        d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      ></path>
    </svg>
    Добавить
  </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Ticker",
  data() {
    return {
      tickerItem: "",
      price: "-",
      graph: null
    };
  },
  computed: {
    ...mapGetters(["allTickers"])
  },
  methods: {
    addNewTicker() {
      const currentTicker = {
        name: this.tickerItem,
        price: this.price
      };
      setInterval(async () => {
        const prices = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${currentTicker.name}&tsyms=USD&api_key=3548fdebe1011581b91d36dcca2387a94b1fa91de80804bda50174ff50147a72`
        );
        const data = await prices.json();
        this.allTickers.find(item => item.name === currentTicker.name).price =
          data.USD;
      }, 5000);

      this.$store.commit("newTicker", currentTicker);
      this.tickerItem = "";
    }
  }
};
</script>

<style scoped></style>
