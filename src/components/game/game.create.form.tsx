import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as gameService from '../../api/game/game.service';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../navigation/error';

export default function GameCreateFormComponent(){
  type gameSubmitForm = {
    name: string;
    boxart: string;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
              .required('Game name is required')
              .min(1,'Game name must be at least 1 characters')
              .max(200,'Game name can not be longer than 200 characters'),
    boxart: Yup.string()
      .required('Boxart is required')
      .min(1,'boxart must be at least 1 character')
      .max(200,'boxart can not be longer than 200 characters')
  });
  const navigate = useNavigate()
  const [error,setError] = useState<Error>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<gameSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = useCallback(async (data: gameSubmitForm) => {
    try {
      const success = await gameService.save(data);
      if (success) {
        navigate('/games',{replace:true})
      }
    } catch (error) {
      console.log(error);
      setError(new Error(error.response.data.message));
    }    
  },[navigate]);

  return (
    <div className="row justify-content-center p-4 text-light">
      <div className="col-3">
    <div className="register-form container-fluid">
      <h1 className='text-light'>Game aanmaken</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      {error ? 
              <ErrorMessage error={error}></ErrorMessage> : null
					}
        <div className="form-group">
          <label className='m-1'>Game name</label>
          <input cy-data="game-name"
            type="text"
            {...register('name')}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          <div cy-data="game-name-error" className="invalid-feedback">{errors.name?.message}</div>
        </div>

        <div className="form-group">
          <label className='m-1'>Boxart</label>
          <input cy-data="game-boxart"
            type="text"
            {...register('boxart')}
            className={`form-control ${errors.boxart ? 'is-invalid' : ''}`}
          />
          <div cy-data="game-boxart-error" className="invalid-feedback">{errors.boxart?.message}</div>
        </div>
        <div className="form-group">
          <button cy-data="game-submit" type="submit" className="btn btn-secondary m-4">
            Submit
          </button>
          <button cy-data="game-reset"
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
  );
};
