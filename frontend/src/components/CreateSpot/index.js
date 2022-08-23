import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import {createSpot, findSpot} from "../../store/spots";

const createNewSpot = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [spotId, setspotId] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const errors = [];
    if (address === '') errors.push("Street address is required")
    if (city === '') errors.push("City is required")
    if (state === '') errors.push("State is required")
    if (country === '') errors.push("Country is required")
    if (lat === '') errors.push("Latitude is not valid")
    if (lng === '') errors.push("'Longitude is not valid'")
    if (name === '' || name.length > 50) errors.push("Valid name required")
    if (description === '') errors.push("Description is required")
    if (price === '') errors.push("Price is required")
  }, [address, city, state, country, lat, lng, name, description, price])
}

const demoInfo = () => {
  
}
