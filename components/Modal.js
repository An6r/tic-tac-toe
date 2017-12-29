import React from 'react';
import { PropTypes } from 'prop-types';
import {
	ModalContainer,
	ModalDialog
} from 'react-modal-dialog';

const Modal = ({ show, children, onClose }) => (
  show && (
    <ModalContainer onClose={onClose}>
      <ModalDialog onClose={onClose}>
        {children}
      </ModalDialog>
    </ModalContainer>
  )
);

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
