import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const history = useHistory();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/register', form)
      .then(response => {
        const userType = response.data.userType;
        if (userType === 'seller') {
          history.push('/seller');
        } else {
          history.push('/buyer');
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
}

export default Login;
