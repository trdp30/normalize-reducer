import catchError from './error';
import success from './success';
import initiate from './initiate';
import normalizeData from './normalizeData';
const normalizr = require('normalizr');

const normalize = {
  catchError, success, initiate, normalizeData, normalizr
}

export default normalize;