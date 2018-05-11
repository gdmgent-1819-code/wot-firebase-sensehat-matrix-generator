import { matricesRef } from '../config/firebase';
import { FETCH_MATRICES, FETCH_MATRIX, UPDATE_MATRIX } from './types';

export const fetchMatrices = () => async dispatch => {
  matricesRef.onSnapshot(snapshot => {
    const matrices = [];
    snapshot.forEach((doc) => {
      const { pattern } = doc.data();
      matrices.push({
        key: doc.id,
        doc,
        pattern
      })
    });
    dispatch({
      type: FETCH_MATRICES,
      payload: matrices
    });
  });
};

export const fetchMatrixById = (id) => async dispatch => {
  const docRef = matricesRef.doc(id);
  docRef.get().then((doc) => {
    if(doc.exists) {
      const id = doc.id;
      dispatch({
        type: FETCH_MATRIX,
        payload: { id, ...doc.data() }
      });
    }
  });
};

export const updateMatrix = (obj) => async dispatch => {
  const docRef = matricesRef.doc(obj.id);
  docRef.get().then((doc) => {
    if(doc.exists) {
      docRef.update({
        pattern: obj.pattern
      }).then((ref) => {
        console.log(ref);
        const id = doc.id;
        dispatch({
          type: UPDATE_MATRIX,
          payload: { id, ...doc.data() }
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  });
};