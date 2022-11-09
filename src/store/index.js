import router from "@/router";
import { createStore } from "vuex";

const state = {};
const getters = {};
const mutations = {
    redirectTo(state, payload) {
        router.push({ name: payload });
    },
};
const actions = {
    redirectTo({ commit }, payload) {
        commit("redirectTo", payload.link);
    },
};
const modules = {};

export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules,
});
