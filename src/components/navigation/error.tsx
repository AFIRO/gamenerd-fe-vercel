import { Link } from "react-router-dom";
import { useSession } from "../../contexts/AuthProvider";
import { ErrorIdentifier } from "./error.identifier";

export default function ErrorMessage({ error }) {
  const { hasRoles }: { hasRoles: string[] } = useSession();
  if (error) {
    switch (error.message) {

      case ErrorIdentifier.REVIEW_NOT_FOUND:
        return (
          <div cy-data="no-reviews-game-error" className="text-light"> <h2>Er is nog geen review geschreven voor dit spel.</h2>
            <h4>Indien je een schrijver bent, schrijf er gerust eentje!</h4>
            {hasRoles.includes("WRITER") ? <Link to={`/reviews/create`}><button className="btn btn-secondary mt-3">Review aanmaken</button></Link> : null}
          </div>
        );

      case ErrorIdentifier.REVIEWS_NOT_FOUND_GAME:
        return (
          <div cy-data="no-reviews-game-error" className="text-light"> <h2>Er is nog geen review geschreven voor dit spel.</h2>
            <h4>Indien je een schrijver bent, schrijf er gerust eentje!</h4>
            {hasRoles.includes("WRITER") ? <Link to={`/reviews/create`}><button className="btn btn-secondary mt-3">Review aanmaken</button></Link> : null}
          </div>
        );

      case ErrorIdentifier.NEWS_NOT_FOUND_GAME:
        return (
          <div cy-data="no-news-game-error" className="text-light"> <h2>Er is nog geen nieuws geschreven voor dit spel.</h2>
            <h4>Indien je een schrijver bent, schrijf er gerust eentje!</h4>
            {hasRoles.includes("WRITER") ? <Link to={`/news/create`}><button className="btn btn-secondary mt-3">Nieuws item aanmaken</button></Link> : null}
          </div>
        );

        case ErrorIdentifier.NEWS_NOT_FOUND:
          return (
            <div cy-data="no-news-game-error" className="text-light"> <h2>Er is nog geen nieuws geschreven voor dit spel.</h2>
              <h4>Indien je een schrijver bent, schrijf er gerust eentje!</h4>
              {hasRoles.includes("WRITER") ? <Link to={`/news/create`}><button className="btn btn-secondary mt-3">Nieuws item aanmaken</button></Link> : null}
            </div>
          );

        case ErrorIdentifier.REVIEWS_NOT_FOUND_WRITER:
          return (
            <div cy-data="no-reviews-writer-error" className="text-light"> <h2>Deze user heeft nog geen reviews geschreven.</h2>
            </div>
          );
  
        case ErrorIdentifier.NEWS_NOT_FOUND_WRITER:
          return (
            <div cy-data="no-news-writer-error" className="text-light"> <h2>Deze user heeft nog geen nieuws items geschreven.</h2>
            </div>
          );

      case ErrorIdentifier.NO_GAMES:
        return (
          <div cy-data="no-games-error" className="text-light"> <h2>Er zijn geen games in de achterliggende databasis.</h2>
            <h4>Gelieve de administrator te contacteren of zelf eentje aan te maken.</h4>
            {hasRoles.includes("ADMIN") ? <Link to={`/games/create`}><button className="btn btn-secondary mt-3">Game aanmaken</button></Link> : null}
          </div>
        );

      case ErrorIdentifier.NO_NEWS:
        return (
          <div cy-data="no-news-error" className="text-light"> <h2>Er zijn geen nieuws items in de achterliggende databasis.</h2>
            <h4>Gelieve de administrator te contacteren of zelf eentje aan te maken.</h4>
            {hasRoles.includes("WRITER") ? <Link to={`/news/create`}><button className="btn btn-secondary mt-3">Nieuws item aanmaken</button></Link> : null}
          </div>
        );

      case ErrorIdentifier.NO_REVIEWS:
        return (
          <div cy-data="no-reviews-error" className="text-light"> <h2>Er zijn geen reviews in de achterliggende databasis.</h2>
            <h4>Gelieve de administrator te contacteren of zelf eentje aan te maken.</h4>
            {hasRoles.includes("WRITER") ? <Link to={`/reviews/create`}><button className="btn btn-secondary mt-3">Review aanmaken</button></Link> : null}
          </div>
        );

        case ErrorIdentifier.WRONG_CREDENTIALS:
          return (
            <div className="alert alert-danger">
              <h4 className="alert-heading">Login error</h4>
              <p cy-data="error-message">Credentials invalid. Please try again.</p>
            </div>
          );

      case ErrorIdentifier.USER_ALREADY_EXISTS:
        return (
          <div className="alert alert-danger">
            <h4 className="alert-heading">Registration error</h4>
            <p cy-data="error-message">Username already exists. Please choose another name.</p>
          </div>
        );

        case ErrorIdentifier.NO_USER_FOUND:
          return (
            <div className="alert alert-danger">
              <h4 className="alert-heading">Login Error</h4>
              <p cy-data="error-message">User not found. Please register before logging in.</p>
            </div>
          );

      default:
        return (
          <div cy-data="generic-error" className="alert alert-danger">
            <h4 className="alert-heading">An error occured</h4>
            <p cy-data="error-message">{error.message || JSON.stringify(error)}</p>
          </div>
        );
    }
  }

  return null;
}
