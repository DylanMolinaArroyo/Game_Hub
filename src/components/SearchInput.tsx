import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { BsSearch } from "react-icons/bs";
interface Props {
  onSearch: (searchText: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) onSearch(ref.current.value);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder={t("search_input.message")}
          variant="filled"
          onChange={(event) => onSearch(event.target.value)}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
