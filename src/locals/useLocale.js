import { createI18n } from "vue-i18n";
import zhCn from "./zh-cn";
import en from "./en";

export const useLocale = () => {
  const i18n = createI18n({
    legacy: false,
    locale: "zhCn",
    messages: {
      zhCn,
      en
    }
  });

  const setLocale = (lang) => {
    i18n.global.locale.value = lang;
  }
  return {
    translate: i18n.global.t,
    setLocale
  }

}
