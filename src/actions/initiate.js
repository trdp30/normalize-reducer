export default function(type) {
  if(!type) {
    throw new Error('"type" is required')
  }
  return { type: type }
}