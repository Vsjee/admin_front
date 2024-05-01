import { useState, useEffect } from 'react';
import kidsService from '../../../core/services/kids_service';
import { Kid } from '../../../core/types/kids_types';
import KidsTable from './components/KidsTable';

function AnalyticsKids() {
  const [kids, setKids] = useState<Kid[]>([]);

  function initKids() {
    kidsService
      .getKids()
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
    <div>
      <KidsTable kids={kids} />
    </div>
  );
}

export default AnalyticsKids;
