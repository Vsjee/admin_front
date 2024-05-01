import { useEffect, useState } from 'react';
import UserKidsTable from '../components/UserKidsTable';
import { Kid } from '../../../../core/types/kids_types';
import kidsService from '../../../../core/services/kids_service';
import { useParams } from 'react-router-dom';
import UserKidsPieChart from '../charts/UserKidsPieChart';
import UserKidsSimpleBarChart from '../charts/UserKidsSimpleBarChart';
import UserKidsHeader from '../components/UserKidsHeader';

function UserKidsDetail() {
  const { id } = useParams();
  const [kids, setKids] = useState<Kid[]>([]);

  function initKids() {
    kidsService
      .getKidsByCustomerId(id!)
      .then((response) => {
        setKids(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    initKids();
  }, []);

  return (
    <>
      <UserKidsHeader kids={kids} customerId={id!} />
      <UserKidsTable kids={kids} />
      {kids.length !== 0 ? (
        <div className="flex justify-center pt-5">
          <UserKidsPieChart kids={kids} />
          <UserKidsSimpleBarChart kids={kids} />
        </div>
      ) : null}
    </>
  );
}

export default UserKidsDetail;
