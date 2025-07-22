import type { Setting } from "~/server/db/schema";

export const useSettingStore = defineStore("settingStore", {
  state: () => ({
    setting: null as Setting | null,
    loading: false,
    error: null as string | null,
    isConnectionError: false,
  }),

  actions: {
    async fetchSetting() {
      this.loading = true;
      this.error = null;
      this.isConnectionError = false;

      try {
        const { data, error } = await useFetch<Setting>("/api/settings", {
          key: "setting",
        });

        if (error.value) {
          this.error = "Tidak dapat menghubungi server.";
          this.isConnectionError = true;
          return;
        }

        if (!data.value) {
          this.error = "Data setting kosong/table setting tidak ditemukan.";
          this.setting = null;
        } else {
          this.setting = data.value;
        }
      } catch (err) {
        this.error = "Kesalahan tidak terduga.";
        this.isConnectionError = true;
      } finally {
        this.loading = false;
      }
    },
  },
});
