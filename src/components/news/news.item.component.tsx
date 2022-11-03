import { useEffect, useState } from "react"
import Loader from '../navigation/loading';
import * as newsService from '../../api/news/news.service';
import { News } from "../../api/news/model/news.model";
import ErrorMessage from "../navigation/error";
import { useParams } from "react-router-dom";


export default function NewsItemComponent() {
  const newsId = useParams().id;
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [news, setNews] = useState<News>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        let data: News;
        data = await newsService.getById(newsId);
        setNews(data);
      } catch (error) {
        console.error(error);
        setError(new Error(error.response.data.message));
      } finally {
        setLoading(false);
      };
    }
    fetchNews();
  }, [newsId]);


  return (
    <div cy-data="news-item">
      <Loader loading={loading} />
      <ErrorMessage error={error} />
      {!loading && !error ?
        <div cy-data="news-item-header" className="text-light"> <h1 className="text-light">News over {news.game.name}</h1>
          <h2 cy-data="news-item-writer">Geschreven door {news.writer.name}</h2>
          <p cy-data="news-item-content">{news.content}</p>
        </div>
        : null}
    </div>
  )
}