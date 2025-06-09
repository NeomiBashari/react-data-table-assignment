import React, { useState } from 'react';
import './DeleteButton.scss';

interface DeleteButtonProps {
  isDisabled: boolean;
  onDelete: () => void;
  isActive?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ isDisabled, onDelete, isActive }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (!isDisabled) setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    onDelete();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        disabled={isDisabled}
        onClick={handleClick}
        className={`delete-btn${isActive ? ' active' : ''}`}
        title="Delete Task"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 4H14" stroke={isDisabled ? '#222' : '#ddd'} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4" stroke={isDisabled ? '#222' : '#ddd'} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4" stroke={isDisabled ? '#222' : '#ddd'} strokeWidth="1.5"/>
        </svg>
      </button>
      
      {showModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <h3 className="delete-modal-title">
              Delete Task
            </h3>
            <p className="delete-modal-text">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="delete-modal-actions">
              <button
                onClick={handleCancel}
                className="delete-modal-cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="delete-modal-confirm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;