import React from 'react';

const Card = ({ cat, onBan, banList }) => {
    if (!cat) return null;
    
    const handleAttributeClick = (key, value) => {
        const attribute = `${key}:${value}`;
        onBan(attribute); 
    };

    const isAttributeBanned = (key, value) => {
        return banList.includes(`${key}:${value}`);
    };

    const attributes = [
        { key: 'Breed', value: cat.breed },
        { key: 'Origin', value: cat.origin },
        { key: 'Life Span', value: cat.lifeSpan },
        { key: 'Weight', value: cat.weight }
    ];

    return (
        <div className="cat-card">
            <img src={cat.imageUrl} alt={cat.breed} width="300" className="cat-image" />
            <div className="cat-info" style={{ width: '100%' }}>
                {attributes.map((attr, index) => {
                    const isBanned = isAttributeBanned(attr.key, attr.value);
                    return (
                        <button
                            key={index}
                            className={`attribute-btn ${isBanned ? 'banned' : ''}`}
                            onClick={() => handleAttributeClick(attr.key, attr.value)}
                        >
                            <strong>{attr.key}:</strong> {attr.value}
                            {isBanned && ' ✕'}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Card;