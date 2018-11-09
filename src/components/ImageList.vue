<template>
<div>
<img v-for="image in allImages" :src="image.link"/> <!--.link property has url for image -->
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';


export default {
name: 'ImageList',
computed: mapGetters(['allImages']), //store/modules/images.js - our getters is called allImages
methods: mapActions(['fetchImages']),
created(){
  this.fetchImages();
}
};
</script>