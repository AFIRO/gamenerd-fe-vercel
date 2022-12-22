import { ThreeCircles } from "react-loader-spinner";

export default function Loader({ loading }) {
  if (loading) {
    return (
<>
      <div className='d-flex justify-content-center'>
        <ThreeCircles color='white'></ThreeCircles>
        </div>
        <br />
        <h1 className="text-light">Loading...</h1>
      </>
    );
  }

  return null;
}