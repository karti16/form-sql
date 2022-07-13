import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper, Grid } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Edit from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import StudentForm from './studentForm';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const tableHeaderStyle = {
  fontWeight: '900',
  textAlign: 'center',
  fontSize: '80%',
};

const ViewData = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const [studentData, setStudentData] = useState([]);
  const [noData, setNoData] = useState();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState();
  const [delDialogOpen, setDelDialogOpen] = useState(false);
  const [idToBeDelete, setIdToBeDelete] = useState();
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  useEffect(() => {
    axios
      .get('http://lap:3005/getData')
      .then(function (response) {
        setLoading(false);
        setStudentData(response.data);

        if (!response.data.length) {
          setNoData(true);
        } else {
          setNoData(false);
        }
      })
      .catch(function (error) {});
  }, []);

  const handleDelete = async () => {
    await axios
      .get(`http://lap:3005/deletePost/${idToBeDelete}`)
      .then(function (response) {
        console.log(response);
        fetchDataManually();
      })
      .catch(function (error) {});
  };

  const fetchDataManually = () => {
    axios
      .get('http://lap:3005/getData')
      .then(function (response) {
        setLoading(false);
        setStudentData(response.data);
        if (!response.data.length) {
          setNoData(true);
        } else {
          setNoData(false);
        }
      })
      .catch(function (error) {});
  };

  const handleEdit = (id) => {
    const data = studentData.find((item) => {
      return item.id === id;
    });
    setEditData(data);
    setEditDialogOpen(true);
  };

  return (
    <>
      <Paper elevation={10}>
        <TableContainer sx={{ width: '700' }}>
          <Table sx={{ tableLayout: 'auto' }}>
            <TableHead>
              <TableRow>
                <TableCell style={tableHeaderStyle}>Full&nbsp;Name</TableCell>
                <TableCell style={tableHeaderStyle}>Email</TableCell>
                <TableCell style={tableHeaderStyle}>Phone</TableCell>
                <TableCell style={tableHeaderStyle}>Department</TableCell>
                <TableCell style={tableHeaderStyle}>D.O.B</TableCell>
                <TableCell style={tableHeaderStyle}>Project Name</TableCell>
                <TableCell style={tableHeaderStyle}>
                  Project Submitted
                </TableCell>
                <TableCell style={tableHeaderStyle}>1st&nbsp;Dose</TableCell>
                <TableCell style={tableHeaderStyle}>2nd&nbsp;Dose</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && (
                <TableRow key={'loading'}>
                  <TableCell
                    colSpan={11}
                    align="center"
                    style={{ fontSize: '110%' }}
                  >
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}

              {noData && (
                <TableRow key={'noRecord'}>
                  <TableCell
                    colSpan={11}
                    align="center"
                    style={{ fontSize: '110%' }}
                  >
                    No&nbsp;Data&nbsp;Found
                  </TableCell>
                </TableRow>
              )}

              {studentData &&
                studentData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.fullName}
                    </TableCell>

                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.phone}</TableCell>
                    <TableCell align="center">{row.department}</TableCell>
                    <TableCell align="center">{row.dateOfBirth}</TableCell>
                    <TableCell align="center">{row.projectName}</TableCell>
                    <TableCell align="center">{row.projectSubmit}</TableCell>
                    <TableCell align="center">
                      {row.vaccinationSecondDose ? 'No' : 'Yes'}
                    </TableCell>
                    <TableCell align="right">
                      {row.vaccinationFirstDose ? 'No' : 'Yes'}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          setIdToBeDelete(row.id);
                          setDelDialogOpen(true);
                        }}
                        size="large"
                        edge="start"
                        color="inherit"
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          handleEdit(row.id);
                        }}
                        size="large"
                        edge="start"
                        color="inherit"
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog
        open={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
        }}
      >
        <StudentForm
          setEditDialogOpen={setEditDialogOpen}
          postUpdate={true}
          editData={editData}
        />
      </Dialog>
      <Dialog
        open={delDialogOpen}
        onClose={() => {
          setDelDialogOpen(false);
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {'Do you want delete the data ?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This operation can't be undone. Data will be deleted permanentlly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              setDelDialogOpen(false);
            }}
          >
            No
          </Button>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={() => {
              handleDelete();
              setDelDialogOpen(false);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Box style={{ position: 'fixed', right: '20px', bottom: '20px' }}>
        <Fab
          color="primary"
          size="large"
          onClick={() => {
            navigate('/', { replace: true });
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
};

export default ViewData;
