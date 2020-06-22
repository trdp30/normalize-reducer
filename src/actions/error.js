export default function (type, error) {
  if(!type) {
    throw new Error('"type" value is required')
  } else if(!error) {
    throw new Error('"error" value is required')
  }
  if(error && error.response && error.response.data) {
    return {
      type: type,
      error: error.response.data
    }
  } else {
    return {
      type: type,
      error: error
    }
  }
}