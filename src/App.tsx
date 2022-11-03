import { Route, Routes } from 'react-router-dom';
import './App.css';
import GameCreateFormComponent from './components/game/game.create.form';
import GameDeleteConfirmationComponent from './components/game/game.delete.confirmation';
import GameListComponent from './components/game/game.list.component';
import GameUpdateFormComponent from './components/game/game.update.form';
import Footer from './components/navigation/footer';
import Forbidden from './components/navigation/forbidden';
import NavigationBar from './components/navigation/navbar';
import NotFound from './components/navigation/notfound';
import { RequireAuth } from './components/navigation/required.auth';
import { RequireNoAuth } from './components/navigation/required.not.auth';
import GameNewsComponent from './components/news/game.news.list.component';
import NewsCreateFormComponent from './components/news/news.create.component';
import NewsDeleteConfirmationComponent from './components/news/news.delete.confirmation';
import NewsItemComponent from './components/news/news.item.component';
import NewsListComponent from './components/news/news.list.component';
import NewsUpdateFormComponent from './components/news/news.update.component';
import WriterNewsComponent from './components/news/writer.news.list.component';
import GameReviewComponent from './components/review/game.review.list.component';
import ReviewCreateFormComponent from './components/review/review.create.component';
import ReviewDeleteConfirmationComponent from './components/review/review.delete..confirmation';
import ReviewItemComponent from './components/review/review.item.component';
import ReviewListComponent from './components/review/review.list.component';
import ReviewUpdateFormComponent from './components/review/review.update.component';
import WriterReviewComponent from './components/review/writer.review.list.component';
import LoginFormComponent from './components/user/login';
import RegistrationFormComponent from './components/user/register';
import UserCreateFormComponent from './components/user/user.create.component';
import UserDeleteConfirmationComponent from './components/user/user.delete.confirmation';
import UserListComponent from './components/user/user.list.component';
import UserPasswordUpdateFormComponent from './components/user/user.password.update.component';
import UserUpdateFormComponent from './components/user/user.update.component';
import { AuthProvider } from './contexts/AuthProvider';

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <NavigationBar/>
        <Routes>

          <Route index element={
            <RequireAuth>
              <GameListComponent />
            </RequireAuth>} />

          <Route path="games" element={<RequireAuth><GameListComponent /></RequireAuth>} />
          <Route path="games/create" element={<RequireAuth requiredRole='ADMIN'><GameCreateFormComponent /></RequireAuth>} />
          <Route path="games/update/:id" element={<RequireAuth requiredRole='ADMIN'><GameUpdateFormComponent /></RequireAuth>} />
          <Route path="games/delete/:id" element={<RequireAuth requiredRole='ADMIN'><GameDeleteConfirmationComponent /></RequireAuth>} />
          
          <Route path="news" element={<RequireAuth><NewsListComponent /></RequireAuth>} />
          <Route path="news/game/:id" element={<RequireAuth><GameNewsComponent /></RequireAuth>} />
          <Route path="news/writer/:id" element={<RequireAuth requiredRole='ADMIN'><WriterNewsComponent /></RequireAuth>} />
          <Route path="news/:id" element={<RequireAuth ><NewsItemComponent/></RequireAuth>} />
          <Route path="news/create" element={<RequireAuth requiredRole='WRITER'><NewsCreateFormComponent /></RequireAuth>} />
          <Route path="news/update/:id" element={<RequireAuth requiredRole='WRITER'><NewsUpdateFormComponent /></RequireAuth>} />
          <Route path="news/delete/:id" element={<RequireAuth requiredRole='ADMIN'><NewsDeleteConfirmationComponent /></RequireAuth>} />
          
          <Route path="reviews" element={<RequireAuth ><ReviewListComponent /></RequireAuth>} />
          <Route path="reviews/game/:id" element={<RequireAuth><GameReviewComponent /></RequireAuth>} />
          <Route path="reviews/writer/:id" element={<RequireAuth requiredRole='ADMIN'><WriterReviewComponent /></RequireAuth>} />
          <Route path="reviews/:id" element={<RequireAuth ><ReviewItemComponent/></RequireAuth>} />
          <Route path="reviews/create" element={<RequireAuth requiredRole='WRITER'><ReviewCreateFormComponent /></RequireAuth>} />
          <Route path="reviews/update/:id" element={<RequireAuth requiredRole='WRITER'><ReviewUpdateFormComponent /></RequireAuth>} />
          <Route path="reviews/delete/:id" element={<RequireAuth requiredRole='ADMIN'><ReviewDeleteConfirmationComponent /></RequireAuth>} />
          
          <Route path="users" element={<RequireAuth requiredRole='ADMIN'><UserListComponent /></RequireAuth>} /> 
          <Route path="users/create" element={<RequireAuth requiredRole='ADMIN'><UserCreateFormComponent /></RequireAuth>} />   
          <Route path="users/update/:id" element={<RequireAuth requiredRole='ADMIN'><UserUpdateFormComponent /></RequireAuth>} />  
          <Route path="users/delete/:id" element={<RequireAuth requiredRole='ADMIN'><UserDeleteConfirmationComponent /></RequireAuth>} />  
          <Route path="users/password/:id" element={<RequireAuth ><UserPasswordUpdateFormComponent /></RequireAuth>} />  

          <Route path="*" element={<RequireAuth><NotFound /></RequireAuth>} />
          <Route path="/forbidden" element={<RequireAuth ><Forbidden/></RequireAuth>} />
          <Route path="login" element={<RequireNoAuth><LoginFormComponent /></RequireNoAuth>} />
          <Route path="register" element={<RequireNoAuth><RegistrationFormComponent /></RequireNoAuth>} />
          
        </Routes>
        <Footer/>
      </div>
    </AuthProvider>
  );
}

export default App;
