import { useLocation } from "react-router-dom";

export default function QueryParametros(){
    return new URLSearchParams(useLocation().search);
}