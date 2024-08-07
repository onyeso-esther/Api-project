import React, { useState } from 'react';
import './Search.css';
import book from "../Search/book.jpg"

function Search() {
  const [userInput, setUserInput] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getUserDetails() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`);
      if (!response.ok) {
        throw new Error('word not found');
      }
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="Search">
      <img src={book}/>
      <h1> Words and meanings</h1>
      <input className='input'
        type="text"
        placeholder="search for a word"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={getUserDetails} className='btn'>Get Meaning</button>

      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {data && data.length > 0 && (
        <div>
          {data.map((item, index) => (
            <div key={index}>
              <p>Word: {item.word}</p>
              <p>Source URL: <a href={item.sourceUrls[0]} target="_blank" rel="noopener noreferrer">{item.sourceUrls[0]}</a></p>
              {item.meanings.map((meaning, idx) => (
                <div key={idx}>
                  <p>Part of Speech: {meaning.partOfSpeech}</p>
                  <p>Definition: {meaning.definitions[0].definition}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;


















































// import { useState } from "react"
// import "./Search.css";


// function Search() {
//   const [userInput, setUserInput] = useState("");
//   const [data, setData] = useState([{}]);



// async function getUserDetails() {
//   const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`);
//   console.log(response);
//   const newData = await response.json();
//   setData(newData)
//   console.log("This is the json response", newData);
// }
//   return(
//     <div className="Search">
//       <input 
//       type="text" 
//       placeholder="search for a word"
//       value={userInput}
//       onChange={(e) => setUserInput(e.target.value)}>
//         </input>

//         <button onClick={getUserDetails}>Get Meaning</button>

//         {data && data.length > 0 ? (
//           <div>
//             {data.map((item, index) => (
//               <div key={index}>
//                 <p>{item.word} </p>
//                 <p>{item.sourceUrls} </p>
//                 <p>{item.meanings [0]} </p>
//                 </div>
//             ))}
//           </div>
//         ) : (
//           <p>Loading data...</p>
// )}

        
        
          
//     </div>
//   );
// }

// export default Search;