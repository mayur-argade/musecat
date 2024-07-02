const admin = require('firebase-admin');
const dotenv = require('dotenv');
const adminjson = require('../admin.json')

dotenv.config();

const serviceAccount = adminjson;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://muscat-ad508.firebaseio.com"
});

const db = admin.firestore();

module.exports = { db, admin };
