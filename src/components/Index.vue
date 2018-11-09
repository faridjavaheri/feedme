<template>
<div class="index container">
  <div class="card" v-for="dish in dishes" :key="dish.id">
    <div class="card-content">
    <h2 class="indigo-text">{{dish.title}}</h2>
      <i class="material-icons delete" @click="deleteDish(dish.id)">delete</i>
      <ul class="ingredients">
        <li v-for="(ing, index) in dish.ingredients" :key="index">
        <span class="chip">{{ing}}</span>
        </li>
      </ul>
    </div>
    <span class="btn-floating btn-large halfway-fab pink">
    <router-link :to="{name: 'EditDish', params: {dish_slug: dish.slug} }">
    <i class="material-icons edit">edit</i>
    </router-link> <!-- name: provides root url. :dish_slug binding on index.js line 22 to dish.slug name from db -->
    </span>
  </div>

</div>
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'Index',
  data() {
    return {
      dishes: []
    }
  },
  methods: {
    deleteDish(id) {
db.collection('dishes').doc(id).delete() // delete dish from firestore backend
.then(() => {
  this.dishes = this.dishes.filter(dish => { //delete dish from local data
        return dish.id != id
})

      //console.log(id) // nocice: id is the firebase id

     /* this.dishes = this.dishes.filter(dish => {
        return dish.id != id */
      })
    }
  },
  created(){
    db.collection('dishes').get()
    .then(snapshot => { //snapshot is state of collection at current point in time
      snapshot.forEach(doc => { // document is 1 dish
        //console.log(doc.data(), doc.id)
        let dish = doc.data() // pass db doc data to var/let for local data dish
        dish.id = doc.id // pass doc id to dish id.
        this.dishes.push(dish) // push dish to local data dishes
      })
    })
  }
}
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .ingredients {
  margin: 30px auto;
  /* 30px top and bottom */
}

.index .ingredients li {
  display: inline-block;
}

.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
