import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App.jsx';

try {
  console.log('Rendering App...');
  const html = renderToString(<App />);
  console.log('Success, length:', html.length);
} catch (e) {
  console.error('Error rendering App:', e);
}
