import api from '../../api/imgur'

const state = {
  images: []
};

const getters = {
  allImages: state => state.images // retrieves state object images when app boots up
};


const actions = {
  async fetchImages({ rootState, commit }) {
    const {token} = rootState.auth; //store/index.js modules auth gives rootState.auth access
    const response = await api.fetchImages(token);
    commit('setImages', response.data.data); // obtain data from imgur, pass to setImages, which resets state with images.
    //console.log(response);
  }, // Imgur API > Account > Account Images
  async uploadImages({ commit }, images) {
    console.log(images);
  }
}

const mutations = {
  setImages: (state, images) =>{
    state.images = images;
  } //replace the entire state images. assigns imgur images to local state.
};

export default {
  state,
  getters,
  actions,
  mutations
}