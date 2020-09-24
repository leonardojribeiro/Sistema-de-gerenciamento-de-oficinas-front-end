export default interface AutoCompleteProps<T>{
  onChange?: (data: T | null) => void;
  label: string;
  name: string;
  required?: boolean;
  listOptionsIn: boolean;
  disabled?: boolean
}