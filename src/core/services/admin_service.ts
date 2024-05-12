import axios, { AxiosResponse } from 'axios';
import { serverStgUrl } from '../../config/environment_stg_config';
import { Admin, AdminUserProfile } from '../types/admin_types';

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

  // [GET] user by id
  getAdminById(userId: string): Promise<AxiosResponse<AdminUserProfile>> {
    axios.defaults.baseURL = `${serverStgUrl}/admin/id/${userId}`;

    return axios.get<AdminUserProfile>('');
  }

  // [PATCH] update user password
  updateAdminPassword(
    user: AdminUserProfile
  ): Promise<AxiosResponse<AdminUserProfile>> {
    axios.defaults.baseURL = `${serverStgUrl}/admin/update`;

    return axios.patch<AdminUserProfile>('', user);
  }
}

const adminService = new AdminService();

export default adminService;
