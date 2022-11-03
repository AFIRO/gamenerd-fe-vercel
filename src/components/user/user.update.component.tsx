import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as userService from '../../api/user/user.service';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../navigation/error';
import { User } from '../../api/user/model/user.model';
import Loader from '../navigation/loading';

export default function UserUpdateFormComponent() {
  type userSubmitForm = {
    id: string
    name: string;
    roles: string[];
  };
  const ROLES = ['ADMIN','WRITER','USER']
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('User name is required')
      .min(1, 'User name must be at least 1 characters')
      .max(200, 'User name can not be longer than 200 characters'),
    roles: Yup.array().of(Yup.string())
  });
  const userId = useParams().id
  const navigate = useNavigate()
  const [error, setError] = useState<Error>(null)
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await userService.getByIdWithRoles(userId);
        setUser(data)
      } catch (error) {
        console.error(error);
        setError(new Error(error.response.data.message));
      } finally {
        setLoading(false);
      };
    }
    fetchData();
  }, [userId],);

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
      const success = await userService.update(userId, data);
      if (success) {
        navigate('/users', { replace: true })
      }
    } catch (error) {
      console.log(error);
      setError(new Error(error.response.data.message));
    }
  }, [navigate, userId]);

  return (
    <div>
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div className="row justify-content-center p-4 text-light">
          <div className="col-3">
            <div className="register-form container-fluid">
              <h1 className='text-light'>User updaten</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className='m-1'>User name</label>
                  <input defaultValue={user.name}
                    type="text" cy-data="user-name"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div cy-data="user-name-error" className="invalid-feedback">{errors.name?.message}</div>
                </div>

                <div className="form-group">
                  <label className='m-1'>Roles</label>
                  <select cy-data="user-roles" {...register('roles')} multiple={true}
                    defaultValue={user.roles}
                    className={`form-control ${errors.roles ? 'is-invalid' : ''} form-select`}
                  >
                    <option disabled> -- Selecteer alle rollen -- </option>
                    {ROLES.map(role => <option key={ROLES.indexOf(role)} value={role}>{role}</option>)}
                  </select>
                  <div className="invalid-feedback">{errors.roles?.message}</div>
                </div>

                <div className="form-group">
                  <button cy-data="user-submit" type="submit" className="btn btn-secondary m-4">
                    Submit
                  </button>
                  <button cy-data="user-reset"
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
