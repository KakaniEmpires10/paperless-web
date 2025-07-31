<template>
  <form class="space-y-6" @submit="onSubmit">
    <UiFormField
        v-slot="{ componentField }"
        name="order"
        :validate-on-blur="!isFieldDirty">
        <UiFormItem class="w-16">
          <UiFormLabel>Urutan</UiFormLabel>
          <UiFormControl>
            <UiInput
              type="number"
              placeholder="1..."
              v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
      <!-- Nama Paket -->
      <UiFormField
        v-slot="{ componentField }"
        name="name"
        :validate-on-blur="!isFieldDirty">
        <UiFormItem>
          <UiFormLabel>Nama Paket</UiFormLabel>
          <UiFormControl>
            <UiInput
              type="text"
              placeholder="Basic..."
              v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <!-- Tipe Paket -->
      <UiFormField v-slot="{ componentField }" name="type">
        <UiFormItem>
          <UiFormLabel>Tipe</UiFormLabel>
          <UiSelect v-bind="componentField">
            <UiFormControl class="w-full">
              <UiSelectTrigger>
                <UiSelectValue placeholder="Pilih Tipe Paket..." />
              </UiSelectTrigger>
            </UiFormControl>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem value="rs">Rumah Sakit</UiSelectItem>
                <UiSelectItem value="klinik">Klinik</UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <!-- Harga -->
      <UiFormField
        v-slot="{ componentField }"
        name="price"
        :validate-on-blur="!isFieldDirty">
        <UiFormItem>
          <UiFormLabel>Harga</UiFormLabel>
          <UiFormControl>
            <UiInput
              type="text"
              v-model="displayPrice"
              @input="displayPrice = formatCurrency(displayPrice)"
              placeholder="240.000" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
    </div>

    <!-- Deskripsi -->
    <UiFormField
        v-slot="{ componentField }"
        name="excerpt"
        :validate-on-blur="!isFieldDirty">
        <UiFormItem>
          <UiFormLabel>Deskripsi Singkat</UiFormLabel>
          <UiFormDescription>Penjelasan singkat untuk dilihat user dalam card pricing di landing page</UiFormDescription>
          <UiFormControl>
            <UiInput
              type="text"
              placeholder="Deskripsi singkat Paket..."
              v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

    <UiFormField
      v-slot="{ componentField }"
      name="description"
      :validate-on-blur="!isFieldDirty">
      <UiFormItem>
        <UiFormLabel>Deskripsi</UiFormLabel>
        <UiFormControl>
          <UiTextarea
            placeholder="Deskripsi lengkap Paket..."
            class="resize-none"
            rows="4"
            v-bind="componentField" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>

    <!-- Daftar Fitur -->
    <div>
      <FieldArray v-slot="{ fields, push, remove }" name="features">
        <div v-for="(field, index) in fields" :key="field.key">
          <UiFormField
            v-slot="{ componentField }"
            :name="`features[${index}].value`">
            <UiFormItem class="mb-3">
              <UiFormLabel :class="cn(index !== 0 && 'sr-only')">
                List Fitur
              </UiFormLabel>
              <div class="relative flex items-center gap-2">
                <UiFormControl>
                  <UiInput
                    type="text"
                    placeholder="Costumer Service 24/7 ..."
                    v-bind="componentField" />
                </UiFormControl>
                <UiButton
                  v-if="index !== 0"
                  size="sm"
                  variant="destructive"
                  @click="remove(index)">
                  <Icon name="material-symbols:delete" />
                </UiButton>
              </div>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </div>

        <UiButton
          type="button"
          size="sm"
          class="mt-2"
          @click="push({ value: '' })">
          <Icon name="material-symbols:add-circle" class="text-base" />
          Tambah Fitur
        </UiButton>
      </FieldArray>
    </div>

    <!-- Checkbox -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UiFormField
        v-slot="{ handleChange, value }"
        type="checkbox"
        name="isPopular">
        <UiFormItem
          class="flex flex-row items-center justify-between rounded-lg border border-primary p-4">
          <div class="space-y-0.5">
            <UiFormLabel class="text-base">Pilihan Populer?</UiFormLabel>
            <UiFormDescription
              >Set Paket Ini Sebagai Paket Populer untuk menjadi highlight di
              halaman paket</UiFormDescription
            >
          </div>
          <UiFormControl>
            <UiSwitch :model-value="value" @update:model-value="handleChange" />
          </UiFormControl>
        </UiFormItem>
      </UiFormField>

      <UiFormField
        v-slot="{ handleChange, value }"
        type="checkbox"
        name="isActive">
        <UiFormItem
          class="flex flex-row items-center justify-between rounded-lg border border-primary p-4">
          <div class="space-y-0.5">
            <UiFormLabel class="text-base"> Aktif? </UiFormLabel>
            <UiFormDescription
              >Set opsi aktif agar menu ini tampil di halaman
              paket</UiFormDescription
            >
          </div>
          <UiFormControl>
            <UiSwitch :model-value="value" @update:model-value="handleChange" />
          </UiFormControl>
        </UiFormItem>
      </UiFormField>
    </div>

    <!-- Submit -->
    <div class="flex justify-end gap-2 pt-6">
      <UiButton type="button" @click="router.back()" variant="outline">Kembali</UiButton>
      <UiButton type="submit">
        <Icon name="flowbite:floppy-disk-solid" class="text-lg" />
        {{ props.pricing ? "Update Paket" : "Simpan Paket" }}
      </UiButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { FieldArray, useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { pricingSchema } from "~/components/dashboard/price/price.constant";
import { cn } from "~/lib/utils";
import type { PricingPlan } from "~/server/db/schema";

const props = defineProps<{ pricing?: PricingPlan }>();

const router = useRouter()

// Format harga
function formatCurrency(value: string | number) {
  const raw = typeof value === "string" ? value.replace(/\D/g, "") : value;
  const number = parseInt(raw as string);
  return isNaN(number) ? "" : number.toLocaleString("id-ID");
}

const initialFeatures = formatArrayToObject(props.pricing?.features);

const initialValues = {
  name: props.pricing?.name ?? "",
  type: props.pricing?.type ?? "",
  price: parseFloat(props.pricing?.price!) ?? "",
  excerpt: props.pricing?.excerpt ?? "",
  description: props.pricing?.description ?? "",
  features: initialFeatures,
  isPopular: props.pricing?.isPopular ?? false,
  isActive: props.pricing?.isActive ?? true,
  order: props.pricing?.order ?? 0
};

// Form setup
const { isFieldDirty, handleSubmit, setFieldValue } = useForm({
  validationSchema: pricingSchema,
  initialValues,
});

// Harga display
const displayPrice = ref(formatCurrency(initialValues.price));

// Watch display input
watch(displayPrice, newVal => {
  const raw = newVal.replace(/\D/g, "");
  const parsed = parseFloat(raw);

  // Jangan set jika input kosong
  if (raw === "") {
    setFieldValue("price", 0);
    return;
  }

  if (!isNaN(parsed)) {
    setFieldValue("price", parsed);
  }
});

// Submit
const onSubmit = handleSubmit(async values => {
  const dataToSubmit = {
    ...values,
    features: values.features?.map(f => f.value),
  };

  let res

  try {

    if (!!props.pricing) {
      res = await $fetch(`/api/price/${props.pricing.id}`, {
        method: "PUT",
        body: dataToSubmit,
      });
    } else {
      res = await $fetch("/api/price", {
        method: "POST",
        body: dataToSubmit,
      });
    }

    toast.success(res.message);

    await refreshNuxtData("price");
    navigateTo("/dashboard/prices");
  } catch (error) {
    toast.error(extractErrorMessage(error));
  }
});
</script>
