import axios, { AxiosResponse } from 'axios';
import { Kid, KidBooksInfo } from '../types/kids_types';
import { serverStgUrl } from '../../config/environment_stg_config';

class KidsService {
  // [GET]
  getKids(): Promise<AxiosResponse<Kid[]>> {
    axios.defaults.baseURL = `${serverStgUrl}/kids`;
    return axios.get<Kid[]>('');
  }

  getKidsByCustomerId(customerId: string): Promise<AxiosResponse<Kid[]>> {
    axios.defaults.baseURL = `${serverStgUrl}/kids/${customerId}`;
    return axios.get<Kid[]>('');
  }

  getKidById(kidId: string): Promise<AxiosResponse<Kid>> {
    axios.defaults.baseURL = `${serverStgUrl}/kids/info/${kidId}`;
    return axios.get<Kid>('');
  }

  getKidInfoDataById(kidId: string): Promise<AxiosResponse<KidBooksInfo>> {
    axios.defaults.baseURL = `${serverStgUrl}/kids/books-info/${kidId}`;
    return axios.get<KidBooksInfo>('');
  }

  // [POST]
  createKid(kid: Kid): Promise<AxiosResponse<Kid>> {
    axios.defaults.baseURL = `${serverStgUrl}/kids/post`;
    return axios.post<Kid>('', { data: kid });
  }

  // [DELETE]
  deleteKidById(kidId: string): Promise<AxiosResponse<Kid>> {
    axios.defaults.baseURL = `${serverStgUrl}/kids/delete/${kidId}`;
    return axios.delete<Kid>('');
  }

  // [PATCH]
  updateKidById(kid: Kid): Promise<AxiosResponse<Kid>> {
    axios.defaults.baseURL = `${serverStgUrl}/kids/patch/${kid._id}`;
    return axios.patch<Kid>('', kid);
  }
}

const kidsService = new KidsService();

export default kidsService;
