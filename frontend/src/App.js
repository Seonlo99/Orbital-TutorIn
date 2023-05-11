import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'

import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
