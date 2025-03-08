import { SelectData } from "@/types/SelectData";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface SearchSortByProps {
  label?: string;
  value: string;
  data: SelectData[];
  onChange: (value: string) => void;
}

const SearchSortBy = ({
  label = "Sortuj po",
  data,
  value,
  onChange,
}: SearchSortByProps) => {
  const onChangeHandler = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="sort-by-select-label">{label}</InputLabel>
      <Select
        labelId="sort-by-select-label"
        id="sort-by-select"
        value={value}
        label={label}
        className=""
        onChange={onChangeHandler}
      >
        {data.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchSortBy;
