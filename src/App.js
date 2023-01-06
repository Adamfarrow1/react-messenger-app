import { useContext, useState } from 'react';
import './App.css';
import Content from './Content';
import Login from './login-register/Login';
import Register from './login-register/Register';
import { BrowserRouter, Routes , Route, Navigate} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';


function App() {

  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login" />
    }

    return children;
  }

  return (

      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={
            <ProtectedRoute>
              <Content/>
            <ProtectedRoute/>
           </ProtectedRoute>}></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path='register' element={<Register/>}></Route>
          </Route>
         </Routes>
      </BrowserRouter>
  );
}

export default App;
