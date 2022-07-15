import {
  Grid,
  Paper,
  FormControl,
  MenuItem,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormGroup,
  Button,
  FormHelperText,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import moment from 'moment';

//Initial form Data
const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
  dateOfBirth: null,
  projectName: '',
  projectSubmit: null,
  vaccinationFirstDose: false,
  vaccinationSecondDose: false,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '30px',
  },
}));

const StudentForm = ({
  editData,
  postUpdate,
  setEditDialogOpen,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const [formData, setFormData] = useState(
    editData === undefined ? initialFormData : editData
  );
  const [errors, setErrors] = useState({});
  const [isEmptyForm, setIsEmptyForm] = useState(true);

  //For submit notification pop up
  const [isOpen, setIsOpen] = useState(false);

  //Separate function checkbox input
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  //Handling inputs
  const handleInputChange = (e) => {
    setIsEmptyForm(false);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (!isEmptyForm) {
      validate();
    }
  }, [formData]);

  //Validating input datas
  const validate = () => {
    //temp object to storing errors
    let temp = { ...errors };

    temp.fullName = formData.fullName ? '' : 'This field is required.';

    temp.email =
      /$^|.+@.+.+/.test(formData.email) && formData.email
        ? ''
        : 'Email is not valid.';

    temp.phone =
      formData.phone.length === 10 ? '' : 'Minimum 10 numbers required.';

    temp.department = formData.department ? '' : 'Choose department';

    temp.dateOfBirth = formData.dateOfBirth ? null : 'Select Date of Birth';

    temp.projectName = formData.projectName ? '' : 'Enter project name';

    temp.projectSubmit = formData.projectSubmit
      ? ''
      : 'This field is required.';

    setErrors({
      ...temp,
    });

    //Checks every value of the object and returns true if all condition passed.
    //If any one condition fails it return false
    return Object.values(temp).every((x) => x === '' || x === null);
  };

  // Handle submit action
  const handleSubmit = (e) => {
    if (validate()) {
      console.log(formData);
      setIsOpen(true);
      handleReset();
      setIsEmptyForm(true);
      if (postUpdate) {
        handleUpdate();
      } else {
        postData();
      }
    }
  };

  //Add data to database
  const postData = () => {
    axios
      .post('http://localhost:3005/addData', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Update post
  const handleUpdate = () => {
    axios
      .post('http://localhost:3005/updateData', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setEditDialogOpen(false);
  };
  //Snackbar notification close action
  const handleSnackbarClose = () => {
    setIsOpen(false);
  };

  //Reset form
  const handleReset = () => {
    setFormData({
      ...initialFormData,
    });

    setErrors({});
    setIsEmptyForm(true);
  };

  const classes = useStyle();

  return (
    <Paper elevation={10} style={{ borderRadius: '10px', width: '100vh' }}>
      <Grid>
        <Grid
          container
          className={classes.root}
          spacing={3}
          display="flex"
          flexDirection="row"
          alignItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item paddingBottom={2} lg={6} md={6} sm={6} xs={6}>
            <TextField
              fullWidth
              label="Name"
              {...(errors.fullName && {
                error: true,
                helperText: errors.fullName,
              })}
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item paddingBottom={2} lg={6} md={6} sm={6} xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              required
              {...(errors.email && {
                error: true,
                helperText: errors.email,
              })}
            />
          </Grid>
          <Grid item paddingBottom={2} lg={6} md={6} sm={6} xs={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                handleInputChange(e);
              }}
              variant="outlined"
              required
              {...(errors.phone && {
                error: true,
                helperText: errors.phone,
              })}
            />
          </Grid>
          <Grid item paddingBottom={2} lg={6} md={6} sm={6} xs={6}>
            <TextField
              fullWidth
              select
              label="Department"
              name="department"
              value={formData.department}
              variant="outlined"
              required
              onChange={handleInputChange}
              {...(errors.department && {
                error: true,
                helperText: errors.department,
              })}
            >
              <MenuItem value={'Mechanical Engineering'}>
                Mechanical Engineering
              </MenuItem>
              <MenuItem value={'Electronics and Communication Engineering'}>
                Electronics and Communication Engineering
              </MenuItem>
              <MenuItem value={'Electrical and Electronics Engineering'}>
                Electrical and Electronics Engineering
              </MenuItem>
              <MenuItem value={'Computer Science and Engineering'}>
                Computer Science and Engineering
              </MenuItem>
              <MenuItem value={'Information Technology'}>
                Information Technology
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item paddingBottom={2} lg={6} md={6} sm={6} xs={6}>
            <FormControl
              {...(errors.dateOfBirth && {
                error: true,
              })}
            >
              <FormLabel></FormLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(date) => {
                    date = moment(date).subtract(10, 'days').calendar();
                    handleInputChange({
                      target: { value: date, name: 'dateOfBirth' },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      // {...(errors.dateOfBirth && {
                      //   error: true,
                      //   helperText: errors.dateOfBirth,
                      // })}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
              <FormHelperText>
                {errors.dateOfBirth && 'Enter Date'}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item paddingBottom={2} lg={6} md={6} sm={6} xs={6}>
            <TextField
              fullWidth
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              variant="outlined"
              {...(errors.projectName && {
                error: true,
                helperText: errors.projectName,
              })}
            />
          </Grid>
          <Grid item paddingBottom={2} lg={6} md={6} sm={6} xs={6}>
            <FormControl>
              <FormLabel>Submitted the project?</FormLabel>
              <RadioGroup
                name="projectSubmit"
                checked={formData.projectSubmit}
                value={formData.projectSubmit}
                onChange={handleInputChange}
                variant="outlined"
                required
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <FormControl>
              <FormLabel>Vaccination</FormLabel>
              <FormGroup>
                <FormControlLabel
                  checked={formData.vaccinationFirstDose}
                  control={<Checkbox />}
                  label="1st dose"
                  onClick={handleCheckbox}
                  name="vaccinationFirstDose"
                />
                <FormControlLabel
                  checked={formData.vaccinationSecondDose}
                  control={<Checkbox />}
                  label="2nd dose"
                  onClick={handleCheckbox}
                  name="vaccinationSecondDose"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
        >
          <Grid item paddingBottom={2}>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
          <Grid item paddingRight={4} paddingLeft={2}>
            <Button variant="contained" onClick={handleSubmit} mt={2}>
              {postUpdate ? 'Update' : 'Submit'}
            </Button>
          </Grid>
          <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            message={
              postUpdate ? 'Updated Successfully' : 'Submitted Successfully'
            }
            onClose={handleSnackbarClose}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentForm;
