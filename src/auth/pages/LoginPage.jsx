import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Grid, Link, TextField } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const LoginPage = () => {

 const {login, authState} = useContext(AuthContext) 
 const navigate = useNavigate();


  const {email, password, onInputChange, formState} = useForm({
    email: '',
    password: ''
  });

  const onSubmit = (event) => {
    event.preventDefault();
    login(formState);
     if(authState.user === null) return;
      navigate('/',{
        replace: true
      });
  }

  return (
    <>
    <AuthLayout title='Login'>
        <form onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={email}
                onChange={ onInputChange }
                required
              />

            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                required
              />
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>
              <Grid item xs={12}>
                <Button 
                type="submit" 
                variant='contained'
                 fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
            Crear una cuenta
            </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
    </>
  )
}
