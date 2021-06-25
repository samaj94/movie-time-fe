import './MovieSearchItem.css';

/*
Props:
  Poster
  Year
  Title
  imdbID
*/
export default function MovieSearchItem({Title, imdbID, Year, Poster}) {
  return (
    <li className='MovieSearchItem' key={imdbID} alt={Title}>
      <img src={Poster} alt={`${Title || 'Unknown Movie'} Poster`}/>
      <h1>{Title.length > 17 ? `${Title.slice(0,17)}...` : Title}</h1>
      <h2>{Year}</h2>
    </li>
  );
}