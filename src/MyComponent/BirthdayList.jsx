import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BirthdaysList = ({ date, addToFavourites }) => {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    const fetchBirthdaysByDate = async () => {
      const month = date.getMonth() + 1;
      const day = date.getDate();
      try {
        const response = await axios.get(
          `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${month}/${day}`
        );
        // console.log(response)
        setBirthdays(response.data.births);
      } catch (error) {
        console.error('Error fetching birthdays:', error);
      }
    };

    if (date) {
      fetchBirthdaysByDate();
    }
  }, [date]);

  return (
    <div>
      <h2>Birthdays on {date.toDateString()}</h2>
      <ul>
        {birthdays.map((birthday, index) => (
          <li key={index}>
            {birthday.text} ({birthday.year})
            <button onClick={() => addToFavourites(birthday)}>Add to Favourites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BirthdaysList;
