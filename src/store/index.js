import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import images from './modules/images'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth, //gives modules/images.js line 13 rootState.auth access
    images
  }
});