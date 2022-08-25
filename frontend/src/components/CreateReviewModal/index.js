import React, { useState, useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import CreateReview from './CreateReview';
import "./CreateReview.css";

function CreateReviewModal() {
  const [showModal, setShowModal] = useState(false);
  const allReviews = useSelector(state => state.reviewInfo);
  useEffect(() => {
    setShowModal(false);
  }, [allReviews])
  return (
    <>
      <button className='createReview' onClick={() => setShowModal(true)}>
        Review
        </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
