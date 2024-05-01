import { useParams } from 'react-router-dom';

function UsersDetail() {
  const { id } = useParams();

  return <div>UsersDetail {id}</div>;
}

export default UsersDetail;
