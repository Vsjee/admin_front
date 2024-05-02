import axios, { AxiosResponse } from 'axios';
import { serverStgUrl } from '../../config/environment_stg_config';
import { Customer } from '../types/customers_types';

class CustomersService {
  // [GET]
  getCustomers(): Promise<AxiosResponse<Customer[]>> {
    axios.defaults.baseURL = `${serverStgUrl}/customers`;
    return axios.get<Customer[]>('');
  }

  getCustomerId(customerId: string): Promise<AxiosResponse<Customer>> {
    axios.defaults.baseURL = `${serverStgUrl}/customers/id/${customerId}`;
    return axios.get<Customer>('');
  }

  getCustomerUid(customerUid: string): Promise<AxiosResponse<Customer>> {
    axios.defaults.baseURL = `${serverStgUrl}/customers/uid/${customerUid}`;
    return axios.get<Customer>('');
  }

  // [POST]
  createCustomer(customer: Customer): Promise<AxiosResponse<Customer>> {
    axios.defaults.baseURL = `${serverStgUrl}/customers/post`;
    return axios.post<Customer>('', customer);
  }

  // [DELETE]
  deleteCustomerById(customerId: string): Promise<AxiosResponse<Customer>> {
    axios.defaults.baseURL = `${serverStgUrl}/customers/delete/${customerId}`;
    return axios.delete<Customer>('');
  }

  // [PATCH]
  updateKidById(customer: Customer): Promise<AxiosResponse<Customer>> {
    axios.defaults.baseURL = `${serverStgUrl}/customers/patch/${customer._id}`;
    return axios.patch<Customer>('', { data: customer });
  }
}

const customersService = new CustomersService();

export default customersService;
