import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
const axios = require('axios');

// set external dat in internal db
export const onValuationCreate = functions.database
  .ref('/valuation/{valuationId}')
  .onCreate((snapshot, context) => {
    const valuationId = context.params.valuationId
    const endPointUrl = 'https://api.propertydata.co.uk/prices-sold?key=ZWEMVOCUO2&postcode='
    const valuationData = snapshot.val()
    const postcode = valuationData.postcode
    const endPointFull = endPointUrl + postcode;
    return axios.get(endPointFull)
    .then(response => {
      const propertyData = response.data;
      return admin.database().ref(`/valuation/${valuationId}/externalData`).update(propertyData.data);
    })
})
export const onGrowthCreate = functions.database
  .ref('/valuation/{valuationId}')
  .onCreate((snapshot, context) => {
    const valuationId = context.params.valuationId
    const valuationData = snapshot.val()
    const postcode = valuationData.postcode
    const growthEndpoint = 'https://api.propertydata.co.uk/growth?key=ZWEMVOCUO2&postcode=' + postcode;
    return axios.get(growthEndpoint)
    .then(response => {
      const growthData = response.data;
      return admin.database().ref(`/valuation/${valuationId}/growthData`).update(growthData.data);
    })
  })
export const onDemoCreate = functions.database
  .ref('/valuation/{valuationId}')
  .onCreate((snapshot, context) => {
    const valuationId = context.params.valuationId
    const valuationData = snapshot.val()
    const postcode = valuationData.postcode
    const demoEndpoint = 'https://api.propertydata.co.uk/demographics?key=ZWEMVOCUO2&postcode=' + postcode;
    return axios.get(demoEndpoint)
    .then(response => {
      const demoData = response.data;
      return admin.database().ref(`/valuation/${valuationId}/demoData`).update(demoData.data);
    })
  })
