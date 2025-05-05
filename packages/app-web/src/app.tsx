import React from 'react';
import TitleBar from '@/components/TitleBar';

export default function App() {
  const a = '1';
  return (
    <>
      <TitleBar />
      <div style={{ color: '#ff6700', background: '#333', fontSize: '20px' }}>{a}</div>
      <webview className="webview" src="https://www.github.com/" />
      <webview className="webview" src="https://www.github.com/" />
    </>
  );
}
