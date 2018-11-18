import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
const axios = require('axios');
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const onValuationCreate = functions.database
  .ref('/valuation/{valuationId}')
  .onCreate((snapshot, context) => {
    const valuationId = context.params.valuationId
    console.log('New Valuation' + valuationId)
    const endPointUrl = 'https://api.propertydata.co.uk/prices-sold?key=ZWEMVOCUO2&postcode='
    const valuationData = snapshot.val()
    const postcode = "HU15 2QW"
    console.log('new post code: ' + valuationData.postcode)
    const endPointFull = endPointUrl + postcode
    console.log(endPointFull)
    axios.get(endPointFull)
    .then(response => {
      const propertyData = JSON.stringify(response.data);
      try {
        var newObj = JSON.parse(propertyData);
        console.dir("new obj: " + newObj);
      } catch (ex) {
        console.error(ex)
      }
      console.log('this is the data: ' + propertyData);
    })

    // Send to Firebase
  return Promise}

)
