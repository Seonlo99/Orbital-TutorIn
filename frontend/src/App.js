import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'

import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiscussPage from './pages/DiscussPage';
import CreatePostPage from './pages/CreatePostPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route index path="login" element={<LoginPage />} />
        <Route index path="register" element={<RegisterPage />} />
        <Route index path="discuss" element={<DiscussPage />} />
        <Route index path="createPost" element={<CreatePostPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
