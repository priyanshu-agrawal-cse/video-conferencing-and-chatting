import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/authContext';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Authentication() {
let routeTo = useNavigate()


  const [username, setusername] = React.useState();
  const [password, setpassword] = React.useState();
  const [name, setname] = React.useState();
  const [error, seterror] = React.useState();
  const [message, setmessage] = React.useState();
  const [formstate, setformstate] = React.useState(0);
  const [open, setopen] = React.useState(false);

const { handelRegister, handleLogin } = React.useContext(AuthContext);

  let handelAuth = async()=>{
    try {
      if(formstate==0){
        let result = await handleLogin(username, password);
        routeTo("/home")
        console.log(result);
      }
      if(formstate==1){
        let result = await handelRegister(name , username , password);
        console.log(result);
        setmessage(result);
        setopen(true);
        seterror("")
        setformstate(0)
        setpassword("")
        setusername("")
        

      }
    } catch (error) {
      let message = error.response.data.message;
      seterror(message);
    }

  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <div>
              <Button variant={formstate===0 ? "contained":""}  onClick={()=>{setformstate(0)}}>
                sign in
              </Button>
              <Button variant={formstate===1 ? "contained":""}  onClick={()=>{setformstate(1)}}>
                sign up
              </Button>
            </div>
            <Box component="form" noValidate sx={{ mt: 1 }}>
      
              {formstate===1 ?    <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e)=>{setname(e.target.value)}}
              /> :<></>}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e)=>{setusername(e.target.value)}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e)=>{setpassword(e.target.value)}}
               
              />
             <p style={{color:"red"}}>{error}</p>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handelAuth}
              >
               {formstate===0 ? "log in ":"Register"}
              </Button>


            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar 
      open={open}
      autoHideDuration={4000}
      message={message}
      />
    </ThemeProvider>
  );
}