import React from 'react';
import { FiLogOut, FiTrash2 } from 'react-icons/fi';
import '../assets/ConfirmationModal.css';

interface ConfirmationModalProps {
  isOpen: boolean;
  type: 'logout' | 'delete';
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  type,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const titles = {
    logout: 'Logout Account',
    delete: 'Delete Your Account',
  };

  const messages = {
    logout: 'Are you sure you want to log out? You will need to sign in again to access your account.',
    delete: 'Warning! This action cannot be undone. All your data including appointments, messages, and saved preferences will be permanently deleted.',
  };

  const confirmLabels = {
    logout: 'Log Out',
    delete: 'Delete Account',
  };

  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <div className={`confirmation-modal-icon ${type}`}>
          {type === 'logout' ? <FiLogOut size={32} /> : <FiTrash2 size={32} />}
        </div>
        <h2 className="confirmation-modal-title">{titles[type]}</h2>
        <p className="confirmation-modal-message">{messages[type]}</p>
        <div className="confirmation-modal-buttons">
          <button 
            className="confirmation-modal-cancel" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            className={`confirmation-modal-confirm ${type}`} 
            onClick={onConfirm}
          >
            {confirmLabels[type]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
