<template>
<div class="add-dish container">
  <h2 class="center-align indigo-text">Add New Dish or Drink</h2>
  <form @submit.prevent="AddDish"> <!--prevent refresh on submit button. call AddDish method, which adds dish record to firestore database.-->
    <FileUploaderMain />
    <UploaderForm />
    <div class="field title">
      <label for="title">Dish Title:</label>
      <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, index) in ingredients" :key="index" class="field">
      <label for="ingredient">Ingredient:</label> <!-- Lists ingredients from local data -->
      <input type="text" name="ingredient" v-model="ingredients[index]"> <!-- note: cannot bind to ing bc it only exists in the loop. So v-model binds to ingredients-->
      <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
<div class="field add-ingredient">
      <label for="add-ingredient">Add an ingredient:</label>
      <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another"> <!--tab pressed calls addIng method (adds ingredients to list). .prevent stops default action tab leaving input field box. text field is bind (w v-model) to data "another" -->
</div>
      <div class="field center-align">
      <p v-if="feedback" class="red-text">{{feedback}}</p> <!-- if another field is empty (line 11/27/38) then provide feedback to fill text field (line 29/37/42)-->
        <button class="btn pink">Add Dish</button>
      </div>
  </form>
</div>
</template>

<script>
import db from '../firebase/init'
import slugify from 'slugify'
import FileUploaderMain from './FileUploaderMain.vue'
import UploaderForm from './UploaderForm.vue'

export default {
  name: 'AddDish',
  components: {
    FileUploaderMain,
    UploaderForm
  },
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    }
  },
  methods: {
    AddDish(){ // add record to firestore db on line 52.
     // console.log(this.title, this.ingredients)
      if(this.title){
this.feedback=null //clear feedback, in case it was filled (see else line 58)
//create a slug
this.slug = slugify(this.title, { //create slug for db
  replacement: '-', // replace space with dash
  remove: /[$*_+~.()'"!\-:@]/g, //regex primarily want to remove space /g - means remove these expressions globally.
  lower: true // all lowercase
})
//console.log(this.slug)
db.collection('dishes').add({ //send to db is async task, lines 52-55 add fields to firestore db
  title: this.title,
  ingredients: this.ingredients,
  slug: this.slug // save slug to database; slug is used for routing url name
}). then(() => {
  this.$router.push({name: 'Index'}) //send back to index/homepage
}).catch(err => {
  console.log(err) // log any errors
})
      } else{
        this.feedback = 'You must enter a title' // notify user title field is empty
      }
    },
        deleteIng(ing) {
  this.ingredients = this.ingredients.filter(ingredient => { //delete ingredient from local data
        return ingredient != ing
})
    },
    addIng(){
      if(this.another){
this.ingredients.push(this.another) //push this.another line 11/26 text field to ingredients list (line 27).
//console.log(this.ingredients),
this.another = null
this.feedback = null
      } else {
        this.feedback = "You must enter a value to add an ingredient"
      }
    }
  }
}
</script>

<style>
.add-dish{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-dish h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-dish .field{
  margin: 20px auto;
  position: relative
}
.add-dish .delete{
position: absolute;
right: 0;
bottom: 16px;
color: #aaa;
font-size: 1.4em;
cursor: pointer;
}
</style>
