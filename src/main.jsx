import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { pdfjs } from 'react-pdf';
import { Provider } from 'react-redux';
import { router } from './route';
import { RouterProvider } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  </React.StrictMode>
);