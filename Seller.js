import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Seller() {
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({ place: '', area: '', bedrooms: '', bathrooms: '', nearby: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties/seller')
      .then(response => setProperties(response.data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/properties', form)
      .then(response => setProperties([...properties, response.data]));
  };

  return (
    <div>
      <h2>Your Properties</h2>
      <ul>
        {properties.map(property => (
          <li key={property.id}>{property.place} - {property.area} - {property.bedrooms} bedrooms</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="place" placeholder="Place" onChange={handleChange} />
        <input type="text" name="area" placeholder="Area" onChange={handleChange} />
        <input type="text" name="bedrooms" placeholder="Bedrooms" onChange={handleChange} />
        <input type="text" name="bathrooms" placeholder="Bathrooms" onChange={handleChange} />
        <input type="text" name="nearby" placeholder="Nearby" onChange={handleChange} />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
}

export default Seller;
t