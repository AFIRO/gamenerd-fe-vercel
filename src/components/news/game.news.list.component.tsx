import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { Game } from "../../api/game/models/game.model";
import { News } from "../../api/news/model/news.model";
import * as gameService from '../../api/game/game.service';
import * as newsService from '../../api/news/news.service';
import Loader from "../navigation/loading";
import ErrorMessage from "../navigation/error";
import NewsListItemComponent from "./news.list.item.component";
import { useSession } from "../../contexts/AuthProvider";

export default function GameNewsComponent() {
  const gameId = useParams().id;
  const [game, setGame] = useState<Game>(null)
  const [news, setNews] = useState<News[]>([])
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {hasRoles}: { hasRoles: string[] } = useSession();


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const news = await newsService.getAllByGameId(gameId);
        setNews(news);
        const game = await gameService.getById(gameId);
        setGame(game);
      } catch (error) {
        console.error(error);
        setError(new Error(error.response.data.message));;
      } finally {
        setLoading(false);
      };
    }
    getData();
  }, [gameId],);

  return (
    <div>
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div cy-data="news-header">   <h1 className="text-light">Overzicht van alle news over {game.name}</h1>
         {hasRoles.includes("WRITER") ?  <Link to={`/news/create`}><button cy-data="news-create" className="btn btn-secondary mt-3">Nieuws item aanmaken</button></Link> : null}
      <div className="row justify-content-center p-4">
        <div className="col-6">
          <table cy-data="news-table" className="table table-bordered table-striped table-dark">
            <thead>
            <tr>
              <td>Game</td>
              <td>Schrijver</td>
              <td>Korte inhoud</td>
              <td>Link</td>
              {hasRoles.includes("WRITER") ? <td cy-data="writer-options">Writer Opties</td> : null}
              {hasRoles.includes("ADMIN") ? <td cy-data="admin-options">Admin Opties</td> : null}
              </tr>
            </thead>
            <tbody>
            {news.map(news => <NewsListItemComponent key={news.id} {...news}></NewsListItemComponent>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        : null}
    </div>
  )

}