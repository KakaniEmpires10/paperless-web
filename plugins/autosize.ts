import { defineNuxtPlugin } from "#app";
import autosize from "@/directives/autosize";

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive("autosize", autosize);
});