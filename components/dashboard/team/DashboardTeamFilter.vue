<template>
  <UiCard class="p-4 flex-row justify-between">
    <div class="flex gap-4 items-end">
      <!-- Search -->
      <div class="relative">
        <UiInput
          ref="inputRef"
          class="peer ps-9"
          placeholder="Cari Nama..."
          v-model="filters.search" />
        <div
          class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Icon name="material-symbols:group-search" />
        </div>
        <button
          v-if="filters.search"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-destructive cursor-pointer"
          @click="handleClearInput">
          <Icon name="mdi:close-octagon-outline" />
        </button>
      </div>

      <!-- Status -->
      <UiSelect id="status_filter" v-model="statusString">
        <UiSelectTrigger
          class="[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 w-[150px]">
          <UiSelectValue placeholder="Pilih status">
            <svg
              width="8"
              height="8"
              fill="currentColor"
              viewBox="0 0 8 8"
              xmlns="http://www.w3.org/2000/svg"
              :class="
                cn(
                  statusString === 'true'
                    ? 'text-green-500'
                    : statusString === 'false'
                      ? 'text-red-500'
                      : 'text-muted'
                )
              "
              aria-hidden="true">
              <circle cx="4" cy="4" r="4" />
            </svg>
            <span>
              {{
                statusString === "true"
                  ? "Active"
                  : statusString === "false"
                    ? "Non-Active"
                    : "All"
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
                class="text-muted"
                aria-hidden="true">
                <circle cx="4" cy="4" r="4" />
              </svg>
              <span class="truncate">All</span>
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
                class="text-green-500"
                aria-hidden="true">
                <circle cx="4" cy="4" r="4" />
              </svg>
              <span class="truncate">Active</span>
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
              <span class="truncate">Non-Active</span>
            </span>
          </UiSelectItem>
        </UiSelectContent>
      </UiSelect>

      <!-- Role -->
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiButton variant="outline" class="border-dashed h-8.5">
            <Icon name="material-symbols:add-circle-outline" class="text-sm" />
            Role
            <template v-if="selectedValues.size > 0">
              <UiSeparator orientation="vertical" class="mx-2 h-4" />
              <UiBadge variant="soft" class="lg:hidden">
                {{ selectedValues.size }}
              </UiBadge>
              <div class="hidden space-x-1 lg:flex">
                <UiBadge v-if="selectedValues.size > 2" variant="soft">
                  {{ selectedValues.size }} selected
                </UiBadge>

                <template v-else>
                  <UiBadge
                    v-for="option in roleOptions.filter(opt =>
                      selectedValues.has(opt.value)
                    )"
                    :key="option.value"
                    variant="soft">
                    {{ option.label }}
                  </UiBadge>
                </template>
              </div>
            </template>
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent class="w-[200px] p-0" align="start">
          <UiCommand>
            <UiCommandInput placeholder="Filter roles..." />
            <UiCommandList>
              <UiCommandEmpty>No roles found.</UiCommandEmpty>
              <UiCommandGroup>
                <UiCommandItem
                  v-for="option in roleOptions"
                  :key="option.value"
                  :value="option.value"
                  @select="toggleRole(option.value)">
                  <div
                    :class="
                      cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        selectedValues.has(option.value)
                          ? 'bg-primary text-primary-foreground stroke-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )
                    ">
                    <CheckIcon class="h-3 w-3 text-inherit" />
                  </div>
                  <span>{{ option.label }}</span>
                </UiCommandItem>
              </UiCommandGroup>

              <template v-if="selectedValues.size > 0">
                <UiCommandSeparator />
                <UiCommandGroup>
                  <UiCommandItem
                    value="__clear__"
                    class="justify-center text-center cursor-pointer"
                    @select="filters.role = []">
                    <Icon
                      name="material-symbols-light:filter-alt-off"
                      class="text-base" />
                    Clear filters
                  </UiCommandItem>
                </UiCommandGroup>
              </template>
            </UiCommandList>
          </UiCommand>
        </UiPopoverContent>
      </UiPopover>
    </div>

    <!-- Actions -->
    <div class="flex gap-2 justify-end mt-2">
      <UiButton variant="outline" @click="$emit('resetFilters')"
        ><Icon name="material-symbols-light:filter-alt-off" class="text-base" />
        Reset</UiButton
      >
      <UiButton @click="$emit('openDialog')" class="w-full"
        ><Icon name="material-symbols:person-add-rounded" class="text-base" />
        Tambah Tim</UiButton
      >
    </div>
  </UiCard>
</template>

<script lang="ts" setup>
import { CheckIcon } from "lucide-vue-next";
import { cn } from "~/lib/utils";
import { roleOptions, type Team, type TeamFilters } from "./team.constant";

const props = defineProps<{
  filters: TeamFilters
}>();

defineEmits<{
  openDialog: (team?: Team) => void;
  resetFilters: () => void;
}>()

const inputRef = useTemplateRef("inputRef");

// Computed property to handle string <-> boolean/null conversion for status
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

const selectedValues = computed(() => new Set(props.filters.role));

function toggleRole(role: string) {
  const current = new Set(props.filters.role);
  if (current.has(role)) {
    current.delete(role);
  } else {
    current.add(role);
  }
  props.filters.role = Array.from(current);
}
</script>
