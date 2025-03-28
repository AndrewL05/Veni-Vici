import React from 'react';

const BanList = ({ banList, onBan }) => {
    return (
        <div className="ban-list">
            <h2>Ban List</h2>
            <h3>Select an attribute in your listing to ban it</h3>
            <div className="current-bans">
                {banList.length > 0 ? (
                    banList.map((item, index) => (
                        <div 
                            key={index} 
                            className="ban-item"
                            onClick={() => onBan(item)} 
                        >
                            {item}
                        </div>
                    ))
                ) : (
                    <p>No attributes banned yet</p>
                )}
            </div>
        </div>
    );
};

export default BanList;