import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {createSpot, findSpot} from "../../store/spots";
import "./CreateSpot.css"

const CreateNewSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (address === '') errors.push("Street address is required")
    if (city === '') errors.push("City is required")
    if (state === '') errors.push("State is required")
    if (country === '') errors.push("Country is required")
    if (lat === '') errors.push("Latitude is not valid")
    if (lng === '') errors.push("Longitude is not valid")
    if (name === '' || name.length > 50) errors.push("Valid name required")
    if (description === '') errors.push("Description is required")
    if (price === '') errors.push("Price is required")
    setErrors(errors)
  }, [address, city, state, country, lat, lng, name, description, price])

  const handleSubmit = (e) => {
    e.preventDefault();
    const spotInfo = {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    };
    setErrors([]);
    dispatch(createSpot(spotInfo)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors([data.errors])
    })
    history.push('/')
  }

  return (
    <form onSubmit={handleSubmit} className='createForm'>
      <div className='createBox'>
      <div className='createTitle'>
        <h1 className='createHTitle'>Welcome to AwayBnB</h1>
      </div>
      <div>
        <h2 className='createSubTitle'>Host Your Home</h2>
      </div>
      <div>
        {errors.map((error, idx) =>
        <div key={idx} className='createError'>{error}</div>
        )}
      </div>
        </div>
        <div className='createText'>
      <label>
        <input
        className='createName'
        type="text"
        placeholder='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createAddress'
        type="text"
        placeholder='Address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createCity'
        type="text"
        placeholder='City'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createState'
        type="text"
        placeholder='State'
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createCountry'
        type="text"
        placeholder='Country'
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createLat'
        type="number"
        placeholder='Latitude'
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createLng'
        type="number"
        placeholder='Longitude'
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createDescription'
        type="text"
        placeholder='Description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        />
      </label>
      <label>
        <input
        className='createPrice'
        type="number"
        placeholder='Price'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        />
      </label>
      </div>
      <div className='createDivBut'>
      <button type="submit" className='signUpButton'>Host Your Home!</button>
      </div>
    </form>
  )
}

export default CreateNewSpot;
