import { useLocation } from "react-router-dom";

export default function useQuery(key){
  return new URLSearchParams(useLocation().search).get(key);
}