<template>
  <section id="client" class="py-20 bg-accent">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5 items-center">
        <div>
          <UiBadge size="lg" rounded="pill" class="mb-4">Klient Kami</UiBadge>
          <h3
            class="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            Solusi Manajemen Rumah Sakit yang Terjangkau dan Terpercaya
          </h3>
        </div>
        <div class="hidden lg:flex lg:justify-center mt-8 lg:mt-0">
          <img
            class="w-40 sm:w-56 md:w-72 lg:w-full max-w-xs lg:max-w-md"
            src="~/assets/images/data-center.svg"
            alt="Data Center" />
        </div>
      </div>
      <p class="mb-5 text-base sm:text-lg text-muted-foreground">
        Kami Telah dipercaya oleh
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <UiCard
          v-for="data in dataArr"
          :key="data.type"
          class="flex items-center bg-primary/20 border-0 hover:shadow-lg transition-all duration-300">
          <UiCardContent class="p-6 w-full">
            <h3
              class="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-5">
              {{ data.total }}
            </h3>
            <p class="text-muted-foreground text-center">
              Rumah Sakit Tipe <strong>{{ data.type }}</strong>
            </p>
          </UiCardContent>
        </UiCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const dataArr = ref([
  {
    total: 2,
    type: "A",
  },
  {
    total: 3,
    type: "B",
  },
  {
    total: 9,
    type: "C",
  },
]);
</script>
