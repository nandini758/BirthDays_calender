import React, { useState, useEffect, useCallback } from 'react';
import BirthdaysList from './MyComponent/BirthdayList';
import FavouritesList from './MyComponent/FavouritesList';
import axios from 'axios';
import debounce from 'lodash.debounce';
import './App.css'

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const addToFavourites = (birthday) => {
    setFavourites([...favourites, birthday]);
  };

  const fetchBirthdays = async (query) => {
    try {
      const response = await axios.get(
        `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births`
      );
      const birthdays = response.data.births.filter((birthday) =>
        birthday.text.toLowerCase().includes(query.toLowerCase())
      );

      const results = birthdays.map(birthday => {
        const birthDate = new Date(birthday.birth_date);
        return {
          name: birthday.text,
          month: birthDate.toLocaleString('default', { month: 'long' }),
          date: birthDate.getDate()
        };
      });

      setSearchResults(results);

      if (results.length === 0) {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching birthdays:', error);
    }
  };

  const debouncedFetchBirthdays = useCallback(debounce(fetchBirthdays, 300), []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      debouncedFetchBirthdays(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, debouncedFetchBirthdays]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Birthdays Calendar</h1>
      <input
        type="date"
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search by name"
      />
      {selectedDate && (
        <BirthdaysList date={selectedDate} addToFavourites={addToFavourites} />
      )}
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <p>Name: {result.name}</p>
                <p>Month: {result.month}</p>
                <p>Date: {result.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <FavouritesList favourites={favourites} date={selectedDate} />
    </div>
  );
};

export default App;
