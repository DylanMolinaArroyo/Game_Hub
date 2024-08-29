import axios from "axios";
import { useState, useEffect } from "react";

const useTranslateText = (text: string, targetLanguage: string) => {
  const [translatedText, setTranslatedText] = useState<string>(text);

  useEffect(() => {
    const translateText = async () => {
      try {
        const apiKey ="AIzaSyBjCaZvfVK_jASw5C2qgkRSCcRj4a7tXe0"; // Usar variable de entorno para la clave API
        if (!apiKey) {
          console.error("API key is missing");
          return;
        }

        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

        const response = await axios.post(
          url,
          {
            q: text,
            target: targetLanguage,
            format: "text",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setTranslatedText(response.data.data.translations[0].translatedText);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error translating text:", error.message);
          console.error("Error details:", error.response?.data || "No details");
        } else {
          console.error("Unknown error:", error);
        }
        setTranslatedText(text); // Fallback to original text on error
      }
    };

    if (targetLanguage) {
      translateText();
    }
  }, [text, targetLanguage]);

  return translatedText;
};

export default useTranslateText;
