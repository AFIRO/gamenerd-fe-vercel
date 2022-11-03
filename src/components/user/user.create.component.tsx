import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as userService from '../../api/user/user.service';
import { useNavigate} from 'react-router-dom';
import ErrorMessage from '../navigation/error';

export default function UserCreateFormComponent() {
  type userSubmitForm = {
    name: string;
    password: string;
    roles: string[];
  };
  const ROLES = ['ADMIN', 'WRITER', 'USER']
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('User name is required')
      .min(1, 'User name must be at least 1 characters')
      .max(200, 'User name can not be longer than 200 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(1, 'Password must be at least 1 characters')
      .max(200, 'Password can not be longer than 200 characters'),
    roles: Yup.array().of(Yup.string())
  });
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
      const success = await userService.save(data);
      if (success) {
        navigate('/users', { replace: true })
      }
    } catch (error) {
      console.log(error);
      setError(new Error(error.response.data.message));
    }
  }, [navigate]);

  return (
    <div>
      <ErrorMessage error={error} />
      {!error ?
        <div className="row justify-content-center p-4 text-light">
          <div className="col-3">
            <div className="register-form container-fluid">
              <h1 className='text-light'>User aanmaken</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className='m-1'>User name</label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </div>

                <div className="form-group">
                  <label className='m-1'>Password</label>
                  <input
                    type="text"
                    {...register('password')}
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.password?.message}</div>
                </div>

                <div className="form-group">
                  <label className='m-1'>Roles</label>
                  <select {...register('roles')} multiple={true}
                    className={`form-control ${errors.roles ? 'is-invalid' : ''} form-select`}
                  >
                    <option disabled> -- Selecteer alle rollen -- </option>
                    {ROLES.map(role => <option key={ROLES.indexOf(role)} value={role}>{role}</option>)}
                  </select>
                  <div className="invalid-feedback">{errors.roles?.message}</div>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-secondary m-4">
                    Submit
                  </button>
                  <button
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
        : null}
    </div>
  );
};
