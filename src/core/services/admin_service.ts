import axios, { AxiosResponse } from 'axios';
import { serverStgUrl } from '../../config/environment_stg_config';
import { Admin } from '../types/admin_types';

class AdminService {
  // [GET]
  getAdminAuth(
    userName: string,
    password: string
  ): Promise<AxiosResponse<Admin>> {
    const params = `?userName=${userName}&password=${password}`;

    axios.defaults.baseURL = `${serverStgUrl}/admin/${params}`;

    return axios.get<Admin>('');
  }
}

const adminService = new AdminService();

export default adminService;
