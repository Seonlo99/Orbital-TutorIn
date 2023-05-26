import {Routes, Route} from 'react-router-dom';
import {Toaster} from 'react-hot-toast'

import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DiscussPage from './pages/DiscussPage';
import CreatePostPage from './pages/CreatePostPage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="discuss" element={<DiscussPage />} />
        <Route path="createPost" element={<CreatePostPage />} />
        <Route path="editPost/:uuid" element={<EditPostPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="post/:uuid" element={<PostPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
