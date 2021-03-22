import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default createStore({
  state: {
    recentSearchs: [],
  },

  mutations: {
    addSearchToRecent(state, recentSearch) {
      const searchs = state.recentSearchs.filter((search) => {
        return recentSearch.trim().toLowerCase() !== search.trim().toLowerCase()
      })

      state.recentSearchs = [recentSearch, ...searchs.splice(0, 4)]
    },

    removeRecentSearch(state, index) {
      state.recentSearchs.splice(index, 1);
    }
  },

  getters: {
    getRecentSearchs: ({ recentSearchs }) => recentSearchs
  },

  plugins: [vuexLocal.plugin]
})
