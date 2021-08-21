import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react'


function App() {
  let [movieinfo,setMovieinfo] = useState(null);
  let [title,setTitle] = useState("the avengers");
useEffect(()=>{
  getMovieData();
},[])

function readTitle(value){
  setTitle(value);
}
function getMovieData(){
  let url = `https://omdbapi.com/?t=${title}&apikey=d840536f`;
  fetch(url)
  .then((response)=>response.json())
  .then((movie)=>{
    setMovieinfo(movie);
  })
  .catch((err)=>{
    console.log(err);
  })
}
  return (
    <div className="App">
        <div className="container">
          <div className="padd">
            <h1>Movie Search</h1>
            <div className="ip-group">
              <input type="text" placeholder="Enter movie name" className="search-field" onChange={(event)=>{readTitle(event.target.value)}}/>
              <button onClick={getMovieData}>Get Movie</button>
            </div>
            {
              movieinfo?.Error===undefined?(
            <div className="movie">
              <div className="poster">
                <img src={movieinfo?.Poster} className="poster-img"/>
              </div>
              <div className="details">
                <div className="padd">
                  <h1>{movieinfo?.Title}</h1>
                  <p><strong>Genre: </strong>{movieinfo?.Genre}</p>
                  <p><strong>Directed By: </strong>  {movieinfo?.Director}</p>
                  <p><strong>Plot: </strong>{movieinfo?.Plot}</p>
                  <p><strong>Actors: </strong>{movieinfo?.Actors}</p>
                  <p><strong>BoxOffice: </strong>{movieinfo?.BoxOffice}</p>
                  <p><strong>Language: </strong>{movieinfo?.Language}</p>
                  <p><strong>Release Date: </strong>{movieinfo?.ReleaseDate}</p>
                  <p><strong>Runtime: </strong>{movieinfo?.Runtime}</p>
                  <div>
                    <div>
                      <strong>{movieinfo?.Ratings[0].Source} </strong><h3>{movieinfo?.Ratings[0].Value}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              ):(
                <h1>Movie Not Found!</h1>
              )}
          </div>
        </div>
    </div>
  );
}

export default App;
