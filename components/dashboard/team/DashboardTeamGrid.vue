<template>
  <div class="space-y-4">
    <!-- Loading State -->
    <div v-if="status === 'pending'" class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <UiCard 
        v-for="i in 8" 
        :key="`skeleton-${i}`" 
        class="p-6"
      >
        <div class="space-y-4">
          <!-- Avatar skeleton -->
          <div class="flex items-center space-x-4">
            <div class="h-12 w-12 rounded-full bg-muted animate-pulse"></div>
            <div class="space-y-2 flex-1">
              <div class="h-4 bg-muted rounded animate-pulse"></div>
              <div class="h-3 bg-muted rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
          <!-- Content skeleton -->
          <div class="space-y-2">
            <div class="h-3 bg-muted rounded animate-pulse"></div>
            <div class="h-3 bg-muted rounded w-5/6 animate-pulse"></div>
          </div>
          <!-- Button skeleton -->
          <div class="h-8 bg-muted rounded animate-pulse"></div>
        </div>
      </UiCard>
    </div>

    <!-- Error State -->
    <UiCard v-else-if="status === 'error'" class="p-6 text-center">
      <div class="space-y-4">
        <div class="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
          <svg 
            class="w-8 h-8 text-destructive" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-destructive">Gagal Mengambil Data Tim</h3>
          <p class="text-muted-foreground">
            {{ error?.message || 'Something went wrong while fetching team data.' }}
          </p>
        </div>
        <UiButton 
          @click="$emit('refresh')" 
          variant="outline" 
          class="mx-auto"
        >
          <svg 
            class="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Try Again
        </UiButton>
      </div>
    </UiCard>

    <!-- Success State with Data -->
    <div 
      v-else-if="status === 'success' && teams.length > 0" 
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <DashboardTeamCards
        v-for="team in teams"
        :key="team.id"
        :team="team"
        @refresh="$emit('refresh')"
        @openDialog="$emit('openDialog', team)"
      />
    </div>

    <!-- Success State but Empty Data -->
    <UiCard v-else-if="status === 'success' && teams.length === 0" class="p-8 text-center">
      <div class="space-y-4">
        <div class="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
          <svg 
            class="w-8 h-8 text-amber-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-muted-foreground">Anggota Tim Tidak Ditemukan</h3>
          <p class="text-sm text-muted-foreground">
            Ayo Mulai Menambah Anggota Tim Anda.
          </p>
        </div>
      </div>
    </UiCard>

    <!-- Idle State (initial state, rarely used) -->
    <UiCard v-else-if="status === 'idle'" class="p-6 text-center">
      <div class="space-y-4">
        <div class="mx-auto w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center">
          <svg 
            class="w-8 h-8 text-muted-foreground animate-pulse" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
            />
          </svg>
        </div>
        <p class="text-muted-foreground">Memuat Data Tim...</p>
      </div>
    </UiCard>

    <!-- Fallback for unknown status -->
    <UiCard v-else class="p-6 text-center">
      <div class="space-y-4">
        <div class="mx-auto w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center">
          <svg 
            class="w-8 h-8 text-muted-foreground" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div class="space-y-2">
          <p class="text-muted-foreground font-medium">Status Tidak Diketahui</p>
          <p class="text-sm text-muted-foreground">Status: {{ status }}</p>
        </div>
      </div>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
import type { AsyncDataRequestStatus } from '#app';
import type { Team } from './team.constant';

defineProps<{
  teams: Team[] | [];
  status: AsyncDataRequestStatus;
  error: Error | null;
}>()

defineEmits<{
  openDialog: [team?: Team];
  refresh: []
}>()
</script>