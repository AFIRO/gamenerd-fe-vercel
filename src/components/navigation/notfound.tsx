import { useLocation } from "react-router-dom";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <div className="text-light">
      <br />
      <h1>Pagina niet gevonden</h1>
      <p>
        Er is geen pagina met als url {pathname}, probeer iets anders.
      </p>
    </div>
  )

}