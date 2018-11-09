<template>
<div v-if="dish" class="edit-dish container">
  <!-- v-if awaits til db populates local dish data -->
  <h2>Edit {{dish.title}} Dish</h2>
  <form @submit.prevent="EditDish">
    <!--prevent refresh on submit button. call AddDish method, which adds dish record to firestore database.-->
    <div class="field title">
      <label for="title">Dish Title:</label>
      <input type="text" name="title" v-model="dish.title">
      </div>
      <div v-for="(ing, index) in dish.ingredients" :key="index" class="field">
        <label for="ingredient">Ingredient:</label> <!-- Lists ingredients from local data -->
        <input type="text" name="ingredient" v-model="dish.ingredients[index]"> <!-- note: cannot bind to ing bc it only exists in the loop. So v-model binds to ingredients-->
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
        <!--tab pressed calls addIng method (adds ingredients to list). .prevent stops default action tab leaving input field box. text field is bind (w v-model) to data "another" -->
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p> <!-- if another field is empty (line 11/27/38) then provide feedback to fill text field (line 29/37/42)-->
        <button class="btn pink">Update Dish</button>
      </div>
  </form>
</div>
</template>

<script>
import db from '../firebase/init'
import slugify from 'slugify'

export default {
  name: 'EditDish',
  data() {
    return {
      dish: null, // see line 2
      another: null,
      feedback: null
    }
  },
  created() {
    let ref = db.collection('dishes').where('slug', '==', this.$route.params.dish_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc.data())
        this.dish = doc.data() // pass db data to local data
        this.dish.id = doc.id
      })
    })
  },
  methods: {
    EditDish() {
       if(this.dish.title){
this.feedback=null //clear feedback, in case it was filled (see else line 58)
//create a slug
this.dish.slug = slugify(this.dish.title, { //create slug for db
  replacement: '-', // replace space with dash
  remove: /[$*_+~.()'"!\-:@]/g, //regex primarily want to remove space /g - means remove these expressions globally.
  lower: true // all lowercase
})
//console.log(this.slug)
db.collection('dishes').doc(this.dish.id).update({ //send to db is async task, lines 52-55 add fields to firestore db
  title: this.dish.title,
  ingredients: this.dish.ingredients,
  slug: this.dish.slug // save slug to database; slug is used for routing url name
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
      this.dish.ingredients = this.dish.ingredients.filter(ingredient => { //delete ingredient from local data
        return ingredient != ing
      })
    },
    addIng() {
      if (this.another) {
        this.dish.ingredients.push(this.another)
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
.edit-dish {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}

.edit-dish h2 {
  font-size: 2em;
  margin: 20px auto;
}

.edit-dish .field {
  margin: 20px auto;
  position: relative
}

.edit-dish .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
