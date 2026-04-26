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

export const iconMap: { [key: string]: IconType } = {
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

export const colorMap: { [key: string]: string } = {
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
