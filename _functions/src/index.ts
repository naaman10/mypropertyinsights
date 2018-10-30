import * as functions from 'firebase-functions';
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
  const postcode = valuationData.postcode
  console.log('new post code: ' + valuationData.postcode)
  const endPointFull = endPointUrl + postcode
  console.log(endPointFull)
})
