import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as reviewService from '../../api/review/review.service';
import * as gameService from '../../api/game/game.service';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../navigation/error';
import { User } from '../../api/user/model/user.model';
import { Game } from '../../api/game/models/game.model';
import Loader from '../navigation/loading';
import { useSession } from '../../contexts/AuthProvider';

export default function ReviewCreateFormComponent() {
  type reviewSubmitForm = {
    content: string;
    score: number
    gameId: string;
    writerId:string;
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string()
      .required('Content is required')
      .min(1, 'Content must be at least 1 characters')
      .max(200, 'Content can not be longer than 200 characters'),
    gameId: Yup.string()
      .required('gameId is required')
      .min(1, 'gameId must be at least 1 characters')
      .max(200, 'gameId can not be longer than 200 characters'),
    score: Yup.number()
      .required("A score is required")
      .min(0,"Score must be between 0 and 10")
      .max(10,"Score must be between 0 and 10")
  });
  const navigate = useNavigate()
  const [error, setError] = useState<Error>(null)
  const [games, setGames] = useState<Game[]>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const {user}: { user: User } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const gameData = await gameService.getAll();
        setGames(gameData);
      } catch (error) {
        console.error(error);
        setError(new Error(error.response.data.message));
      } finally {
        setLoading(false);
      };
    }
    fetchData();
  }, [],);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<reviewSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = useCallback(async (data: reviewSubmitForm) => {
    try {
      data.writerId = user.id;
      const success = await reviewService.save(data);
      if (success) {
        navigate('/reviews', { replace: true })
      }
    } catch (error) {
      console.log(error);
      setError(new Error(error.response.data.message));
    }
  }, [navigate, user.id]);

  return (
    <div cy-data="reviews-create">
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div className="row justify-content-center p-4 text-light">
          <div className="col-3">
            <div className="register-form container-fluid">
              <h1 className='text-light'>Review aanmaken</h1>
              <h2 className='text-light'>Schrijver: {user.name}</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {error ?
                  <ErrorMessage error={error}></ErrorMessage> : null
                }
                <div className="form-group">
                  <label className='m-1'>Content van review</label>
                  <input cy-data="reviews-create-content"
                    type="textfield"
                    {...register('content')}
                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                  />
                  <div cy-data="reviews-create-content-error" className="invalid-feedback">{errors.content?.message}</div>
                </div>

                <div className="form-group">
                  <label className='m-1'>Score op 10</label>
                  <input cy-data="reviews-create-score"
                    type="text"
                    {...register('score')}
                    className={`form-control ${errors.score ? 'is-invalid' : ''} `}
                  />
                  <div cy-data="reviews-create-score-error" className="invalid-feedback">{errors.score?.message}</div>
                </div>

                <div className="form-group">
                  <label className='m-1'>Game</label>
                  <select {...register('gameId')} cy-data="reviews-create-game"
                    defaultValue=""
                    className={`form-control ${errors.gameId ? 'is-invalid' : ''} form-select`}
                  >
                    <option disabled> -- Kies een spel -- </option>
                    {games.map(game => <option key={game.id} value={game.id}>{game.name}</option>)}
                  </select>
                  <div cy-data="reviews-create-game-error" className="invalid-feedback">{errors.gameId?.message}</div>
                </div>
                <div className="form-group">
                  <button cy-data="reviews-create-submit" type="submit" className="btn btn-secondary m-4">
                    Submit
                  </button>
                  <button cy-data="reviews-create-reset"
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
        </div> : null}
    </div>
  );
};
