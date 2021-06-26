import { API } from "aws-amplify";

export default async function search(title) { 
  return await API.get('reviews', `/external/find/${encodeURIComponent(title)}`)
  .then((data) => data.Search)
  .catch(err => {
    console.error('ERROR', err);
    return [];
  });
};