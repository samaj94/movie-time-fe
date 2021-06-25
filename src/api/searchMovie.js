import { API } from "aws-amplify";

export default async function search(title) { 
  const results = await API.get('reviews', `/external/find/${title}`)
  .then(data => data.Search)
  .catch(err => {
    console.error('ERROR', err);
  });

  return results;
};