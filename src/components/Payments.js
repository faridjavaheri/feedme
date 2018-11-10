

<!--
//related files:
//Payments.js
//functions/index.js
// thanks to:
//https://github.com/fromAtoB/vue-stripe-elements
//https://alligator.io/vuejs/stripe-elements-vue-integration/
// https://medium.com/@jpoechill/first-demo-and-real-payments-with-firebase-stripe-and-vue-js-bd64a93b4e3b
-->

let self = this
let data = {
  token: self.token,
}
if (self.token) {
  axios.post('https://us-central1-       
    vuepaymelive.cloudfunctions.net/paystripe', data)
  .then(function (response) {
    self.charge = response.data
  })
  .catch(function (error) {
    console.log('Error');
  });
} else {
  alert('Create a token first.')
}