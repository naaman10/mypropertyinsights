"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();
const axios = require('axios');
exports.onValuationCreate = functions.database
    .ref('/valuation/{valuationId}')
    .onCreate((snapshot, context) => {
    const valuationId = context.params.valuationId;
    console.log('New Valuation' + valuationId);
    const endPointUrl = 'https://api.propertydata.co.uk/prices-sold?key=ZWEMVOCUO2&postcode=';
    const valuationData = snapshot.val();
    const postcode = valuationData.postcode; //dont forget to add back valuationData.postcode to this
    console.log('new post code: ' + valuationData.postcode);
    const endPointFull = endPointUrl + postcode;
    return axios.get(endPointFull)
        .then(response => {
        const propertyData = response.data;
        return admin.database().ref(`/valuation/${valuationId}/externalData`).update(propertyData.data);
    });
});
//# sourceMappingURL=index.js.map