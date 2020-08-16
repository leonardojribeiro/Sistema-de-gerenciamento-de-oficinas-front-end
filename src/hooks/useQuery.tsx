import { useLocation } from "react-router-dom";

export default function useQuery(key: string){
  return new URLSearchParams(useLocation().search).get(key);
}