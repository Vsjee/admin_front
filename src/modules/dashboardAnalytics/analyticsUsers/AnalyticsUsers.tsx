import { useEffect, useState } from 'react';
import { Customer } from '../../../core/types/customers_types';
import customersService from '../../../core/services/customers_service';
import UsersTable from './components/UsersTable';
import AnalyticsUsersHeader from './AnalyticsUsersHeader';

function AnalyticsUsers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  function initCustomers() {
    customersService
      .getCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    initCustomers();
  }, []);

  return (
    <>
      <AnalyticsUsersHeader customers={customers} />
      <div
        className="p-5"
        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 85px)' }}>
        <UsersTable customers={customers} />
      </div>
    </>
  );
}

export default AnalyticsUsers;
