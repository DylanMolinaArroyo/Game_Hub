import {
  HStack,
  List,
  ListItem,
  Spinner,
  Button,
  Image,
  Heading,
  Card,
} from "@chakra-ui/react";
import useGenres from "../hooks/useGenres";
import getCroppedImageUrl from "../services/image-url";
import { Genre } from "../hooks/useGenres";
import { useTranslation } from "react-i18next";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreList = ({ selectedGenre, onSelectGenre }: Props) => {
  const { data, isLoading, error } = useGenres();
  const { t } = useTranslation();

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <Card
      padding={4}
      backgroundColor="surface"
      borderRadius="md"
      boxShadow="md"
    >
      <Heading
        fontSize="2xl"
        marginTop={1}
        marginBottom={6}
        color="text.heading"
      >
        {t("genres.message")}
      </Heading>

      <List>
        {data.map((genre) => (
          <ListItem key={genre.id} paddingY="7px">
            <HStack spacing={4} alignContent="center">
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                color="text.heading"
                onClick={() => onSelectGenre(genre)}
                fontSize="md"
                variant="link"
                _hover={{ bg: "surface" }}
              >
                {t(`${genre.name.toLowerCase()}.message`)}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default GenreList;
