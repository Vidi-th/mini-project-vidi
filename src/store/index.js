import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
const persistedDataState = createPersistedState({
    paths: ["treshold"],
});

export default new Vuex.Store({
    plugins:[persistedDataState],
    state:{
        selectGH:"GH_Surabaya",
        page : "",
        treshold:[],
        moistNow: 0,
        lightNow: 0,
        humidityNow: 0,
        co2Now: 0,
        tempNow: 0,
    },
    mutations:{
        setGH(state, payload){
            state.selectGH = payload;
        },
        setTreshold(state, param){
            state.treshold[0] = param;
        },
        setLight(state, payload){
            state.lightNow = payload;
        },
        setHumidity(state, payload){
            state.humidityNow = payload;
        },
        setMoist(state, payload){
            state.moistNow = payload;
        },
        setCo2(state, payload){
            state.co2Now = payload;
        },
        setTemp(state, payload){
            state.tempNow = payload;
        }
    },
    actions: {
        selectGH(store, param){
            store.commit("setGH", param);
        },
        updateTreshold(store, param){
            store.commit("setTreshold", param);
        },
        updateHumidity(store,param) {
            store.commit("setHumidity", param);
        },
        updateMoist(store,param) {
            store.commit("setMoist", param);
        },
        updateLight(store,param) {
            store.commit("setLight", param);
        },
        updateCo2(store,param) {
            store.commit("setCo2", param);
        },
        updateTemp(store,param) {
            store.commit("setTemp", param);
        },
    }
})