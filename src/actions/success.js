import catchError from './error';

export default function(type, payload) {
  if(!type || !payload) {
    throw new Error('Either "type" or "payload" is undefined')
  }
  if(payload && payload.data) {
    return {
      type: type,
      payload: payload.data
    }
  } else {
    return {
      type: type,
      payload: payload
    }
  }
}
