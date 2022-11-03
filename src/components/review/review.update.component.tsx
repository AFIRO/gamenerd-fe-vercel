import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as reviewService from '../../api/review/review.service';
import * as gameService from '../../api/game/game.service';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../navigation/error';
import { User } from '../../api/user/model/user.model';
import { Game } from '../../api/game/models/game.model';
import Loader from '../navigation/loading';
import { useSession } from '../../contexts/AuthProvider';
import { Review } from '../../api/review/model/review.model';

export default function ReviewUpdateFormComponent() {
  type reviewSubmitForm = {
    id:string
    content: string;
    score: number
    gameId: string;
    writerId:string;
  };
  const reviewId = useParams().id
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
  const [review,setReview] = useState<Review>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const {user}: { user: User } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const gameData = await gameService.getAll();
        const reviewData = await reviewService.getById(reviewId)
        setGames(gameData);
        setReview(reviewData)
      } catch (error) {
        console.error(error);
        setError(new Error(error.response.data.message));
      } finally {
        setLoading(false);
      };
    }
    fetchData();
  }, [reviewId],);

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
      data.id = reviewId
      data.writerId = user.id;
      const success = await reviewService.update(reviewId,data);
      if (success) {
        navigate('/reviews', { replace: true })
      }
    } catch (error) {
      console.log(error);
      setError(new Error(error.response.data.message));
    }
  }, [navigate, user.id, reviewId]);

  return (
    <div cy-data="reviews-update">
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div className="row justify-content-center p-4 text-light">
          <div className="col-3">
            <div className="register-form container-fluid">
              <h1 className='text-light'>Review updaten</h1>
              <h2 className='text-light'>Schrijver: {user.name}</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className='m-1'>Content van review</label>
                  <input defaultValue={review.content} cy-data="reviews-update-content"
                    type="textfield"
                    {...register('content')}
                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                  />
                  <div cy-data="reviews-update-content-error" className="invalid-feedback">{errors.content?.message}</div>
                </div>

                <div className="form-group">
                  <label className='m-1'>Score op 10</label>
                  <input defaultValue={review.score} cy-data="reviews-update-score"
                    type="text"
                    {...register('score')}
                    className={`form-control ${errors.score ? 'is-invalid' : ''} `}
                  />
                  <div cy-data="reviews-update-score-error" className="invalid-feedback">{errors.score?.message}</div>
                </div>

                <div className="form-group">
                  <label className='m-1'>Game</label>
                  <select {...register('gameId')} cy-data="reviews-update-game"
                    defaultValue={review.game.id}
                    className={`form-control ${errors.gameId ? 'is-invalid' : ''} form-select`}
                  >
                    <option disabled> -- Kies een spel -- </option>
                    {games.map(game => <option key={game.id} value={game.id}>{game.name}</option>)}
                  </select>
                  <div  cy-data="reviews-update-game-error" className="invalid-feedback">{errors.gameId?.message}</div>
                </div>
                <div className="form-group">
                  <button cy-data="reviews-update-submit" type="submit" className="btn btn-secondary m-4">
                    Submit
                  </button>
                  <button cy-data="reviews-update-reset"
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
