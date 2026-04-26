import { Heading, HStack, Icon } from "@chakra-ui/react";
import { Props } from "./PlatformIconList.types";
import { iconMap, colorMap } from "./PlatformIconList.constants";

const PlatformIconList = ({ platforms, showName }: Props) => (
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

export default PlatformIconList;
