import * as functions from 'firebase-functions';
const admin = require('firebase-admin');
admin.initializeApp();
const axios = require('axios');

// set external dat in internal db
export const onValuationFlatCreate = functions.database
  .ref('/valuation/{valuationId}')
  .onCreate((snapshot, context) => {
    const valuationId = context.params.valuationId
    const endPointUrl = 'https://api.propertydata.co.uk/sold-prices?key=ZWEMVOCUO2&type=flat&postcode='
    const valuationData = snapshot.val()
    const postcode = valuationData.postcode
    const endPointFull = endPointUrl + postcode;
    return axios.get(endPointFull)
    .then((response:any) => {
      const propertyData = response.data;
      console.log(propertyData);
      return admin.database().ref(`/valuation/${valuationId}/externalData/flat`).update(propertyData.data);
    })
})
export const onValuationDetachedCreate = functions.database
  .ref('/valuation/{valuationId}')
  .onCreate((snapshot, context) => {
    const valuationId = context.params.valuationId
    const endPointUrl = 'https://api.propertydata.co.uk/sold-prices?key=ZWEMVOCUO2&type=detached_house&postcode='
    const valuationData = snapshot.val()
    const postcode = valuationData.postcode
    const endPointFull = endPointUrl + postcode;
    return axios.get(endPointFull)
    .then((response:any) => {
      const propertyData = response.data;
      return admin.database().ref(`/valuation/${valuationId}/externalData/detached`).update(propertyData.data);
    })
})
export const onValuationSemiDetachedCreate = functions.database
  .ref('/valuation/{valuationId}')
  .onCreate((snapshot, context) => {
    const valuationId = context.params.valuationId
    const endPointUrl = 'https://api.propertydata.co.uk/sold-prices?key=ZWEMVOCUO2&type=semi-detached_house&postcode='
    const valuationData = snapshot.val()
    const postcode = valuationData.postcode
    const endPointFull = endPointUrl + postcode;
    return axios.get(endPointFull)
    .then((response:any) => {
      const propertyData = response.data;
      return admin.database().ref(`/valuation/${valuationId}/externalData/semi-detached`).update(propertyData.data);
    })
})
export const onValuationTerracedCreate = functions.database
  .ref('/valuation/{valuationId}')
  .onCreate((snapshot, context) => {
    const valuationId = context.params.valuationId
    const endPointUrl = 'https://api.propertydata.co.uk/sold-prices?key=ZWEMVOCUO2&type=terraced_house&postcode='
    const valuationData = snapshot.val()
    const postcode = valuationData.postcode
    const endPointFull = endPointUrl + postcode;
    return axios.get(endPointFull)
    .then((response:any) => {
      const propertyData = response.data;
      return admin.database().ref(`/valuation/${valuationId}/externalData/terraced`).update(propertyData.data);
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
    .then((response:any) => {
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
      .then((response:any) => {
        const demoData = response.data;
        return admin.database().ref(`/valuation/${valuationId}/demoData`).update(demoData.data);
      })
    })
