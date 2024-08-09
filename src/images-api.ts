import axios from "axios";
import { Image } from "./components/App/App";

const API_KEY = "KRNJhs0g10MZsM62FfXYN_CmaZP9RR3ihLQR1jBWkeU";
axios.defaults.baseURL = "https://api.unsplash.com/";



interface Response {
  results: Image[];
  total_pages: number;
}

export const fetchImages = async (query: string, currentPage: number) => {
  const response = await axios.get<Response>("/search/photos", {
    params: {
      client_id: API_KEY,
      query: query,
      page: currentPage,
      per_page: 9,
      orientation: 'landscape',
    },
  });

  return {
    images: response.data.results,
    total_pages: response.data.total_pages,
  };
};
