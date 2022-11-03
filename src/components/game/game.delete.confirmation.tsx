import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Game } from "../../api/game/models/game.model";
import * as gameService from '../../api/game/game.service';
import ErrorMessage from "../navigation/error";
import Loader from "../navigation/loading";

export default function GameDeleteConfirmationComponent() {
  const [error, setError] = useState<Error>(null);
  const [game, setGame] = useState<Game>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const gameId = useParams().id;
  const navigate = useNavigate()

  useEffect(()=>{
    const getGame = async () => {
      try{
      setLoading(true);
      setError(null)
      const data = await gameService.getById(gameId)    
      setGame(data)}
      catch (error) {
        console.log(error);
        setError(new Error(error.response.data.message));
      } finally {
        setLoading(false);
      }
    }
    getGame()
  },[gameId])
  
  const handleDelete = useCallback(async () => {
    try {
      await gameService.deleteById(gameId);
      navigate('/games',{replace:true})
    } catch (error) {
      console.log(error);
      setError(new Error(error.response.data.message));
    }
  }, [gameId,navigate])

  return (
    <div>
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div className="m-5">
          <h1 cy-data="delete-naam" className="text-light">Je staat op het punt om {game.name} te verwijderen.</h1>
          <h2 cy-data="delete-opmerking" className="text-danger">Opgelet, dit zal ook de gekoppelde recensie en nieuwsberichten verwijderen.</h2>
          <button cy-data="delete-submit" className="btn btn-danger m-5" onClick={handleDelete}>Bevestigen</button>
          <Link to={`/games`}><button cy-data="delete-cancel" className="btn btn-warning">Annuleren</button></Link>
        </div>
        : null}
    </div>
  )
}