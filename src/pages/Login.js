import React from 'react';
import "../styles/Login.css";
import TextField from '@mui/material/TextField';
// import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
// import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Label } from '@mui/icons-material';

const Login = () => {

        const [showPassword, setShowPassword] = React.useState(false);
      
        const handleClickShowPassword = () => setShowPassword((show) => !show);
      
        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
        };
  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField error
          id="filled-error-helper-text"
          label="Email Address"
          helperText="Please enter valid Email Address"
          variant="filled"
        />
      </Box>


     <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />      
       <FormControl error sx={{ width: '25ch' }} variant="filled" >     
          <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
          <FilledInput
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
         
        </FormControl>      
        </Box>
        
        </div>


      
    </div>
  )
}

export default Login;