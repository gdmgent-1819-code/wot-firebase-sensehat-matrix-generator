/*
Imports
*/
const firebaseAdmin = require('firebase-admin');
const chalk = require('chalk');
const log = console.log;

/*
Configuration
*/
const firebaseServiceAccount = require('../wot-1819-firebase-adminsdk-rdty1-991832ff0a.json');

/*
Initialisation
*/
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
  databaseURL: 'https://wot-1819.firebaseio.com'
});

/*
Retrieve the references to firebase services
*/
const firestore = firebaseAdmin.firestore();
const matricesRef = firestore.collection('/matrices');

/*
Get the matrix with id:
*/
const matrixId = '2eUypCyuAFOY6Kt0rM3k';
/*matricesRef.doc(matrixId).get().then((snapshot) => {
  console.log(snapshot.data());
}).catch((error) => {
  console.log(error);
});*/

const observer = matricesRef.doc(matrixId).onSnapshot(docSnapshot => {
  const id = docSnapshot.id;
  const matrix = { id, ...docSnapshot.data() };
  log(chalk`
|============================|
| Update Matrix
| id: ${ matrix.id }
| nRows: ${ matrix.nRows }, ncols: ${matrix.nCols}
|----------------------------|
${generateChalkMatrix(8, 8, matrix.pattern)}
  `);
}, err => {
  console.log(`Encountered error: ${err}`);
});

function generateChalkMatrix(nRows, nCols, pattern) {
  let tempStr = '';
  for (let r = 0; r < nRows; r++) {
    for(let c = 0; c < nCols; c++) {
      const led = pattern[c + nRows * r];
      tempStr += chalk`{rgb${led} H}`;
    }
    tempStr += '\r\n';
  }
  return tempStr;
}