<template>
  <v-flex xs12 md7 offset-md1>
    <v-form>
      <v-text-field
        v-model="title"
        label="Title"
        required>
      </v-text-field>
      <file-uploader v-on:downloadURL="getDownloadUrl" v-bind:oldImgUrl="oldImgUrl" class="mb-4"></file-uploader>
    </v-form>
  </v-flex>
</template>

<script>
import db from '../firebase/init'
import FileUploader from '@/components/FileUploader'
export default {
  components: {
    FileUploader
  },
  data () {
    return {
      oldImgUrl: ''
    }
  },
  created () {
    if (this.$route.name === 'writer') this.initArticleData()
    if (this.getKey !== '') this.oldImgUrl = this.getImgUrl
  },
  computed: {
  },
  methods: {
    getDownloadUrl (v) {
      this.imgUrl = v
    },
    handleImageAdded (file, Editor, cursorLocation) {
      let uploadTask = db.ref('images/' + file.name).put(file)
      uploadTask.on('state_changed', snapshot => {
      }, error => {
        console.error(`Upload error occured: ${error}`)
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL)
          Editor.insertEmbed(cursorLocation, 'image', downloadURL)
        })
      })
    }
  }
}
</script>

<style>

</style>