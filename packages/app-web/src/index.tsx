import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/app';
import 'sanitize.css';
import './index.less';

function render(): void {
  const container = document.querySelector('#s-app-root') as HTMLElement;
  const root = createRoot(container);
  root.render(<App />);
}

render();
