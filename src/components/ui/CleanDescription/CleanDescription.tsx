import React from "react";
import { Props } from "./CleanDescription.types";

const CleanDescription: React.FC<Props> = ({ description }) => {
  const cleanText = (text: string) =>
    text
      .replace(/<\/?p>/g, "\n\n")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<\/?[^>]+(>|$)/g, "");

  return <>{cleanText(description)}</>;
};

export default CleanDescription;
