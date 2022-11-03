import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useLogin, useSession } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../navigation/error';


export default function  LoginFormComponent() {
  
  type loginSubmitForm = {
    name: string;
    password: string;
  };
  
  const validationSchema = Yup.object().shape({
    name: Yup.string()
              .required('Username is required')
              .min(4,'Username must be at least 4 characters')
              .max(25,'Username can not be longer than 25 characters'),
    password: Yup.string()
      .required('Password is required')
  });
  const login = useLogin()
  const navigate = useNavigate()
  const { loading, error, isAuthed} = useSession();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<loginSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
		if (isAuthed) {
			navigate('/',{replace:true})
		}
	}, [isAuthed, navigate]);


  const onSubmit = useCallback(async (data: loginSubmitForm) => {
        
    const success = await login(data);
    if (success) {
      navigate('/',{replace:true})
    }
  },[login,navigate]);

  return (
    <div className="row justify-content-center p-4 text-light">
      <div className="col-2">
    <div className="register-form container-fluid">
      <h1 className='text-light'>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage error={error}></ErrorMessage>
        <div className="form-group">
          <label className='m-1'>Username</label>
          <input cy-data="username-input"
            type="text"
            {...register('name')}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          <div cy-data="error-username" className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="form-group">
          <label className='m-1'>Password</label>
          <input cy-data="password-input"
            type="text"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div cy-data="error-password" className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading} className="btn btn-secondary m-4" cy-data="submit-input">
            Submit
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-danger m-4"
            cy-data="reset-input"
          >
            Reset
          </button>
        </div>
      </form>
      </div>
      </div>
    </div>
  );
};
