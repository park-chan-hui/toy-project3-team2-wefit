//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  // <StrictMode> react-beautiful-dnd 기능 동작을 위한 주석 처리
  <App />,
  // </StrictMode>
);
