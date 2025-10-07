interface popupUsersData {
    userData: {
        id?: number;
        name?: string;
        username?: string;
        email?: string;
    };
}

const PopupUsers: React.FC<popupUsersData> = ({ userData }) => {
  return (
    <div>
      <p>ID: {userData.id}</p>
      <p>Name: {userData.name}</p>
      <p>Username: {userData.username}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default PopupUsers;