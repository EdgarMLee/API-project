import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpot from './EditSpot';
import "./EditSpot.css";

function EditSpotModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='editButton' onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpot />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
