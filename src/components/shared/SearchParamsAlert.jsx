import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { App } from 'antd';

const SearchParamsAlert = () => {
  const [searchParams] = useSearchParams();
  const [success, setSuccess] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [info, setInfo] = React.useState(null);
  const [warning, setWarning] = React.useState(null);
  const { message } = App.useApp();

  React.useEffect(() => {
    if (!searchParams) return;

    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const info = searchParams.get('info');
    const warning = searchParams.get('warning');

    if (success) {
      setSuccess(success);
    }

    if (error) {
      setError(error);
    }

    if (warning) {
      setWarning(warning);
    }

    if (info) {
      setInfo(info);
    }
  }, [searchParams])

  React.useEffect(() => {
    if (success) {
      message.success(success);
      setSuccess(null);
    }

    if (error) {
      message.error(error);
      setError(null);
    }

    if (warning) {
      message.warning(warning);
      setWarning(null);
    }

    if (info) {
      message.info(info);
      setInfo(null);
    }
  }
  , [success, error, warning, info]);

  return null;
}

export default SearchParamsAlert;
