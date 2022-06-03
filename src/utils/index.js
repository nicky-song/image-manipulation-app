import { omit } from 'lodash';
const queryString = require('query-string');

export const generateImageUrl = (attrs) => {
  if (!attrs) return null;

  const src = attrs.src;
  const payload = omit(attrs, ['src']);
  const url = src + '?' + queryString.stringify(payload, { skipEmptyString: true, skipNull: true });

  return url;
};
