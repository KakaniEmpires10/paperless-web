<template>
  <Motion
    :initial="{ opacity: 0, y: 50 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="mb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="feature in data"
        :key="feature.title"
        class="group relative overflow-hidden">
        <div
          class="bg-card rounded-lg p-6 border border-primary/30 h-full transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/50 group-hover:shadow-primary/20 relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-primary/20 before:via-transparent before:to-primary/10 before:opacity-0 before:transition-opacity before:duration-300 group-hover:before:opacity-100 before:-z-10">
          <div class="flex items-start justify-between mb-4">
            <div
              class="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
              <Icon :name="feature.icon!" class="text-primary" />
            </div>
            <UiBadge variant="soft" rounded="pill">{{
              feature.category
            }}</UiBadge>
          </div>
          <h3 class="font-semibold text-foreground mb-2">
            {{ feature.title }}
          </h3>
          <p class="text-sm text-muted-foreground mb-4">
            {{ feature.shortDescription }}
          </p>
          <div class="space-y-2">
            <div
              v-for="subFeature in feature.featuresList"
              :key="subFeature"
              class="flex items-center text-xs">
              <div class="w-1 h-1 bg-primary/60 rounded-full mr-2"></div>
              <span class="text-muted-foreground">{{ subFeature }}</span>
            </div>
          </div>

          <!-- Sliding Button -->
          <!-- <div
            class="absolute bottom-4 right-4 transform translate-x-full translate-y-full opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <UiButton size="sm"
              >Selengkapnya <Icon name="lucide:arrow-right"
            /></UiButton>
          </div> -->
        </div>
      </div>
    </div>
  </Motion>
</template>

<script lang="ts" setup>
const { data } = useFetch("/api/features/get-all", { key: "features" })
</script>
