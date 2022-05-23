import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
const persistedDataState = createPersistedState({
    paths: [],
});

export default new Vuex.Store({
    plugins:[persistedDataState],
    state:{
        selectGH:"GH_Surabaya",
        page : "",
    },
    mutations:{
        setGH(state, payload){
            state.selectGH = payload;
        },
    },
    actions: {
        selectGH(store, param){
            store.commit("setGH", param);
        },
    }
})