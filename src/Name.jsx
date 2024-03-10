import { useState } from 'react';
const Name = () => {
  const [inpWord, setInpWord] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
  const searchWord = () => {
    fetch(`${url}${inpWord}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data[0]);
      })
      .catch(() => {
        setError('Couldn\'t Find The Word');
      });
  };

  const playSound = () => {
    const sound = new Audio(`https:${data.phonetics[0].audio}`);
    sound.play();
  };

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Type the word here.."
          value={inpWord}
          onChange={(e) => setInpWord(e.target.value)}
        />
        <button onClick={searchWord}>Search</button>
      </div>
      <div className="result">
        {error ? (
          <h3 className="error">{error}</h3>
        ) : data ? (
          <>
            <div className="word">
              <h3>{inpWord}</h3>
              <button onClick={playSound}>
                <i className="fas fa-volume-up"></i>
              </button>
            </div>
            <div className="details">
              <p>{data.meanings[0].partOfSpeech}</p>
              <p>/{data.phonetic}/</p>
            </div>
            <p className="word-meaning">{data.meanings[0].definitions[0].definition}</p>
            <p className="word-example">{data.meanings[0].definitions[0].example || ''}</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Name;
