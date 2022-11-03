import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import * as userService from '../../api/user/user.service';
import * as reviewService from '../../api/review/review.service';
import Loader from "../navigation/loading";
import ErrorMessage from "../navigation/error";
import { useSession } from "../../contexts/AuthProvider";
import { User } from "../../api/user/model/user.model";
import { Review } from "../../api/review/model/review.model";
import ReviewListItemComponent from "./review.list.item.component";

export default function WriterReviewComponent() {
  const userId = useParams().id;
  const [reviews, setReviews] = useState<Review[]>([])
  const [user, setUser] = useState<User>(null)
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {hasRoles}: { hasRoles: string[] } = useSession();


  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const reviews = await reviewService.getAllByUserId(userId);
        setReviews(reviews);
        const user = await userService.getById(userId)
        setUser(user)
      } catch (error) {
        console.error(error);
        setError(new Error(error.response.data.message));;
      } finally {
        setLoading(false);
      };
    }
    getData();
  }, [userId],);

  return (
    <div>
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div cy-data="reviews-header">   <h1 className="text-light">Overzicht van alle reviews geschreven door {user.name}</h1>
      <div className="row justify-content-center p-4">
        <div className="col-6">
          <table cy-data="reviews-table" className="table table-bordered table-striped table-dark">
            <thead>
            <tr>
              <td>Game</td>
              <td>Schrijver</td>
              <td>Korte inhoud</td>
              <td>Score</td>
              <td>Link</td>
              {hasRoles.includes("WRITER") ? <td cy-data="writer-options">Writer Opties</td> : null}
              {hasRoles.includes("ADMIN") ? <td cy-data="admin-options">Admin Opties</td> : null}
              </tr>
            </thead>
            <tbody>
            {reviews.map(reviews => <ReviewListItemComponent key={reviews.id} {...reviews}></ReviewListItemComponent>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        : null}
    </div>
  )

}