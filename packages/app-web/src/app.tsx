import React from 'react';
import TitleBar from '@/components/TitleBar';
import './index.less';
import 'sanitize.css';

export default function App() {
  return (
    <div className="app">
      <TitleBar />
      <img src={''} />
      <video src=""></video>
      <webview className="webview" src="https://www.github.com/" />
      <webview className="webview" src="https://www.github.com/" />
    </div>
  );
}
