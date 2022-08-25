// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
      <div className='loginSignUp'>
      <span className='loginModal'>
        <LoginFormModal />
      </span>
      <span className='signUpModal'>
        <SignupFormModal />
      </span>
      </div>
      </>
    );
  }

  return (
    <>
    <div className='homeLoginSignUp'>
      <div className='homeNav'>
        <NavLink exact to="/" className='navHome'>
          <div className='bnbLogo'>
            <div className='fa-brands fa-airbnb fa-3x'/>
            <div className='awayBnB'>AwayBnb</div>
            </div>
        </NavLink>
      </div>
        {isLoaded && sessionLinks}
    </div>
    </>
  );
}

export default Navigation;
