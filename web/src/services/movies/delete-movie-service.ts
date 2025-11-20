import api from "../axios";

export const deleteMovie = async (id: string) => {
  const response = await api.delete(`/movies/${id}`);
  return response.data;
};