import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Props } from "./SearchInput.types";

const SearchInput = ({ onSearch }: Props) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;

  useEffect(() => {
    const timer = setTimeout(() => onSearchRef.current(inputValue), 400);
    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(inputValue);
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          borderRadius={20}
          placeholder={t("search_input.message")}
          variant="filled"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
