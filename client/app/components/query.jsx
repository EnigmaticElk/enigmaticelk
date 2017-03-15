import React from 'react';

const Query = () => (
  <div>
    Origin: <input type="text" />
    Destination: <input type="text" />
    Time of day: <select>
      <option>Day</option>
      <option>Night</option>
    </select>
  </div>
);

export default Query;