import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import Home from './pages/Home/Home';
import Login from "./pages/Login/Login"
import Profile from './pages/Profile/Profile';
import Register from "./pages/Register/Register"
import Estate from './pages/EstateDetail/EstateDetail';
import ConfirmSignUp from './pages/ConfirmSignUp/message';
import { useQuery } from '@tanstack/react-query';
import getUser from './api/getUser';
import { createContext } from 'react';

export const UserContext = createContext()

function App() {
 
  const {data:userData,refetch} = useQuery({
    queryKey:['user'],
    refetchOnWindowFocus: false,
    initialData: false,
    queryFn: getUser,}
  )

  return (
    <UserContext.Provider value={{userData,refetch}}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/profile/:id' element={<Profile/>}/>
            <Route path='/estate/:id' element={<Estate />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/confirm/:codeConfirmation' element={<ConfirmSignUp />}/>
            <Route path="*" element={<ErrorPage />}/>
          </Routes>
        </Router>
    </UserContext.Provider>
  );
}

export default App;