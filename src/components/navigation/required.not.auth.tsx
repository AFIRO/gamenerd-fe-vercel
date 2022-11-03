import { Navigate } from "react-router-dom";
import { useSession } from "../../contexts/AuthProvider";

export function RequireNoAuth({ children}: { children: JSX.Element}) {
  const {isAuthed }: {isAuthed: boolean } = useSession();

  if (isAuthed) {
    return <Navigate to="/" />;
  } 

  return children;
}
