import { useEffect, useState } from "react"
import NewsListItemComponent from "./news.list.item.component"
import Loader from '../navigation/loading';
import * as newsService from '../../api/news/news.service';
import { News } from "../../api/news/model/news.model";
import ErrorMessage from "../navigation/error";
import { useSession } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

export default function NewsListComponent() {
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [news, setNews] = useState<News[]>([])
  const {hasRoles}: { hasRoles: string[] } = useSession();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        let data: News[];
        data = await newsService.getAll();
        setNews(data);
      } catch (error) {
        console.error(error);
        setError(new Error(error.response.data.message));
      } finally {
        setLoading(false);
      };
    }
    fetchNews();
  }, []);


  return (
    <div>
    <Loader loading={loading} />
    <ErrorMessage error={error} />
    {!loading && !error ?
    <div>  <h1 cy-data="news-header" className="text-light">Overzicht van alle news</h1>
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