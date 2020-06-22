const normalizr = require('normalizr');
const { normalize } = normalizr;
import success from './success';

export default function({ response, type, schemaType, relationShips, modelName }) {
  if(!type) {
    throw new Error('"type" value is required')
  }
  if(!response) {
    throw new Error('"response" value is required')
  }
  if(!schemaType) {
    throw new Error('"schemaType" value is required')
  }
  return function(dispatch) {
    if(!dispatch) {
      throw new Error('"normalizeData" should dispatch from a redux action')
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