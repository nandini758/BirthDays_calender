import React from 'react';
// import './FavouritesList.css';

const FavouritesList = ({ favourites,date }) => {
  return (
    <div className="favourites-list">
      <h2>Favourite Birthdays</h2>
      <ul>
        {favourites.length > 0 ? (
          favourites.map((birthday, index) => (
            <li key={index}>
              <p>{birthday.text}</p>
            </li>
          ))
        ) : (
          <li>No favourite birthdays</li>
        )}
      </ul>
    </div>
  );
};

export default FavouritesList;
