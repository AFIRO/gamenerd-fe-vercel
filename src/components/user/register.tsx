import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRegister, useSession } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../navigation/error';



export default function RegistrationFormComponent(){
  type registerSubmitForm = {
    name: string;
    password: string;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
              .required('Username is required')
              .min(5,'Username must be at least 6 characters')
              .max(25,'Username can not be longer than 25 characters'),
    password: Yup.string()
      .required('Password is required')
  });
  const registerFunction = useRegister()
  const navigate = useNavigate()
  const { loading, error, isAuthed} = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<registerSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
		if (isAuthed) {
			navigate('/',{replace:true})
		}
	}, [isAuthed, navigate]);


  const onSubmit = useCallback(async (data: registerSubmitForm) => {
    const success = await registerFunction(data);
    if (success) {
      navigate('/',{replace:true})
    }
  },[registerFunction,navigate]);

  return (
    <div className="row justify-content-center p-4 text-light">
      <div className="col-2">
    <div className="register-form container-fluid">
      <h1 className='text-light'>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage error={error}></ErrorMessage>
        <div className="form-group">
          <label className='m-1'>Username</label>
          <input
            type="text" cy-data="username-input"
            {...register('name')}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          <div cy-data="error-username" className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="form-group">
          <label className='m-1'>Password</label>
          <input
            type="text" cy-data="password-input"
            {...register('password')}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          />
          <div cy-data="error-password" className="invalid-feedback">{errors.password?.message}</div>
        </div>
        <div className="form-group">
          <button type="submit" cy-data="submit-input" disabled={loading} className="btn btn-secondary m-4">
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
