import { useState } from "react";
import CustomInput from "../../inputs/CustomInput.tsx";

interface popupUserData {
  userData: {
      id: number;
      name: string;
      email: string;
      biography: string;
  };
  saveUserChanges: (userData) => void;
}

const PopupUpdateUsers: React.FC<popupUserData> = ({ userData, saveUserChanges }) => {
  const [userChanges, setUserChanges] = useState<popupUserData["userData"]>({
    id: userData.id,
    name: userData.name,
    email: userData.email,
    biography: userData.biography,
  });

  const changeUser = () => {
    saveUserChanges(userChanges)
  }

  return (
    <div>
      <p>ID: {userData.id}</p>

      <CustomInput
        label="Name:"
        type="text"
        onChange={e => { setUserChanges({ ...userChanges, name: e }) }}
        defaultValue={userChanges.name}
      />

      <CustomInput
        label="E-mail:"
        type="text"
        onChange={e => { setUserChanges({ ...userChanges, email: e }) }}
        defaultValue={userChanges.email}
      />

      <CustomInput
        label="Biography:"
        type="text"
        onChange={e => { setUserChanges({ ...userChanges, biography: e }) }}
        defaultValue={userChanges.biography}
      />

      <br></br>
      <button onClick={changeUser}>Save</button>
    </div>
  );
};

export default PopupUpdateUsers;