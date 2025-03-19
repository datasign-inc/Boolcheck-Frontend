import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationJa from "../../public/locales/ja.json";
import translationEn from "../../public/locales/en.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "ja",
    returnEmptyString: false,
    resources: {
      en: {
        translation: translationEn,
      },
      ja: {
        translation: translationJa,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "span"],
    },
  });

export default i18n;
