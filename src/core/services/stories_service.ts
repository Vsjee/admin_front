import axios, { AxiosResponse } from 'axios';
import { serverStgUrl } from '../../config/environment_stg_config';
import { IStory } from '../types/stories_types';

class StoriesService {
  // [GET]
  getStories(): Promise<AxiosResponse<IStory[]>> {
    axios.defaults.baseURL = `${serverStgUrl}/stories`;
    return axios.get<IStory[]>('');
  }

  getStoriesByCustomerId(customerId: string): Promise<AxiosResponse<IStory[]>> {
    axios.defaults.baseURL = `${serverStgUrl}/stories/${customerId}`;
    return axios.get<IStory[]>('');
  }

  // [DELETE]
  deleteStorieById(storyId: string): Promise<AxiosResponse<IStory>> {
    axios.defaults.baseURL = `${serverStgUrl}/stories/delete/${storyId}`;
    return axios.delete<IStory>('');
  }

  // [PATCH]
  updateStorieById(story: IStory): Promise<AxiosResponse<IStory>> {
    axios.defaults.baseURL = `${serverStgUrl}/stories/patch/${story._id}`;
    return axios.patch<IStory>('', story);
  }
}

const storiesService = new StoriesService();

export default storiesService;
