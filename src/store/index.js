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
        selectGH:"A",
        selectIdGH: 0,
        selectAdress: "B",
        page : "",
        tresholdMoist: 0,
        tresholdLight:0,
        tresholdHumidity:0,
        tresholdTemp:0,
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
        setIdGH(state, payload){
            state.selectIdGH = payload;
        },
        setAdressGH(state, payload){
            state.selectAdress = payload;
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
        },
        setTresholdMoist(state, payload){
            state.tresholdMoist = payload;
        },
        setTresholdLight(state, payload){
            state.tresholdLight = payload;
        },
        setTresholdHumidity(state, payload){
            state.tresholdHumidity = payload;
        },
        setTresholdTemp(state, payload){
            state.tresholdMoist = payload;
        },
    },
    actions: {
        selectGH(store, param){
            store.commit("setGH", param);
        },
        selectIdGH(store, param){
            store.commit("setIdGH", param);
        },
        selectAdressGH(store, param){
            store.commit("setAdressGH", param);
        },
        updateTreshold(store, param){
            store.commit("setTreshold", param);
        },
        updateTresholdMoist(store, param){
            store.commit("setTresholdMoist", param);
        },
        updateTresholdLight(store, param){
            store.commit("setTresholdLight", param);
        },
        updateTresholdHumidity(store, param){
            store.commit("setTresholdHumidity", param);
        },
        updateTresholdTemp(store, param){
            store.commit("setTresholdTemp", param);
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