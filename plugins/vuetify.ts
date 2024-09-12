import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";
import DateFnsAdapter from "@date-io/date-fns";
import { ko } from "date-fns/locale";

export default defineNuxtPlugin((NuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "light",
      themes: {
        light: {
          dark: false,
          variables: {},
          colors: {
            primary: "#53278b",
            secondary: "#484848",
            tertiary: "#d50063",
            accent: "#0d6efd",
            success: "#56CA00",
            info: "#16B1FF",
            warning: "#FFB400",
            error: "#FF4C51",
            white: "#fff",
            black: "#000000",
            pink: "#e11475",
            pink2: "#ff7ea5",
            lightblue: "#9b9abb",
            purple: "#53278b",
            lightpurple2: "#6638bd",
            lightpurpleblue: "#f7f5fa",
            purple2: "#5c3882",
            greyshpurple: "#9795ba",
            linepurple: "#dfe2ec",
            dynamicpurple: "#7f46c7",
            activepurple: "#6427ff",
            deeppurple: "#371762",
            navy: "#383677",
            shyblue: "#f6f7fb",
            violet2: "#d09dff",
            linegrey: "#f6f7fb",
            skymint: "#20DEFF",
            springviolet: "#f4eeff",
            pettyviolet: "#fcfaff",
            coolviolet: "#e2d2ff",
            grey: "#999",
            grey2: "#c9c9c9",
            grey3: "#666",
            normalgrey: "#ddd",
            chacolgrey: "#434343",
            coolgrey: "#d5d4e9",
            coolgrey2: "#dedeeb",
            background: "#292930",
            brown: "#A13D2D",
            touchbox: "#E03E3E",
            lightpink: "#ff7ea5",
          },
        },
      },
    },
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
    date: {
      adapter: new DateFnsAdapter({
        locale: ko,
        formats: {
          year: "yyyy",
          monthAndYear: "yyyy년 M월",
          normalDateWithWeekday: "M월 d일(E)",
        },
      }),
    },
  });

  NuxtApp.vueApp.use(vuetify);
});
