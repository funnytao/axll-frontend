import * as React from 'react';
import { useEffect, useRef } from 'react';
import classnames from 'classnames';

import RenderInBody from './RenderInBody';
import Overlay from './Overlay';

import classes from './styles/Modal.scss';

type modalProps = {
  onClose: Function,
  children: any,
  visible: boolean,
}

const ModalStatic = ({ onClose, children, visible }: modalProps) => {
  const modalRef = useRef(null);
  // use ref to record the target when a mousedown event happens
  const mouseDownTaret = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      // only close the modal if both the mousedown and mouseup event happen outside the modal
      if (!modalRef.current.contains(event.target) && mouseDownTaret.current) {
        onClose();
      }
    }
    visible && document.addEventListener('mouseup', handleOutsideClick);
    return () => {
      visible && document.removeEventListener('mouseup', handleOutsideClick);
    }
  }, [onClose, visible]);

  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (!modalRef.current.contains(event.target)) {
        mouseDownTaret.current = event.target;
      }
      else {
        mouseDownTaret.current = null;
      }
    }
    visible && document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      visible && document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [onClose, visible]);

  // hook to close the modal with esc key for accessibility purpose
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    visible && document.addEventListener('keydown', handleKey);
    return () => {
      visible && document.removeEventListener('keydown', handleKey);
    }
  }, [onClose, visible]);

  //TODO: add feature to trap focus inside the modal when using the TAB key

  return (
    <div ref={modalRef} className={classnames(classes.modalContainer, {
      [classes.visible]: visible
    })}>
      <section className={classes.content}>{children}</section>
    </div>
  );
}

const Modal = (props: modalProps) => (
  <RenderInBody>
    <div>
      <Overlay visible={props.visible} />
      <ModalStatic {...props} />
    </div>
  </RenderInBody>
);

export default Modal;