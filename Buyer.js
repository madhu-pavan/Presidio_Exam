import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Buyer() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(response => setProperties(response.data));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredProperties = properties.filter(property =>
    property.place.toLowerCase().includes(filter.toLowerCase()));

  const handleInterested = (propertyId) => {
    axios.post(`http://localhost:5000/api/properties/${propertyId}/interested`)
      .then(response => alert('Seller details sent to your email'));
  };

  return (
    <div>
      <h2>Available Properties</h2>
      <input type="text" placeholder="Filter by place" value={filter} onChange={handleFilterChange} />
      <ul>
        {filteredProperties.map(property => (
          <li key={property.id}>
            {property.place} - {property.area} - {property.bedrooms} bedrooms
            <button onClick={() => handleInterested(property.id)}>I'm Interested</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Buyer;
