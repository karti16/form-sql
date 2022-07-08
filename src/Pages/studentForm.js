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
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Snackbar from '@mui/material/Snackbar';
import { format } from 'date-fns';

//Initial form Data
const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  department: '',
  dateOfBirth: null,
  projectName: '',
  projectSubmit: null,
  vaccinationFirstDose: null,
  vaccinationSecondDose: null,
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: '30px',
    margin: 'auto',
  },
}));

const StudentForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialFormData);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    // let temp = { ...errors };
    setErrors({
      ...errors,
      fullName: formData.fullName ? '' : 'This field is required.',
    });

    setErrors({
      ...errors,
      email: /$^|.+@.+.+/.test(formData.email) ? '' : 'Email is not valid.',
    });
    setErrors({
      ...errors,
      phone:
        /^\d{10}$/.test(formData.phone) && format.phone !== ''
          ? ''
          : 'Minimum 10 numbers required.',
    });
    setErrors({
      ...errors,
      department: formData.department === '' ? '' : 'Choose department',
    });

    setErrors({
      ...errors,
      dateOfBirth: formData.dateOfBirth === '' ? null : 'Select Date of Birth',
    });

    setErrors({
      ...errors,
      projectName: formData.projectName === '' ? null : 'Enter project name',
    });

    setErrors({
      ...errors,
      projectSubmit:
        formData.projectSubmit === '' ? null : 'This field is required.',
    });
    // errors.fullName = formData.fullName ? '' : 'This field is required.';

    // errors.email =
    //   /$^|.+@.+.+/.test(formData.email) && formData.email
    //     ? ''
    //     : 'Email is not valid.';

    // temp.phone =
    //   formData.phone.length > 9 ? '' : 'Minimum 10 numbers required.';

    // temp.department = formData.department ? '' : 'Choose department';

    // temp.dateOfBirth = formData.dateOfBirth ? null : 'Select Date of Birth';

    // temp.projectName = formData.projectName ? '' : 'Enter project name';

    // temp.projectSubmit = formData.projectSubmit
    //   ? null
    //   : 'This field is required.';

    // setErrors({
    //   ...temp,
    // });
    console.log(errors);
    return Object.values(errors).every((x) => x === '' || x === null);
  };

  const handleSubmit = (e) => {
    if (validate()) {
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

    setErrors({});
  };

  //Validating data when the formData is changing
  useEffect(() => {
    validate();
  }, [formData]);

  const classes = useStyle();

  return (
    <Paper elevation={10} style={{ borderRadius: '10px' }}>
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
