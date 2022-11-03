import { Link } from "react-router-dom";
import { Game } from "../../api/game/models/game.model";
import { useSession } from "../../contexts/AuthProvider";

export default function GameListItemComponent(props: Game) {
  const {hasRoles}: { hasRoles: string[] } = useSession();

      return (
        <tr cy-data="game-list-item" className="align-middle">
          <td cy-data="game-list-item-name">{props.name}</td>
          <td><img src={props.boxart} alt="" className="small-image"/></td>
          <td><Link to={`/news/game/${props.id}`}><button cy-data="game-list-item-news-button" type="button" className="btn btn-secondary">Nieuws</button></Link></td>
          <td ><Link to={`/reviews/game/${props.id}`}><button cy-data="game-list-item-reviews-button" type="button" className="btn btn-secondary">Reviews</button></Link></td>
          {hasRoles.includes("ADMIN")? 
          <td ><Link to={`/games/update/${props.id}`}><button cy-data="game-list-item-edit-button" type="button" className="btn btn-warning m-4">EDIT</button></Link>
          <Link to={`/games/delete/${props.id}`}><button cy-data="game-list-item-delete-button" type="button" className="btn btn-danger">DELETE</button></Link></td>: null}
        </tr>
      )
      
}