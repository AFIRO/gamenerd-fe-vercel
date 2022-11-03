import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as userService from '../../api/user/user.service';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../navigation/error';
import { useSession } from '../../contexts/AuthProvider';
import { User } from '../../api/user/model/user.model';

export default function UserPasswordUpdateFormComponent() {
  const {user}: {user: User } = useSession();
  type userSubmitForm = {
    id: string
    password: string
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(1, 'Password must be at least 1 characters')
      .max(200, 'Password can not be longer than 200 characters')
  });
  const userId = useParams().id
  const navigate = useNavigate()
  const [error, setError] = useState<Error>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<userSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = useCallback(async (data: userSubmitForm) => {
    try {
      data.id = userId;
      const success = await userService.updatePassword(userId, data);
      if (success) {
        navigate('/games', { replace: true })
      }
    } catch (error) {
      console.log(error);
      setError(new Error(error.response.data.message));
    }
  }, [navigate, userId]);

  return (

    <div>
      <ErrorMessage error={error}></ErrorMessage>
      {!error ? user.id === userId ?
        <div className="row justify-content-center p-4 text-light">
          <div className="col-3">
            <div className="register-form container-fluid">
              <h1 className='text-light'>Passwoord updaten</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className='m-1'>Passwoord</label>
                  <input cy-data="password-password"
                    type="text"
                    {...register('password')}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  />
                  <div cy-data="password-error" className="invalid-feedback">{errors.password?.message}</div>
                </div>

                <div className="form-group">
                  <button cy-data="password-submit" type="submit" className="btn btn-secondary m-4">
                    Submit
                  </button>
                  <button cy-data="password-reset"
                    type="button"
                    onClick={() => reset()}
                    className="btn btn-danger m-4"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
       : <Navigate to="/forbidden" /> : null}
    </div>

  );
};
