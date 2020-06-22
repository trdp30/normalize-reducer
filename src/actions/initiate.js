import catchError from './error';

export default function(type) {
  if(!type) {
    return catchError()
  }
  return { type: type }
}