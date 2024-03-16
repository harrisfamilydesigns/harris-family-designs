import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Alert } from 'antd';

const SearchParamsAlert = () => {
  const HIDE_AFTER = 8000;

  const [searchParams] = useSearchParams();
  const [success, setSuccess] = React.useState('');
  const [error, setError] = React.useState('');
  const [info, setInfo] = React.useState('');
  const [warning, setWarning] = React.useState('');

  const handleAlertParams = () => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const info = searchParams.get('info');
    const warning = searchParams.get('warning');

    if (success) {
      setSuccess(success);
      setTimeout(() => {
        setSuccess('');
      }
      , HIDE_AFTER);
    }

    if (error) {
      setError(error);
      setTimeout(() => {
        setError('');
      }
      , HIDE_AFTER);
    }

    if (warning) {
      setWarning(warning);
      setTimeout(() => {
        setWarning('');
      }
      , HIDE_AFTER);
    }

    if (info) {
      setInfo(info);
      setTimeout(() => {
        setInfo('');
      }
      , HIDE_AFTER);
    }
  }

  React.useEffect(() => {
    handleAlertParams();
  }, [searchParams])

  if (!success && !error && !info && !warning) {
    return null;
  }

  return (
    <div style={{ margin: 20 }}>
      {success && <Alert message={success} type="success" showIcon closable />}
      {error && <Alert message={error} type="error" showIcon closable />}
      {info && <Alert message={info} type="info" showIcon closable />}
      {warning && <Alert message={warning} type="warning" showIcon closable />}
    </div>
  )
}

export default SearchParamsAlert;
