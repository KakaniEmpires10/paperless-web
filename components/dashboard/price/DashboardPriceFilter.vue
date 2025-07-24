<template>
  <UiCard class="p-4 flex-row justify-between items-center">
    <div class="flex gap-4 items-end">
      <!-- Search -->
      <div class="relative">
        <UiInput
          ref="inputRef"
          class="peer ps-9"
          placeholder="Cari Paket..."
          v-model="filters.search" />
        <div
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon name="material-symbols:search" />
        </div>
        <button
          v-if="filters.search"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive cursor-pointer"
          @click="handleClearInput">
          <Icon name="mdi:close-octagon-outline" />
        </button>
      </div>

      <!-- Package Type Filter -->
      <UiSelect id="type_filter" v-model="typeString">
        <UiSelectTrigger
          class="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-[200px]">
          <UiSelectValue placeholder="Pilih tipe">
            <Icon 
              :name="typeString === 'rs' ? 'lucide:building-2' : typeString === 'klinik' ? 'lucide:stethoscope' : 'lucide:package'"
              :class="cn(
                typeString === 'rs' ? 'text-blue-500' : 
                typeString === 'klinik' ? 'text-amber-500' : 
                'text-muted-foreground'
              )"
              class="w-4 h-4"
            />
            <span>
              {{
                typeString === "rs"
                  ? "Rumah Sakit"
                  : typeString === "klinik"
                    ? "Klinik"
                    : "Semua Tipe"
              }}
            </span>
          </UiSelectValue>
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="all">
            <span class="flex items-center gap-2">
              <Icon name="lucide:package" class="w-4 h-4 text-muted-foreground" />
              <span class="truncate">Semua Tipe</span>
            </span>
          </UiSelectItem>
          <UiSelectItem value="rs">
            <span class="flex items-center gap-2">
              <Icon name="lucide:building-2" class="w-4 h-4 text-blue-500" />
              <span class="truncate">Rumah Sakit</span>
            </span>
          </UiSelectItem>
          <UiSelectItem value="klinik">
            <span class="flex items-center gap-2">
              <Icon name="lucide:stethoscope" class="w-4 h-4 text-amber-500" />
              <span class="truncate">Klinik</span>
            </span>
          </UiSelectItem>
        </UiSelectContent>
      </UiSelect>

      <!-- Status Filter (Active/Inactive) -->
      <UiSelect id="status_filter" v-model="statusString">
        <UiSelectTrigger
          class="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-[200px]">
          <UiSelectValue placeholder="Pilih status">
            <svg
              width="8"
              height="8"
              fill="currentColor"
              viewBox="0 0 8 8"
              xmlns="http://www.w3.org/2000/svg"
              :class="cn(
                statusString === 'true' ? 'text-emerald-500' : 
                statusString === 'false' ? 'text-red-500' : 
                'text-muted-foreground'
              )"
              aria-hidden="true">
              <circle cx="4" cy="4" r="4" />
            </svg>
            <span>
              {{
                statusString === "true"
                  ? "Aktif"
                  : statusString === "false"
                    ? "Nonaktif"
                    : "Semua Status"
              }}
            </span>
          </UiSelectValue>
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="all">
            <span class="flex items-center gap-2">
              <svg
                width="8"
                height="8"
                fill="currentColor"
                viewBox="0 0 8 8"
                xmlns="http://www.w3.org/2000/svg"
                class="text-muted-foreground"
                aria-hidden="true">
                <circle cx="4" cy="4" r="4" />
              </svg>
              <span class="truncate">Semua Status</span>
            </span>
          </UiSelectItem>
          <UiSelectItem value="true">
            <span class="flex items-center gap-2">
              <svg
                width="8"
                height="8"
                fill="currentColor"
                viewBox="0 0 8 8"
                xmlns="http://www.w3.org/2000/svg"
                class="text-emerald-500"
                aria-hidden="true">
                <circle cx="4" cy="4" r="4" />
              </svg>
              <span class="truncate">Aktif</span>
            </span>
          </UiSelectItem>
          <UiSelectItem value="false">
            <span class="flex items-center gap-2">
              <svg
                width="8"
                height="8"
                fill="currentColor"
                viewBox="0 0 8 8"
                xmlns="http://www.w3.org/2000/svg"
                class="text-red-500"
                aria-hidden="true">
                <circle cx="4" cy="4" r="4" />
              </svg>
              <span class="truncate">Nonaktif</span>
            </span>
          </UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 justify-end">
      <UiButton variant="outline" @click="$emit('resetFilters')">
        <Icon name="material-symbols-light:filter-alt-off" class="text-base" />
        Reset
      </UiButton>
      <UiButton class="w-full" as-child>
        <NuxtLink to="/dashboard/prices/add">
          <Icon name="material-symbols:add" class="text-base" />
          Tambah Paket
        </NuxtLink>
      </UiButton>
    </div>
  </UiCard>
</template>

<script lang="ts" setup>
import { cn } from "~/lib/utils";
import { type PriceFilters } from "./price.constant";

const props = defineProps<{
  filters: PriceFilters;
}>();

defineEmits<{
  resetFilters: () => void;
}>();

const inputRef = useTemplateRef("inputRef");

// Handle package type filter (rs/klinik)
const typeString = computed({
  get() {
    if (props.filters.type === 'rs') return "rs";
    if (props.filters.type === 'klinik') return "klinik";
    return "all";
  },
  set(val: string) {
    if (val === "rs") props.filters.type = 'rs';
    else if (val === "klinik") props.filters.type = 'klinik';
    else props.filters.type = null;
  },
});

// Handle status filter (active/inactive)
const statusString = computed({
  get() {
    if (props.filters.status === true) return "true";
    if (props.filters.status === false) return "false";
    return "all";
  },
  set(val: string) {
    if (val === "true") props.filters.status = true;
    else if (val === "false") props.filters.status = false;
    else props.filters.status = null;
  },
});

const handleClearInput = () => {
  props.filters.search = "";
  if (inputRef.value) {
    inputRef.value.$el.focus();
  }
};
</script>