import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as reviewService from '../../api/review/review.service';
import ErrorMessage from "../navigation/error";
import Loader from "../navigation/loading";
import { Review } from "../../api/review/model/review.model";

export default function ReviewDeleteConfirmationComponent() {
  const [error, setError] = useState<Error>(null);
  const [review, setReview] = useState<Review>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const reviewId = useParams().id;
  const navigate = useNavigate()

  useEffect(()=>{
    const getReview = async () => {
      try{
      setLoading(true);
      setError(null)
      const data = await reviewService.getById(reviewId)    
      setReview(data)}
      catch (error) {
        console.log(error);
        setError(new Error(error.response.data.message));
      } finally {
        setLoading(false);
      }
    }
    getReview()
  },[reviewId])
  
  const handleDelete = useCallback(async () => {
    try {
      await reviewService.deleteById(reviewId);
      navigate('/reviews',{replace:true})
    } catch (error) {
      console.log(error);
      setError(new Error(error.response.data.message));
    }
  }, [reviewId,navigate])

  return (
    <div cy-data="reviews-delete">
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div className="m-5">
          <h1 cy-data="reviews-delete-game" className="text-light">Je staat op het punt om een nieuwsitem over {review.game.name} te verwijderen.</h1>
          <h2 cy-data="reviews-delete-writer" className="text-light">Dit item is geschreven door {review.writer.name}.</h2>
          <button cy-data="reviews-delete-submit" className="btn btn-danger m-5" onClick={handleDelete}>Bevestigen</button>
          <Link to={`/reviews`}><button cy-data="reviews-delete-cancel" className="btn btn-warning">Annuleren</button></Link>
        </div>
        : null}
    </div>
  )
}