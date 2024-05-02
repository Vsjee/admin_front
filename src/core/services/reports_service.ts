import axios, { AxiosResponse } from 'axios';
import { serverStgUrl } from '../../config/environment_stg_config';

class ReportsService {
  // [GET]
  async getGlobalReport(): Promise<number> {
    const response = await axios.get(`${serverStgUrl}/reports/global`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'global-report.pdf');
    document.body.appendChild(link);
    link.click();

    return response.status;
  }

  async getCustomerReportById(customerId: string): Promise<number> {
    const response = await axios.get(
      `${serverStgUrl}/reports/customer/${customerId}`,
      {
        responseType: 'blob',
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `customer-${customerId}-report.pdf`);
    document.body.appendChild(link);
    link.click();

    return response.status;
  }
}

const reportsService = new ReportsService();

export default reportsService;
