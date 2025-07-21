<template>
  <UiAlertDialog v-model:open="store.isOpen">
    <UiAlertDialogContent>
      <UiAlertDialogHeader class="items-center">
        <UiAlertDialogTitle>
          <div
            class="mb-2 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <OctagonAlert class="h-7 w-7 text-destructive" />
          </div>
          {{ store.title }}
        </UiAlertDialogTitle>
        <UiAlertDialogDescription class="text-[15px] text-center">
          {{ store.description }}
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>

      <UiAlertDialogFooter class="mt-2 sm:justify-center">
        <UiAlertDialogCancel> Cancel </UiAlertDialogCancel>
        <UiAlertDialogAction
          @click="store.confirmDelete"
          :disabled="store.loading"
          :class="buttonVariants({ variant: 'destructive' })">
          <Loader2 v-if="store.loading" class="animate-spin" />
          <Trash2 v-else />
          {{ store.loading ? "Menghapus..." : "Hapus" }}
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>

<script lang="ts" setup>
import { OctagonAlert, Trash2, Loader2 } from "lucide-vue-next";
import { buttonVariants } from "./ui/button";

const store = useDeleteDialogStore();
</script>
