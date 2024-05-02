import DashboardHeader from './DashboardHeader';

import { useEffect, useState } from 'react';
import { Customer } from '../../core/types/customers_types';
import { Kid } from '../../core/types/kids_types';
import { IBook } from '../../core/types/books_types';
import { IStory } from '../../core/types/stories_types';
import customersService from '../../core/services/customers_service';
import kidsService from '../../core/services/kids_service';
import booksService from '../../core/services/books_types';
import storiesService from '../../core/services/stories_service';
import DashboardCustomersChart from './charts/DashboardCustomersChart';
import DashboardKidsCharts from './charts/DashboardKidsCharts';

function DashboardHome() {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [allKids, setAllKids] = useState<Kid[]>([]);
  const [allBooks, setAllBooks] = useState<IBook[]>([]);
  const [allStories, setAllStories] = useState<IStory[]>([]);

  const initAllCustomers = () => {
    customersService
      .getCustomers()
      .then((response) => {
        setAllCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const initAllKids = () => {
    kidsService
      .getKids()
      .then((response) => {
        setAllKids(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const initAllBooks = () => {
    booksService
      .getBooks()
      .then((response) => {
        setAllBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const initAllStories = () => {
    storiesService
      .getStories()
      .then((response) => {
        setAllStories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    initAllCustomers();
    initAllKids();
    initAllBooks();
    initAllStories();
  }, []);

  return (
    <>
      <DashboardHeader />
      <div
        className="p-5"
        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 85px)' }}>
        <DashboardCustomersChart
          customers={allCustomers}
          books={allBooks}
          kids={allKids}
        />
        <DashboardKidsCharts kids={allKids} />
      </div>
    </>
  );
}

export default DashboardHome;
