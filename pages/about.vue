<template>
  <section id="about" class="min-h-screen bg-background">
    <!-- Hero Section -->
    <AboutHero />

    <!-- Mission & Vision Cards -->
    <AboutVision />

    <!-- Technology Section -->
    <AboutTech />

    <!-- Impact Section -->
    <AboutImpact />

    <!-- Team Section with Carousel -->
    <!-- <AboutTeam /> -->

    <!-- Final CTA Section -->
    <HomeCTA />
  </section>
</template>

<script lang="ts" setup>
useHead({
  title: "Tentang Kami",
  meta: [
    { name: "description", content: "Kenali visi, misi, dan tim ahli kami yang memimpin revolusi digital layanan kesehatan Indonesia melalui integrasi teknologi AI di rumah sakit" }
  ]
})
</script>
