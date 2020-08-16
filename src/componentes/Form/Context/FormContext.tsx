import { createContext } from "react";
import { FormContextValues } from "../types";

const FormContext = createContext<FormContextValues>({} as FormContextValues);

export default FormContext;