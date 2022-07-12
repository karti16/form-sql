import { Typography } from '@mui/material';
import { useState } from 'react';
import Header from './Pages/header';
import Home from './Pages/home';
import Sidebar from './Pages/sidebar';
import StudentForm from './Pages/studentForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ViewData from './Pages/viewData';

const appStyles = {
  backgroundColor: '',
  maxWidth: '80vh',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
};

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Header isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
        <div style={appStyles}>
          <Sidebar
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />

          <Routes>
            <Route exact path="/" element={<StudentForm />} />
            <Route exact path="/list" element={<ViewData />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
