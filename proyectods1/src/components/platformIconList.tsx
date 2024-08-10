import { Heading, HStack, Icon } from "@chakra-ui/react";
import { Platform } from "../hooks/useGames";
import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { SiNintendoswitch } from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import { IconType } from "react-icons";

interface Props {
  platforms: Platform[];
  showName: boolean;
}

const PlatformIconList = ({ platforms, showName }: Props) => {
  // Mapa de iconos
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNintendoswitch,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };

  // Mapa de colores
  const colorMap: { [key: string]: string } = {
    pc: "blue.500",
    playstation: "blue.700",
    xbox: "green.500",
    nintendo: "red.500",
    mac: "gray.500",
    linux: "orange.500",
    android: "green.700",
    ios: "gray.700",
    web: "purple.500",
  };

  return (
    <HStack marginY={1}>
      {platforms.map((platform) => (
        <HStack key={platform.id}>
          <Icon
            as={iconMap[platform.slug]}
            color={colorMap[platform.slug] || "gray.500"}
          />
          {showName && <Heading size="sm">{platform.name}</Heading>}
        </HStack>
      ))}
    </HStack>
  );
};

export default PlatformIconList;
