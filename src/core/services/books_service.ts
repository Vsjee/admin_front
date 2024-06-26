import axios, { AxiosResponse } from 'axios';
import { serverStgUrl } from '../../config/environment_stg_config';
import { BookDeletion, IBook } from '../types/books_types';

class BooksService {
  // [GET]
  getBooks(): Promise<AxiosResponse<IBook[]>> {
    axios.defaults.baseURL = `${serverStgUrl}/books`;
    return axios.get<IBook[]>('');
  }

  getBooksByCustomerId(customerId: string): Promise<AxiosResponse<IBook[]>> {
    axios.defaults.baseURL = `${serverStgUrl}/books/${customerId}`;
    return axios.get<IBook[]>('');
  }

  // [DELETE]
  deleteBookById(bookId: string): Promise<AxiosResponse<BookDeletion>> {
    axios.defaults.baseURL = `${serverStgUrl}/books/delete/${bookId}`;
    return axios.delete<BookDeletion>('');
  }

  // [PATCH]
  updateBookById(book: IBook): Promise<AxiosResponse<IBook>> {
    axios.defaults.baseURL = `${serverStgUrl}/books/patch/${book._id}`;
    book.modification_date = Date.now();
    return axios.patch<IBook>('', book);
  }

  updateBookStatus(book: IBook): Promise<AxiosResponse<IBook>> {
    axios.defaults.baseURL = `${serverStgUrl}/books/patch-status/${book._id}`;
    return axios.patch<IBook>('', book);
  }
}

const booksService = new BooksService();

export default booksService;
