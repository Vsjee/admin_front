import { useEffect, useState } from 'react';
import UserKidsTable from '../components/UserKidsTable';
import { Kid } from '../../../../core/types/kids_types';
import kidsService from '../../../../core/services/kids_service';
import { useParams } from 'react-router-dom';

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
      <UserKidsTable kids={kids} />
    </>
  );
}

export default UserKidsDetail;
