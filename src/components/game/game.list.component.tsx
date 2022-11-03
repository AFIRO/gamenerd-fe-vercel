import { useEffect, useState } from "react"
import GameListItemComponent from "./game.list.item.component"
import * as gameService from '../../api/game/game.service';
import Loader from '../navigation/loading';
import { Game } from "../../api/game/models/game.model";
import ErrorMessage from "../navigation/error";
import { useSession } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";


export default function GameListComponent() {
  const [games, setGames] = useState<Game[]>([])
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {hasRoles}: { hasRoles: string[] } = useSession();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await gameService.getAll();
        setGames(data);
      } catch (error) {
        console.error(error);
        setError(new Error(error.response.data.message));
      } finally {
        setLoading(false);
      };
    }
    fetchGames();
  },[],);

  return (
    <div>
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div>
          <h1 cy-data="game-list-header" className="text-light">Overzicht van alle games</h1>
          {hasRoles.includes("ADMIN") ?  <Link to={`/games/create`}><button cy-data="game-create" className="btn btn-secondary mt-3">Game aanmaken</button></Link> : null}
          <div className="row justify-content-center p-4">
            <div className="col-6">
              <table cy-data="game-table" className="table table-bordered table-striped table-dark table-hover">
                <thead>
                  <tr>
                  <td>Naam</td>
                  <td>Boxart</td>
                  <td>Nieuws</td>
                  <td>Review</td>
                  {hasRoles.includes("ADMIN") ? <td cy-data="admin-options">Admin Opties</td> : null}
                  </tr>
                </thead>
                <tbody>
                  {games.map(game => <GameListItemComponent key={game.id} {...game} ></GameListItemComponent>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        : null}
    </div>
  )
}