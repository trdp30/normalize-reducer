const normalizer = require('normalizr');
const { normalize } = normalizer;
import catchError from './error';
import success from './success';

export default function({ response, type, schemaType, relationShips, modelName }) {
  if(!type) {
    return catchError()
  }
  if(!response) {
    catchError(type, '"response" value is required')
  }
  if(!schemaType) {
    catchError(type, '"schemaType" value is required')
  }
  return function(dispatch) {
    if(!dispatch) {
      return catchError(type, '"normalizeData" should dispatch from a redux action')
    }
    if(response && response.data) {
      let payload = normalize(response.data, schemaType)
      if(relationShips && relationShips.length) {
        relationShips.forEach((relationShip) => {
          if(payload.entities[relationShip.modelName]) {
            dispatch(success(relationShip.actionType, {
              entities: {
                [relationShip.modelName]: payload.entities[relationShip.modelName],
              },
              result: Object.keys(payload.entities[relationShip.modelName]).map(id => parseInt(id))
            }))
          }
        })
      }
      return dispatch(success(type, payload))
    } else {
      return dispatch(success(type, normalize(response, schemaType)))
    }
  }
}