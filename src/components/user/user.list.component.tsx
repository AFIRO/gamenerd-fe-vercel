import { useCallback, useEffect, useState } from "react"
import * as userService from '../../api/user/user.service';
import Loader from '../navigation/loading';
import ErrorMessage from "../navigation/error";
import { User } from "../../api/user/model/user.model";
import UserListItemComponent from "./user.list.item.component";
import { Link } from "react-router-dom";


export default function UserListComponent() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error(error);
      setError(new Error(error.response.data.message));
    } finally {
      setLoading(false);
    };
  },[])

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers],);

  return (
    <div>
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div>
          <h1 cy-data="user-list-header" className="text-light">Overzicht van alle users</h1>
          <Link to={`/users/create`}><button cy-data="user-create" className="btn btn-secondary mt-3">User aanmaken</button></Link>
          <div className="row justify-content-center p-4">
            <div className="col-6">
              <table cy-data="user-list" className="table table-bordered table-striped table-dark table-hover">
                <thead>
                  <tr>
                  <td>Naam</td>
                  <td>Rollen</td>
                  <td>Alle Nieuws</td>
                  <td>Alle Reviews</td>
                  <td>Admin Opties</td>

                  </tr>
                </thead>
                <tbody>
                  {users.map(user => <UserListItemComponent key={user.id} {...user} ></UserListItemComponent>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        : null}
    </div>
  )
}