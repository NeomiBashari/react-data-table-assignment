import React, { useState } from 'react';

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
        style={{
          backgroundColor: isActive ? '#e0e0e0' : 'white',
          border: 'none',
          borderRadius: '4px',
          width: '40px',
          height: '38px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isDisabled ? 'none' : '0 2px 6px rgba(237, 76, 120, 0.15)',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          transition: 'box-shadow 0.2s, background 0.2s',
          padding: 0,
          outline: 'none',
        }}
        title="Delete Task"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5.5" y="8" width="11" height="8.5" rx="2" stroke="#ed4c78" strokeWidth="1.5"/>
          <path d="M8.5 10.5V15" stroke="#ed4c78" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M13.5 10.5V15" stroke="#ed4c78" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 8H19" stroke="#ed4c78" strokeWidth="1.5" strokeLinecap="round"/>
          <rect x="8" y="4.5" width="6" height="3.5" rx="1.5" stroke="#ed4c78" strokeWidth="1.5"/>
        </svg>
      </button>
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '24px',
            width: '400px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            animation: 'modalFadeIn 0.3s ease'
          }}>
            <h3 style={{
              margin: 0,
              marginBottom: '16px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#323338'
            }}>
              Delete Task
            </h3>
            <p style={{
              margin: '0 0 24px 0',
              fontSize: '14px',
              lineHeight: '1.5',
              color: '#676879'
            }}>
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px'
            }}>
              <button
                onClick={handleCancel}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  backgroundColor: 'white',
                  color: '#676879',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f5f6f8'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  padding: '8px 16px',
                  borderRadius: '4px',
                  border: 'none',
                  backgroundColor: '#ed4c78',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 3px 6px rgba(237, 76, 120, 0.2)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#dc3545';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(237, 76, 120, 0.3)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#ed4c78';
                  e.currentTarget.style.boxShadow = '0 3px 6px rgba(237, 76, 120, 0.2)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 4H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M5 4V3C5 2.44772 5.44772 2 6 2H10C10.5523 2 11 2.44772 11 3V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M12 4V13C12 13.5523 11.5523 14 11 14H5C4.44772 14 4 13.5523 4 13V4" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;