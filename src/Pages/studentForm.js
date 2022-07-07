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
} from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Snackbar from '@mui/material/Snackbar';

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
  dateOfBirth: null,
  projectName: '',
  projectSubmit: 'yes',
  vaccination: {
    firstDose: '',
    secondDose: '',
  },
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '30px',
    margin: 'auto',
  },
}));

const StudentForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [vaccinationData, setVaccinationData] = useState({
    firstDose: false,
    secondDose: false,
  });

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setVaccinationData({ ...vaccinationData, [name]: checked });
    handleInputChange({
      target: { name: 'vaccination', value: vaccinationData },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let temp = { ...errors };

    temp.fullName = formData.fullName ? '' : 'This field is required.';

    temp.email =
      /$^|.+@.+..+/.test(formData.email) && formData.email
        ? ''
        : 'Email is not valid.';

    temp.phone =
      formData.phone.length > 9 ? '' : 'Minimum 10 numbers required.';

    temp.department = formData.department ? '' : 'Choose department';

    temp.dateOfBirth = formData.dateOfBirth ? null : 'Select Date of Birth';

    temp.projectName = formData.projectName ? '' : 'Enter project name';

    temp.projectSubmit = formData.projectSubmit
      ? ''
      : 'This field is required.';

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x === '' || x === null);
  };

  const handleSubmit = (e) => {
    if (validate()) {
      console.log(formData);
      setIsOpen(true);
      handleReset();
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };
  const handleReset = () => {
    setFormData({
      ...initialFormData,
    });
    setVaccinationData({ firstDose: false, secondDose: false });
    setErrors({});
  };

  const classes = useStyle();

  return (
    <Paper elevation={10}>
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
              onBlur={validate}
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
              onBlur={validate}
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
              onBlur={validate}
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
              onBlur={validate}
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
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(date) => {
                  handleInputChange({
                    target: { value: date, name: 'dateOfBirth' },
                  });
                }}
                onBlur={validate}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...(errors.dateOfBirth && {
                      error: true,
                      helperText: errors.dateOfBirth,
                    })}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item paddingBottom={2} lg={6} md={6} sm={6} xs={6}>
            <TextField
              fullWidth
              label="Project Name"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              variant="outlined"
              required
              onBlur={validate}
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
                  checked={vaccinationData.firstDose}
                  control={<Checkbox />}
                  label="1st dose"
                  onChange={handleCheckbox}
                  name="firstDose"
                />
                <FormControlLabel
                  checked={vaccinationData.secondDose}
                  control={<Checkbox />}
                  label="2nd dose"
                  onChange={handleCheckbox}
                  name="secondDose"
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
              Submit
            </Button>
          </Grid>
          <Snackbar
            open={isOpen}
            autoHideDuration={2000}
            message="Submitted Successfully"
            onClose={handleSnackbarClose}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentForm;