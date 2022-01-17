import './App.css';
import { useEffect, useState } from 'react';
// import axios 
import axios from 'axios';

function App() {
  // variable for api that gets passed in useEffect params object
  const apiKey = 'TC93LdU0'

  // destructure the array for useState look up useState lesson
  const [art, setArt] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Make an API to the Rijks Meseum API
  useEffect(() => {
    axios({
      url: 'https://www.rijksmuseum.nl/api/en/collection',
      method: 'GET',
      dataResponse: 'json',
      // this is where you would put all the search params from the api docs
      params: {
        key: apiKey,
        imgonly: true,
        // need to put searchTerm in the array below \/
        q: searchTerm
      }
    }).then((response) => {
      console.log(response.data.artObjects);
      // it useState into state
      setArt(response.data.artObjects);
    });
  }, [searchTerm])


  const handleInput = (event) => {
    console.log('is this working?', event.target.value);
    setUserInput(event.target.value);
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput);

  }


  return (
    <div className="App">
      <h1>Welcome back to the Art Museum</h1>


      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search for art:</label>

        {/* to have a user input you need to add value={userInput} */}
        <input type="text" id='search' onChange={handleInput} value={userInput} />
        <button>Search</button>
      </form>

      {/* what to return on the page */}
      {art.map((artwork) => {
        return (
          <div key={artwork.id}>
            <h2>{artwork.longTitle}</h2>
            <img src={artwork.webImage.url} alt={artwork.title} />
          </div>
        )
      })}
    </div>
  );
}

export default App;
