import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useGenres, { Genre } from "../hooks/useGenres";
import { useTranslation } from "react-i18next";

interface Props {
  selectedGenre: Genre | null;
  onSelectGenre: (genre: Genre) => void;
}

const GenreSelector = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, error } = useGenres();
  const { t } = useTranslation();

  if (error) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {selectedGenre
          ? t(`${selectedGenre.name.toLowerCase()}.message`)
          : t("genres.message")}
      </MenuButton>
      <MenuList maxH="300px" overflowY="auto">
        {data.map((genre) => (
          <MenuItem key={genre.id} onClick={() => onSelectGenre(genre)}>
            {t(`${genre.name.toLowerCase()}.message`)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default GenreSelector;
