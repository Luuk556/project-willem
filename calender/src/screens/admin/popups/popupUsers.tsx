import { useState } from "react";

interface popupUsersData {
  userData: {
      id?: number;
      name?: string;
      username?: string;
      email?: string;
  };
  saveUserChanges: (changedData: { name: string; username: string; email: string }, id: Number) => void;
}

interface changeUserData {
  name: string;
  username: string;
  email: string;
}

const PopupUsers: React.FC<popupUsersData> = ({ userData, saveUserChanges }) => {
  const [userChanges, setUserChanges] = useState<changeUserData>({
    name: userData.name || "",
    username: userData.username || "",
    email: userData.email || "",
  });

  const changeUser = () => {
    if (userData.id != undefined) saveUserChanges(userChanges, userData.id)
  }

  return (
    <div>
      <p>ID: {userData.id}</p>
      <label>Name: </label>
      <input type="text" value={userChanges.name} onChange={e => {setUserChanges({...userChanges, name: e.target.value })}} />
      <br></br>
      <label>Username: </label>
      <input type="text" value={userChanges.username} onChange={e => {setUserChanges({...userChanges, username: e.target.value })}}/>
      <br></br>
      <label>Mail:</label>
      <input type="text" value={userChanges.email}  onChange={e => {setUserChanges({...userChanges, email: e.target.value })}} />
      <br></br>
      <button onClick={changeUser}>Save</button>
    </div>
  );
};

export default PopupUsers;