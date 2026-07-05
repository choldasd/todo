import React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle } from 'lucide-react';
import '../styles/TodoModal.scss'; // Reuse overlay and basic modal layout

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '400px'}}>
        <div className="modal-content__body" style={{textAlign: 'center', padding: '2rem'}}>
          <AlertTriangle size={48} color="var(--status-danger)" style={{marginBottom: '1rem'}} />
          <h2 style={{fontSize: '1.25rem', marginBottom: '0.5rem'}}>{title}</h2>
          <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{message}</p>
        </div>
        <div className="modal-content__footer" style={{justifyContent: 'center', gap: '1rem'}}>
          <button type="button" className="btn" onClick={onClose} style={{background: 'var(--surface)'}}>
            Cancel
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
