import { useState } from 'react';
import axios from 'axios';
import './App.css';
import BanList from './components/BanList';
import SeenList from './components/SeenList';
import Card from './components/Card';

const URL = 'https://api.thecatapi.com/v1/images/search?has_breeds=1';

const App = () => {
    const [cat, setCat] = useState(null);
    const [seenCats, setSeenCats] = useState([]);
    const [banList, setBanList] = useState([]);
    const [click, setClick] = useState(false);

    const fetchNewCat = async () => {
        try {
            const response = await axios.get(URL, {
                headers: {
                    'x-api-key': import.meta.env.VITE_API_KEY, 
                }
            });

            const data = response.data[0];
            let breedInfo = data.breeds?.[0] || {};

            const newCat = {
                imageUrl: data.url,
                breed: breedInfo.name || 'Unknown',
                lifeSpan: breedInfo.life_span + ' years' || 'Unknown',
                origin: breedInfo.origin || 'Unknown',
                weight: (breedInfo.weight?.imperial || 'Unknown') + ' lbs'
            };

            const isBanned = banList.some(banItem => {
                const [key, value] = banItem.split(':');
                return newCat[key.toLowerCase().replace(' ', '')]?.includes(value);
            });

            if (isBanned) {
                fetchNewCat();
                return;
            }

            setCat(newCat);
            setSeenCats(prev => [...prev, newCat]);
            setClick(true);
        } catch (err) {
            console.error("error fetching cat:", err);
        }
    };

    const handleBan = (attribute) => {
      setBanList(prev => {
          return prev.includes(attribute)
              ? prev.filter(item => item !== attribute) : [...prev, attribute];
      });
  };

    return (
      <div className="App">
        <div className="heading">
          <h1>Random Cat Generator</h1>
          <h3>Discover cats!</h3>
        </div>
    
        <button onClick={fetchNewCat}>🔀 Discover!</button>
    
        <div className="main-content">
          <SeenList cats={seenCats} cat={cat}/>
          
          <div className="cat-display">
            {click && cat && (
              <Card cat={cat} onBan={handleBan} banList={banList} />
            )}
          </div>
    
          <BanList banList={banList} onBan={handleBan} />
        </div>
      </div>
    );
};

export default App;