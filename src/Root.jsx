import React, { useState, useEffect, Suspense, lazy } from 'react';
// Lazy load the apps
const WWWApp = lazy(() => import('./components/WWWApp/Root'));
const SecondHandApp = lazy(() => import('./components/SecondHandApp/Root'));

const Root = () => {
  const [subdomain, setSubdomain] = useState('');

  useEffect(() => {
    const hostnameArray = window.location.hostname.split('.');
    if (hostnameArray.length >= 3) { // Basic check for a subdomain
      setSubdomain(hostnameArray[0]);
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {subdomain === 'secondhand' ? <SecondHandApp /> : <WWWApp />}
    </Suspense>
  )
};

export default Root;
