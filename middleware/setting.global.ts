export default defineNuxtRouteMiddleware(async () => {
  const settingStore = useSettingStore();

  // Jika belum fetch (misal saat navigasi client side), fetch sekarang
  if (!settingStore.setting && !settingStore.loading && !settingStore.error) {
    await settingStore.fetchSetting();
  }

  // Kalau setelah fetch tetap tidak ada setting
  if (settingStore.error || !settingStore.setting) {
    const isConnection = settingStore.isConnectionError;

    throw createError({
      statusCode: 500,
      statusMessage: isConnection
        ? "Koneksi ke database gagal"
        : "Tabel setting kosong atau belum disiapkan",
      fatal: true,
    });
  }
});
