import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { format as formatDate, isDate } from "date-fns";
import { enUS, id, ms, zhTW, zhCN } from "date-fns/locale";

const locales = { enUS, id, ms, zhTW, zhCN };

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en-US",
    debug: true,
    detection: {
      order: ["localStorage", "cookie", "queryString"],
      cache: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (isDate(value)) {
          const locale = locales[lng];
          return formatDate(value, format, { locale });
        }
      },
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    ns: ["common"],
  });

export default i18n;
