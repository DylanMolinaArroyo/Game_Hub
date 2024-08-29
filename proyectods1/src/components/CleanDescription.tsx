import React from "react";
import useTranslateText from "../hooks/useTranslation";

interface Props {
  description: string;
  targetLanguage: string;
}

const CleanDescription: React.FC<Props> = ({ description, targetLanguage }) => {
  const adjustedLanguage = targetLanguage === "US" ? "en" : targetLanguage;
  const translatedDescription = useTranslateText(description, adjustedLanguage);

  const cleanText = (text: string) =>
    text
      .replace(/<\/?p>/g, "\n\n")
      .replace(/<br\s*\/?>/g, "\n")
      .replace(/<\/?[^>]+(>|$)/g, "");

  return cleanText(translatedDescription);
};

export default CleanDescription;
