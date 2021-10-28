import * as React from 'react';
import { useState, useCallback } from 'react';

import useRequest from '../shared/utils/useRequest';
import Modal from '../shared/components/Modal';
import TextField from '../shared/components/TextField';
import { camelCase, validateEmail } from '../shared/utils/HelperFunctions';

import classes from './styles/RequestModal.scss';

const URL = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

const formFields = ['Full name', 'Email', 'Confirm email']
const defaultFormData = {
  fullName: '',
  email: '',
  confirmEmail: ''
};

type requestModalProps = {
  visible?: boolean,
  onClose: Function,
}

interface formDataType {
  fullName: string;
  email: string;
  confirmEmail: string;
}

const RequestModal = ({ visible = false, onClose }: requestModalProps) => {
  const [formData, setFormData] = useState<formDataType>(Object.create(defaultFormData));
  const [validationErrors, setValidationErrors] = useState({});
  const [showSecondaryModal, setShowSecondaryModal] = useState(false);

  const setFormDataWithKey = (key: string) => (value: string) => {
    setValidationErrors(prev => ({ ...prev, [key]: false }));
    setFormData(prev => ({ ...prev, [key]: value }));
  }

  const { request, error, loading } = useRequest({
    method: 'POST',
    url: URL,
  });

  const verifyFormData = useCallback(() => {
    const updatedValidationErrors: any = {};
    if (!formData.fullName) {
      updatedValidationErrors.fullName = true;
    }
    if (!formData.email || !validateEmail(formData.email)) {
      updatedValidationErrors.email = true;
    }
    if (!formData.confirmEmail || !validateEmail(formData.confirmEmail) || formData.confirmEmail !== formData.email) {
      updatedValidationErrors.confirmEmail = true;
    }
    if (Object.keys(updatedValidationErrors).length === 0) {
      return true;
    }
    setValidationErrors(updatedValidationErrors);
    return false;
  }, [formData]);

  const onSubmit = useCallback(() => {
    const formDataIsValid = verifyFormData();
    if (formDataIsValid) {
      const { fullName: name, email } = formData;
      request({ data: { name, email } })
        .then(() => {
          setShowSecondaryModal(true);
          setFormData(Object.create(defaultFormData));
          setValidationErrors({});
        })
        .catch(err => console.log(err));
    }
  }, [request, formData]);

  const closeModal = () => {
    onClose();
    setShowSecondaryModal(false);
  }

  return (
    <Modal visible={visible} onClose={closeModal}>
      {showSecondaryModal ?
        <>
          <span className={classes.header}>
            All done!
          </span>
          <p className={classes.successMessage}>
            You will be one of the first to experience
            <br />
            Broccoli &amp; Co. when we launch.
          </p>
          <button className={classes.button} onClick={closeModal}>OK</button>
        </> :
        <>
          <span className={classes.header}>
            Request an invite
          </span>
          {formFields.map(field => {
            const key = camelCase(field);
            return <TextField
              key={key}
              placeholder={field}
              onChange={setFormDataWithKey(key)}
              hasError={(validationErrors as any)[key]}
              name={key}
            />;
          })}
          <button className={classes.button} disabled={loading} onClick={onSubmit}>
            {loading ? 'Sending, please wait...' : 'Send'}
          </button>
          {error && <span className={classes.errorMessage}>{error.response.data.errorMessage}</span>}
        </>
      }
    </Modal>
  );
}

export default RequestModal;