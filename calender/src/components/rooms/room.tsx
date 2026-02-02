import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsersInRoom } from "../../services/roomService.ts";

const Room: React.FC = () => {
  const { id } = useParams();
  const [members, setMembers] = useState<{ userId: number; name: string }[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const usersInRoom = await getUsersInRoom(id);
        setMembers(usersInRoom);
      } catch (err) {
        console.error("Failed to load room members", err);
      }
    };

    if (id) fetchMembers();
  }, [id]);

  return (
    <div className="room-container">
      <Link to={"/rooms"}>
        <button className="back-button">Go back</button>
      </Link>

      <p>Room ID: {id}</p>

      <h3>Users in this room:</h3>
      {members.length === 0 ? (
        <p>No one in this room yet</p>
      ) : (
        <ul>
          {members.map((m) => (
            <li key={m.userId}>{m.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Room;