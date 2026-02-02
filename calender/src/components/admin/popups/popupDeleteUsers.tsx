interface popupUserData {
  userData: {
      id: number;
      name: string;
      email: string;
      biography: string;
  };
  saveDeleteUser: (userData) => void;
}

const PopupDeleteUsers: React.FC<popupUserData> = ({ userData, saveDeleteUser }) => {

  const deleteUser = () => {
    saveDeleteUser(userData)
  }

  return (
    <div>
        <p>Are you sure that you wanna delete:</p>
        <p>ID: {userData.id}</p>
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      <br></br>
      <button onClick={deleteUser}>Delete</button>
    </div>
  );
};

export default PopupDeleteUsers;