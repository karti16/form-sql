import { Typography } from '@mui/material';
import { maxWidth } from '@mui/system';
import StudentForm from './Pages/studentForm';

const appStyles = {
  backgroundColor: '',
  maxWidth: '80vh',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
};

const headerStyle = {
  backgroundColor: '#426cf5',
  color: 'white',
  padding: '20px 10px',
  margin: '0px ',
  marginBottom: '20px',
  display: 'flex',
};

function App() {
  return (
    <>
      <div style={headerStyle}>
        <Typography variant="h4">Student Form</Typography>
      </div>
      <div style={appStyles}>
        <StudentForm />
      </div>
    </>
  );
}

export default App;
