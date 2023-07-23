import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    events: [],
    isLoaded: false,
  },
  mutations: {
    setData(state, events) {
      state.events = events;
    },
    setLoaded(state, isLoaded) {
      state.isLoaded = isLoaded;
    },
  },
  actions: {
    async getData({ commit }) {
      await axios
        .get("https://simple-events-api.onrender.com/events")
        .then((response) => {
          const newArray = response.data.map((item, index) => {
            return {
              index: index,
              value: item,
            };
          });
          commit("setData", newArray);
          commit("setLoaded", true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  getters: {
    getData(state) {
      return state.events;
    },
    getIsLoaded(state) {
      return state.isLoaded;
    },
  },
});
