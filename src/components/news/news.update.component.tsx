import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import * as newsService from '../../api/news/news.service';
import * as gameService from '../../api/game/game.service';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../navigation/error';
import { User } from '../../api/user/model/user.model';
import { Game } from '../../api/game/models/game.model';
import Loader from '../navigation/loading';
import { useSession } from '../../contexts/AuthProvider';
import { News } from '../../api/news/model/news.model';

export default function NewsUpdateFormComponent() {
  type newsSubmitForm = {
    id:string
    content: string;
    gameId: string;
    writerId:string;
  };

  const newsId = useParams().id

  const validationSchema = Yup.object().shape({
    content: Yup.string()
      .required('Content is required')
      .min(1, 'Content must be at least 1 characters')
      .max(200, 'Content can not be longer than 200 characters'),
    gameId: Yup.string()
      .required('gameId is required')
      .min(1, 'gameId must be at least 1 characters')
      .max(200, 'gameId can not be longer than 200 characters')
  });
  const navigate = useNavigate()
  const [error, setError] = useState<Error>(null)
  const [games, setGames] = useState<Game[]>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const {user}: { user: User } = useSession();
  const [news, setNews] = useState<News>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const gameData = await gameService.getAll();
        const newsData = await newsService.getById(newsId)
        setGames(gameData)
        setNews(newsData);
      } catch (error) {
        console.error(error);
        setError(new Error(error.response.data.message));
      } finally {
        setLoading(false);
      };
    }
    fetchData();
  }, [newsId],);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<newsSubmitForm>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = useCallback(async (data: newsSubmitForm) => {
    try {
      data.id = newsId;
      data.writerId = user.id;
      const success = await newsService.update(newsId,data);
      if (success) {
        navigate('/news', { replace: true })
      }
    } catch (error) {
      console.log(error);
      setError(new Error(error.response.data.message));
    }
  }, [navigate, user.id, newsId]);

  return (
    <div cy-data="news-update">
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div className="row justify-content-center p-4 text-light">
          <div className="col-3">
            <div className="register-form container-fluid">
              <h1 className='text-light'>Nieuws item updaten</h1>
              <h2 className='text-light'>Schrijver: {user.name}</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className='m-1'>Content van item</label>
                  <input defaultValue={news.content} cy-data="news-update-content"
                    type="textfield"
                    {...register('content')}
                    className={`form-control ${errors.content ? 'is-invalid' : ''}`}
                  />
                  <div cy-data="news-update-content-error" className="invalid-feedback">{errors.content?.message}</div>
                </div>

                <div className="form-group">
                  <label className='m-1'>Game</label>
                  <select {...register('gameId')} cy-data="news-update-game"
                    defaultValue={news.game.id}
                    className={`form-control ${errors.gameId ? 'is-invalid' : ''} form-select`}
                  >
                    <option disabled> -- Kies een spel -- </option>
                    {games.map(game => <option key={game.id} value={game.id}>{game.name}</option>)}
                  </select>
                  <div cy-data="news-update-game-error" className="invalid-feedback">{errors.gameId?.message}</div>
                </div>
                <div className="form-group">
                  <button cy-data="news-update-submit" type="submit" className="btn btn-secondary m-4">
                    Submit
                  </button>
                  <button cy-data="news-update-reset"
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
