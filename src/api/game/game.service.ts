import { axios } from '..';
import { GameCreateDto } from './models/game.create.dto';
import { GameUpdateDto } from './models/game.update.dto';
import { Game } from './models/game.model';

const baseUrl: string = `/games`

export const getAll = async (): Promise<Game[]> => {
  const {data} = await axios.get(baseUrl);
  return data;
};

export const getById = async (id:string) : Promise<Game> => {
  const {data} = await axios.get(`${baseUrl}/${id}`);
  return data;
};

export const save = async (dto: GameCreateDto) : Promise<Game> => {
  const {data} = await axios.post(`${baseUrl}`, dto);
  return data;
};

export const update = async (id:string, dto: GameUpdateDto) : Promise<Game> => {
  const {data} = await axios.put(`${baseUrl}/${id}`, dto);
  return data;
}

export const deleteById = async (id:string) : Promise<Game> => {
  const {data} = await axios.delete(`${baseUrl}/${id}`);
  return data;
};