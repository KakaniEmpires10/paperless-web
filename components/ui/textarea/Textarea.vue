<script setup lang="ts">
import { cn } from "@/lib/utils";
import { useVModel } from '@vueuse/core'
import type { HTMLAttributes } from "vue";
import { type TextareaVariants, textareaVariants } from ".";

interface Props {
  defaultValue?: string;
  modelValue?: string;
  variant?: TextareaVariants["variant"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
});

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string): void
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>

<template>
  <textarea
    v-model="modelValue"
    v-autosize
    data-slot="textarea"
    :class="cn(textareaVariants({ variant }), props.class)"
  />
</template>
