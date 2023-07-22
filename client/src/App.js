import './App.css';
import Header from './Header';
import Post from './Post';
import { Route, Routes} from "react-router-dom";
import Layout from './Layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import CommentSection from './CommentSection';

import { UserContextProvider } from './UserContext';



function App() {
  return (
<UserContextProvider>
  <Routes>
    <Route path='/' element={<Layout />}>
       <Route index element={ <IndexPage /> } />
       <Route path='/login' element={ <LoginPage />} />
       <Route path='/register' element={ <RegisterPage />} />
       <Route path='/create' element={ <CreatePost />} />
       <Route path="/post/:id" element={<PostPage />} />
       <Route path="/post/:id/comments" element={<CommentSection />} />
       <Route path="/edit/:id" element={<EditPost />} />

    </Route>    
  </Routes>
  </UserContextProvider>
  
  );
}

export default App;
