import { Link, useParams } from "react-router-dom";

const Room: React.FC = () => {
  const { id } = useParams();
  return (
    <div className="room-container">
        <Link to={"/rooms"}>
            <button className="back-button">
                Go back
            </button>
        </Link>
        <p>Room ID: {id}</p>
    </div>
  ) 
}

export default Room;