import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserBooksTable from '../components/UserBooksTable';
import booksService from '../../../../core/services/books_types';
import { IBook } from '../../../../core/types/books_types';
import UserBooksHeader from '../components/UserBooksHeader';

function UserBooksDetail() {
  const { id } = useParams();
  const [books, setBooks] = useState<IBook[]>([]);

  function initStories() {
    booksService
      .getBooksByCustomerId(id!)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    initStories();
  }, []);

  return (
    <>
      <UserBooksHeader books={books} customerId={id!} />
      <UserBooksTable books={books} />
    </>
  );
}

export default UserBooksDetail;
