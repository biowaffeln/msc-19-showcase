import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from './src/components/intro/introContext';

export const wrapRootElement = ({ element }) => {
  return <Provider>{element}</Provider>;
};

export const onServiceWorkerUpdateReady = () => window.location.reload();
