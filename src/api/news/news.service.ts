import { axios } from '..';
import { NewsCreateDto } from './model/news.create.dto';
import { NewsUpdateDto } from './model/news.update.dto';
import { News } from './model/news.model';


const baseUrl: string = `/news`

export const getAll = async (): Promise<News[]>  => {
  const {data} = await axios.get(baseUrl);

  return data;
};

export const getAllByGameId = async (id:string): Promise<News[]> => {
  const {data} = await axios.get(`${baseUrl}/byGame/${id}`);
  return data;
};

export const getAllByUserId = async (id:string): Promise<News[]> => {
  const {data} = await axios.get(`${baseUrl}/byWriter/${id}`);
  return data;
};

export const getById = async (id:string): Promise<News> => {
  const {data} = await axios.get(`${baseUrl}/${id}`);
  return data;
	
};

export const save = async (dto: NewsCreateDto): Promise<News> => {
  const {data} = await axios.post(`${baseUrl}`, dto);
  return data;
};

export const update = async (id:string, dto: NewsUpdateDto): Promise<News> => {
  const {data} = await axios.put(`${baseUrl}/${id}`, dto);
  return data;
}

export const deleteById = async (id:string): Promise<News> => {
  const {data} = await axios.delete(`${baseUrl}/${id}`);
  return data;
};