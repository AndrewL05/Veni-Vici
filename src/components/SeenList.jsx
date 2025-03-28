import { useState, useEffect } from 'react';

const SeenList = ({ cats, cat }) => {
    return (
        <div className="seen-list">
            <h2>Cats seen so far:</h2>
            <ul>
                {cats.map((cat, index) => (
                    <li key={index}>
                        A {cat.breed} cat from {cat.origin}
                        <img src={cat.imageUrl} alt={cat.breed} className="seen-list-image"/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SeenList;