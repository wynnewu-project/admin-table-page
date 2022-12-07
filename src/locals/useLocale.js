import { createI18n } from "vue-i18n";
import zhCn from "./zh-cn";
import en from "./en";
import { watch, ref } from "vue";

export const useLocale = (lang) => {
  const locale = ref(lang ?? "zhCn");
  const i18n = createI18n({
    legacy: false,
    locale: locale.value,
    messages: {
      zhCn,
      en
    }
  });
  watch(lang, (value) => {
    i18n.global.locale.value = value;
  }, {
    immediate: true
  })
  return {
    t: i18n.global.t
  }

}
