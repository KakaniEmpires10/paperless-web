<script setup lang="ts">
import { cn } from "@/lib/utils";
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes } from "vue";
import { type InputVariants, inputVariants } from ".";

interface Props {
  defaultValue?: string | number;
  modelValue?: string | number;
  variant?: InputVariants["variant"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(inputVariants({ variant }), props.class)"
  />
</template>