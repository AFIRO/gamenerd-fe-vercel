import { Link } from "react-router-dom";
import { News } from "../../api/news/model/news.model";
import { User } from "../../api/user/model/user.model";
import { useSession } from "../../contexts/AuthProvider";

export default function NewsListItemComponent(props: News) {
  const {hasRoles, user}: { hasRoles: string[], user: User } = useSession();

  return (
      <tr cy-data="news-list-item" >
        <td cy-data="news-list-name" >{props.game.name}</td>
        <td cy-data="news-list-writer" >{props.writer.name}</td>
        <td cy-data="news-list-content" >{props.content.slice(0, 15).concat("...")}</td>
        <td ><Link to={`/news/${props.id}`}><button cy-data="news-list-link" type="button" className="btn btn-secondary">Link</button></Link></td>
        {hasRoles.includes("WRITER") ? props.writer.id === user.id? <td><Link to={`/news/update/${props.id}`}><button cy-data="news-edit" type="button" className="btn btn-warning">EDIT</button></Link></td>: <td></td>: null}
        {hasRoles.includes("ADMIN")? <td><Link to={`/news/delete/${props.id}`}><button cy-data="news-delete"  type="button" className="btn btn-danger">DELETE</button></Link></td>: null}
      </tr>
  )

}