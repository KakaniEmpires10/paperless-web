<script setup lang="ts">
import { useObjectUrl } from "@vueuse/core";
import { LucideImagePlus } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { clientSchema, getInitialValues, type Client } from "./client.constant";
import type { PricingPlan } from "~/server/db/schema";

const props = defineProps<{
  isOpen: boolean;
  client: Client | null;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  close: [];
  refresh: [];
}>();

const cardHeader = computed(() => {
  return {
    title: !!props.client ? "Edit Klien" : "Tambah Klien",
    description: !!props.client
      ? "Lakukan perubahan pada klien di sini. Anda dapat mengganti logo dan mengatur identitas klien"
      : "Tambah klien di sini. Anda dapat menambah logo dan mengatur identitas klien",
  };
});

type PriceList = Pick<PricingPlan, "id" | "name" | "type">;

const { data: priceList, pending } = await useLazyFetch<PriceList[]>(
  "/api/price",
  {
    transform: (data: any[]) =>
      data.map(({ id, name, type }) => ({
        id,
        name,
        type,
      })),
  }
);

const cardBtn = computed(() => {
  return {
    icon: !!props.client
      ? "mingcute:pencil-2-line"
      : "flowbite:floppy-disk-solid",
    saveBtnText: !!props.client ? "Update" : "Simpan",
  };
});

const initialValues = computed(() => getInitialValues(props.client));

// Avatar upload functionality
const avatarFileInputRef = useTemplateRef("avatarFileInputRef");
const avatarFile = ref<File | null>(null);
const avatarPreviewUrl = useObjectUrl(avatarFile);

const handleAvatarFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  avatarFile.value = target.files?.[0] || null;
};

const handleAvatarThumbnailClick = () => {
  avatarFileInputRef.value?.click();
};

const onSubmit = async (values: any) => {
  let res;

  try {
    if (!!props.client) {
      res = await $fetch(`/api/clients/${props.client.id}`, {
        method: "PUT",
        body: {
          ...values,
        },
      });
    } else {
      res = await $fetch("/api/clients", {
        method: "POST",
        body: {
          ...values,
        },
      });
    }

    if (res?.message) {
      emit("refresh");
      toast.success(res?.message);
      emit("close");
    }
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Terjadi kesalahan saat menyimpan tim"
    );
  }
};
</script>

<template>
  <UiForm
    v-slot="{ handleSubmit }"
    :initial-values="initialValues"
    :key="props.client?.id || 'new'"
    as=""
    keep-values
    :validation-schema="clientSchema">
    <UiDialog :open="props.isOpen" @update:open="emit('update:open', $event)">
      <UiDialogContent
        class="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
        <UiDialogHeader class="text-left border-b px-6 py-4">
          <UiDialogTitle class="text-base">
            {{ cardHeader.title }}
          </UiDialogTitle>
          <UiDialogDescription>
            {{ cardHeader.description }}
          </UiDialogDescription>
        </UiDialogHeader>
        <div class="overflow-y-auto">
          <!-- Avatar -->
          <div class="mt-6 flex justify-center">
            <div
              class="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
              <NuxtImg
                v-if="avatarPreviewUrl || '/placeholder_profile.png'"
                :src="avatarPreviewUrl || '/placeholder_profile.png'"
                class="h-full w-full object-cover"
                width="80"
                height="80"
                alt="Profile image" />
              <button
                type="button"
                class="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                @click="handleAvatarThumbnailClick"
                aria-label="Change profile picture">
                <LucideImagePlus class="size-4" aria-hidden="true" />
              </button>
              <input
                type="file"
                ref="avatarFileInputRef"
                @change="handleAvatarFileChange"
                class="hidden"
                accept="image/*"
                aria-label="Upload profile picture" />
            </div>
          </div>

          <div class="px-6 pt-4 pb-6">
            <form
              class="space-y-4"
              id="dialogclientForm"
              @submit="handleSubmit($event, onSubmit)">
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <UiFormField v-slot="{ componentField }" name="name">
                  <UiFormItem>
                    <UiFormLabel>Nama</UiFormLabel>
                    <UiFormControl>
                      <UiInput placeholder="RSUD..." v-bind="componentField" />
                    </UiFormControl>
                    <UiFormMessage />
                  </UiFormItem>
                </UiFormField>
                <UiFormField v-slot="{ componentField }" name="pricingPlanId">
                  <UiFormItem>
                    <UiFormLabel>Paket</UiFormLabel>

                    <!-- Loading State -->
                    <template v-if="pending">
                      <UiSkeleton class="h-10 w-full rounded-md" />
                      <UiFormDescription class="text-xs text-muted-foreground">
                        Loading paket data...
                      </UiFormDescription>
                    </template>

                    <!-- Error State (if you want to add error handling) -->
                    <template v-else-if="!priceList">
                      <div class="rounded-md border px-4 py-3">
                        <p class="text-sm flex items-center gap-2">
                          <Icon
                            name="lucide:circle-alert"
                            class="text-red-500"
                            size="16" />
                          Terjadi Error Dalam Pengambilan Data Paket. Coba lagi
                          dalam beberapa saat 🙏
                        </p>
                      </div>
                    </template>

                    <!-- Empty State -->
                    <template v-else-if="priceList.length === 0">
                      <div class="rounded-lg border px-4 py-2.5">
                        <p class="text-xs">
                          <Icon
                            name="lucide:triangle-alert"
                            class="me-3 -mt-0.5 inline-flex text-amber-500"
                            size="16" />
                          Paket Tidak Tersedia, Harap
                          <strong>Buat Paket</strong> Terlebih Dahulu
                        </p>
                      </div>
                    </template>

                    <!-- Normal State with Data -->
                    <template v-else>
                      <UiSelect v-bind="componentField" name="pricingPlanId">
                        <UiFormControl>
                          <UiSelectTrigger class="w-full">
                            <UiSelectValue placeholder="Pilih Paket" />
                          </UiSelectTrigger>
                        </UiFormControl>
                        <UiSelectContent>
                          <!-- Group Rumah Sakit -->
                          <UiSelectGroup
                            v-if="priceList.some(p => p.type === 'rs')">
                            <UiSelectLabel>Rumah Sakit</UiSelectLabel>
                            <UiSelectItem
                              v-for="item in priceList.filter(
                                p => p.type === 'rs'
                              )"
                              :key="item.id"
                              :value="item.id">
                              {{ item.name }}
                            </UiSelectItem>
                          </UiSelectGroup>

                          <!-- Group Klinik -->
                          <UiSelectGroup
                            v-if="priceList.some(p => p.type === 'klinik')">
                            <UiSelectLabel>Klinik</UiSelectLabel>
                            <UiSelectItem
                              v-for="item in priceList.filter(
                                p => p.type === 'klinik'
                              )"
                              :key="item.id"
                              :value="item.id">
                              {{ item.name }}
                            </UiSelectItem>
                          </UiSelectGroup>
                        </UiSelectContent>
                      </UiSelect>
                    </template>
                    <UiFormMessage />
                  </UiFormItem>
                </UiFormField>
              </div>

              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <UiFormField v-slot="{ componentField }" name="email">
                  <UiFormItem>
                    <UiFormLabel>Email</UiFormLabel>
                    <UiFormControl>
                      <UiInput
                        type="email"
                        placeholder="client@email.com"
                        v-bind="componentField" />
                    </UiFormControl>
                    <UiFormMessage />
                  </UiFormItem>
                </UiFormField>

                <UiFormField v-slot="{ componentField }" name="phone">
                  <UiFormItem>
                    <UiFormLabel>Nomor Telepon</UiFormLabel>
                    <UiFormControl>
                      <UiInput
                        placeholder="+62..."
                        type="tel"
                        v-bind="componentField" />
                    </UiFormControl>
                    <UiFormMessage />
                  </UiFormItem>
                </UiFormField>
              </div>

              <UiFormField v-slot="{ componentField }" name="address">
                <UiFormItem>
                  <UiFormLabel>Alamat</UiFormLabel>
                  <UiFormControl>
                    <UiTextarea
                      placeholder="Tulis Alamat Klien"
                      v-bind="componentField"
                      aria-describedby="bio-description" />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField
                v-slot="{ handleChange, value }"
                type="checkbox"
                name="isActive">
                <UiFormItem
                  class="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div class="space-y-0.5">
                    <UiFormLabel class="text-base"> Masih Aktif? </UiFormLabel>
                    <UiFormDescription>
                      Centang jika klien masih aktif kontrak
                    </UiFormDescription>
                  </div>
                  <UiFormControl>
                    <UiSwitch
                      :model-value="value"
                      @update:model-value="handleChange" />
                  </UiFormControl>
                </UiFormItem>
              </UiFormField>
            </form>
          </div>
        </div>
        <UiDialogFooter class="border-t px-6 py-4">
          <UiDialogClose asChild>
            <UiButton type="button" variant="outline">Cancel</UiButton>
          </UiDialogClose>
          <UiButton type="submit" form="dialogclientForm"
            ><Icon :name="cardBtn.icon" class="text-lg" />
            {{ cardBtn.saveBtnText }}</UiButton
          >
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </UiForm>
</template>
