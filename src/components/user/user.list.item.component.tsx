import { Link } from "react-router-dom";
import { User } from "../../api/user/model/user.model";

export default function UserListItemComponent(props: User) {

      return (
        <tr cy-data="user-list-item" className="align-middle">
          <td cy-data="user-list-item-name">{props.name}</td>
          <td>{props.roles.join(', ')}</td>
          <td><Link to={`/news/writer/${props.id}`}><button cy-data="user-list-news-button" type="button" className="btn btn-secondary m-4">LINK</button></Link></td>
          <td><Link to={`/reviews/writer/${props.id}`}><button cy-data="user-list-reviews-button" type="button" className="btn btn-secondary m-4">LINK</button></Link></td>
          <td><Link to={`/users/update/${props.id}`}><button cy-data="user-list-edit-button" type="button" className="btn btn-warning m-4">EDIT</button></Link>
          {props.roles.includes("ADMIN")? null : <Link to={`/users/delete/${props.id}`}><button cy-data="user-list-delete-button" type="button" className="btn btn-danger">DELETE</button></Link>}
          </td>
        </tr>
      )
      
}