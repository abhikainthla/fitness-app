import React, { useState, useEffect } from "react";
import Gallery from "./Gallery";
import Card from "./Card";
import axios from 'axios';

function Home() {
  const imgSrc = [
    "https://www.pixelstalk.net/wp-content/uploads/images6/Fitness-Desktop-Wallpaper.jpg",
    "https://wallpaperaccess.com/full/1087621.jpg",
    "https://i.ytimg.com/vi/gey73xiS8F4/maxresdefault.jpg",
    "https://wallpapercave.com/wp/wp6331008.jpg",
    "https://img.freepik.com/premium-photo/woman-training-gym_946657-755.jpg",
  ];

  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [cards, setCards] = useState(10);


  function handleLoadMore(){
    setCards(prevCards => prevCards + 10); 
  }
 useEffect(() => {
    callApi();
  }, [cards]);

  async function callApi() {
    const options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises',
      params: { limit: cards },
      headers: {
        'X-RapidAPI-Key': 'e82d5c875dmshcfd6aec909d5a84p156141jsna0e2ee391f05',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setResult(response.data);
      setFilteredResult(response.data); 
    } catch (error) {
      console.error(error);
    }
  }

  function handleInputChange(event) {
    const inputValue = event.target.value;
    setQuery(inputValue);
    const filtered = result.filter(item => 
      item.name.toLowerCase().includes(inputValue.toLowerCase()) || 
      item.target.toLowerCase().includes(inputValue.toLowerCase()) || 
      item.bodyPart.toLowerCase().includes(inputValue.toLowerCase()) 
    );
    setFilteredResult(filtered);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1 className="title">Where Fitness Meets Fun and <br/> Results Are Achieved</h1>
        <p className="subtitle">
          Include an inspiring image or video that showcases your gym's<br/>
          energetic atmosphere, trainers, or members working out.
        </p>
      </div>
      <div className="image-section">
        {imgSrc.map((item, index) => (
          <Gallery src={item} key={index} />
        ))}
      </div>
      <hr/>

      <div className="input-container">
        <h2 className="exe-list">Exercise List</h2>
        <input 
          className="input" 
          type="text" 
          placeholder="Search by target, body part or exercise..." 
          value={query} 
          onChange={handleInputChange}
        />
      </div>

      <div className="cards">
        {filteredResult.map((item, index) => (
          <Card key={index} img={item.gifUrl} bodyPart={item.bodyPart} name={item.name} target={item.target} />
        ))}
      </div>
      <div className="button">
        <button className="btn" onClick={handleLoadMore}>Load More</button>
      </div>
    </div>
  );
}

export default Home;
