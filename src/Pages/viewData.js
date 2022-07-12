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

const tableHeaderStyle = {
  fontWeight: '900',
  textAlign: 'center',
  fontSize: '80%',
};

const ViewData = () => {
  const [studentData, setStudentData] = useState([]);
  const [noData, setNoData] = useState();

  useEffect(() => {
    axios
      .get('http://lap:3005/getData')
      .then(function (response) {
        setStudentData(response.data);

        if (!response.data.length) {
          setNoData(true);
        } else {
          setNoData(false);
        }
      })
      .catch(function (error) {});
  }, []);

  const handleDelete = async (id) => {
    await axios
      .get(`http://lap:3005/deletePost/${id}`)
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
        setStudentData(response.data);
        if (!response.data.length) {
          setNoData(true);
        } else {
          setNoData(false);
        }
      })
      .catch(function (error) {});
  };

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleEdit = (id) => {
    const data = studentData.find((item) => {
      return item.id === id;
    });
    setEditData(data);
    handleClickOpen();
  };

  return (
    <>
      <Grid Container>
        <Grid item lg={12} xs={6} sm={6} md={4}>
          <Paper elevation={10}>
            <TableContainer sx={{ width: '700' }}>
              <Table sx={{ tableLayout: 'auto' }}>
                <TableHead>
                  <TableRow>
                    <TableCell style={tableHeaderStyle}>
                      Full&nbsp;Name
                    </TableCell>
                    <TableCell style={tableHeaderStyle}>Email</TableCell>
                    <TableCell style={tableHeaderStyle}>Phone</TableCell>
                    <TableCell style={tableHeaderStyle}>Department</TableCell>
                    <TableCell style={tableHeaderStyle}>D.O.B</TableCell>
                    <TableCell style={tableHeaderStyle}>Project Name</TableCell>
                    <TableCell style={tableHeaderStyle}>
                      Project Submitted
                    </TableCell>
                    <TableCell style={tableHeaderStyle}>
                      1st&nbsp;Dose
                    </TableCell>
                    <TableCell style={tableHeaderStyle}>
                      2nd&nbsp;Dose
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noData && (
                    <TableRow key={'noRecord'}>
                      <TableCell
                        colSpan={9}
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
                        <TableCell align="center">
                          {row.projectSubmit}
                        </TableCell>
                        <TableCell align="center">
                          {row.vaccinationSecondDose ? 'No' : 'Yes'}
                        </TableCell>
                        <TableCell align="right">
                          {row.vaccinationFirstDose ? 'No' : 'Yes'}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              handleDelete(row.id);
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
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <StudentForm setOpen={setOpen} postUpdate={true} editData={editData} />
      </Dialog>
      <Dialog></Dialog>
    </>
  );
};

export default ViewData;
