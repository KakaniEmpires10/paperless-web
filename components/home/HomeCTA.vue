<template>
  <section
    id="cta"
    class="container mx-auto bg-muted p-6 sm:p-10 md:p-16 lg:p-20 my-10 md:my-16 lg:my-20 rounded-xl text-center flex flex-col items-center gap-4 sm:gap-5">
    <h3
      class="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight text-foreground">
      Tingkatkan Efisiensi Rumah Sakit dengan Alur Kerja Klinis yang Lebih Mudah
    </h3>
    <p class="text-base sm:text-lg text-muted-foreground max-w-4xl">
      Hemat waktu berharga tenaga medis dan kurangi beban administratif dengan
      PaperlessHospital, solusi cerdas untuk rumah sakit dan klinik modern.
      <span class="hidden lg:inline">
        PaperlessHospital mengintegrasikan teknologi AI Scribe untuk menangkap
        dan merangkum kunjungan pasien secara otomatis, didukung Medical
        Dictation untuk dokumentasi suara-ke-teks yang akurat, serta Medical
        Search untuk pencarian data medis yang cepat dan efisien. Instalasi
        mudah dan kompatibel dengan semua sistem EHR, PaperlessHospital siap
        meningkatkan produktivitas praktik medis Anda.
      </span>
      Mulailah optimalkan dokumentasi klinis di rumah sakit atau klinik Anda
      bersama PaperlessHospital hari ini!
    </p>
    <div class="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full justify-center">
      <UiButton as-child>
        <NuxtLink to="/contact">
          <Icon name="lucide:phone" />
          Hubungi Kami
        </NuxtLink>
      </UiButton>
      <UiButton as-child variant="outline">
        <NuxtLink to="/pricing">
          <Icon name="lucide:tag" />
          Lihat Paket
        </NuxtLink>
      </UiButton>
    </div>
  </section>
</template>

<style scoped>
#cta {
  background-image: url("https://www.transparenttextures.com/patterns/xv.png");
}
</style>
