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

/**
 * The static content of a modal
 * @param {object} modalProps modal props including:
 * - onClose {func}: callback when the modal is closed
 * - children {node}: used as content of the modal
 * - visible {boolean}: used to toggle the visibility of the modal
 * @returns {React.ReactElement} ModalStatic
 */
const ModalStatic = ({ onClose, children, visible }: modalProps) => {
  const modalRef = useRef(null);
  // use ref to record the target when a mousedown event happens
  const mouseDownTaret = useRef(null);

  useEffect(() => {
    const handleMouseUp = (event: Event) => {
      // only close the modal if both the mousedown and mouseup event happen outside the modal
      if (!modalRef.current.contains(event.target) && mouseDownTaret.current) {
        onClose();
      }
    }
    visible && document.addEventListener('mouseup', handleMouseUp);
    return () => {
      visible && document.removeEventListener('mouseup', handleMouseUp);
    }
  }, [onClose, visible]);

  useEffect(() => {
    const handleMouseDown = (event: Event) => {
      // only memorize the target if it is oustide the modal
      // we wil not want to close the modal if the user is working in the modal.
      // For example, if the user tries to select the input value with the mouse,
      // te cursor might end up being outside the modal.
      if (!modalRef.current.contains(event.target)) {
        mouseDownTaret.current = event.target;
      }
      else {
        mouseDownTaret.current = null;
      }
    }
    visible && document.addEventListener('mousedown', handleMouseDown);
    return () => {
      visible && document.removeEventListener('mousedown', handleMouseDown);
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

/**
 * HOC that renders the Modal and Overlay in the body
 * @param {object} props the same as the modal props
 * @returns {React.ReactElement} Modal
 */
const Modal = (props: modalProps) => (
  <RenderInBody>
    <div>
      <Overlay visible={props.visible} />
      <ModalStatic {...props} />
    </div>
  </RenderInBody>
);

export default Modal;