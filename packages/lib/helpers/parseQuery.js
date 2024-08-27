export default (url) => {
  if (!url) {
    return null;
  }
  let queryString = `?${url.split('?')[1]}`;

  let query = {};
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');

  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}