import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const formValidations = {
  email: [ (value) => value.includes('@') &&  value.includes('.com'), 'El correo debe tener una "@"'],
  password: [ (value) => value.length >= 6, 'El password debe tener más de 6 letras']
}

export const RegisterPage = () => {

  const {signup, authState} = useContext(AuthContext) 
  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false)

  const {formState, email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm({
    email: '',
    password: ''
  }, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    signup(formState);
      navigate('/',{
        replace: true
      });
  }

  return (

    <AuthLayout title='Register'>
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
                error={!!emailValid  && formSubmitted}
                helperText={emailValid}
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
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>
              <Grid item xs={12} >
                <Button disabled={!isFormValid} type="submit" variant='contained' fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
            Ingresar
            </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>

  )
}

