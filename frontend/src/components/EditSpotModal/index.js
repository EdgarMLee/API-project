import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import EditSpot from './EditSpot';
import "./EditSpot.css";

function EditSpotModal() {
  const [showModal, setShowModal] = useState(false);
  const allSpots = useSelector(state => state.spots);
  useEffect(() => {
    setShowModal(false);
  }, [allSpots])
  return (
    <>
      <button className='editButton' onClick={() => setShowModal(true)}>
        Edit
        </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpot />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
