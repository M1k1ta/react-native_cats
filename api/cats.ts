import { Breed } from "../types/Breed";
import { Cat } from "../types/Cat";
import { client } from "../utils/client"

const apiKey = 'live_t5w81Zu0VWKNY6YJSy6lSo7wO5Pqfl35DIKNDKInAI4tPXNDXLaI8gSrIeYuZ5qv'

export const getBreeds = async () => {
  const { data } = await client.get<Breed[]>(`/breeds?api_key=${apiKey}`)

  return data;
}

export const getCats = async (breed: string, limit: number = 1) => {
  const breedURL = (breed !== '') ? `&breed_ids=${breed}` : '';
  const { data } = await client.get<Cat[]>(`/images/search?limit=${limit}&api_key=${apiKey}${breedURL}`)

  return data;
}
