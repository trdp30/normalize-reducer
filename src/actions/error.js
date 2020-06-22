export default function (type, error) {
  if(!type) {
    throw new Error('"type" value is required')
  }
  if(!error) {
    throw new Error('"error" value is required')
  }
  if(error && error.response && error.response.data) {
    return {
      type: type,
      error: error.response.data
    }
  } else if(error.message) {
    return {
      type: type,
      error: error.message
    }
  } else {
    return {
      type: type,
      error: error
    }
  }
}