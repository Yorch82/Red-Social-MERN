import { useSelector } from "react-redux";
import { Card } from 'antd';
const API_URL = 'http://localhost:8080';
const { Meta } = Card;

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log( user.user.avatar)  
  return (
    <div>
      <h1>Profile</h1>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="your ugly face" src={API_URL + "/assets/defaultavatar.jpg"} />}>
        <Meta title={user.user.name} description={user.user.mail} />
      </Card>
    </div>
  );
};

export default Profile;