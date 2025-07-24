<template>
  <form class="space-y-6" @submit="onSubmit">
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-start">

      <UiFormField
        v-slot="{ componentField }"
        name="title"
        :validate-on-blur="!isFieldDirty">
        <UiFormItem class="col-span-3">
          <UiFormLabel>Nama Fitur</UiFormLabel>
          <UiFormControl>
            <UiInput
              type="text"
              placeholder="SOAP..."
              v-bind="componentField" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <UiFormField v-slot="{ componentField }" name="category">
        <UiFormItem class="col-span-2">
          <UiFormLabel>Kategori</UiFormLabel>
          <UiSelect v-bind="componentField">
            <UiFormControl class="w-full">
              <UiSelectTrigger>
                <UiSelectValue placeholder="Pilih Kategori Fitur..." />
              </UiSelectTrigger>
            </UiFormControl>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem v-for="option in featureOptions" :value="option">{{ option }}</UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <UiFormField v-slot="{ componentField }" name="icon">
        <UiFormItem class="col-span-1">
          <UiFormLabel>Icon</UiFormLabel>
          <UiSelect v-bind="componentField">
            <UiFormControl class="w-full">
              <UiSelectTrigger>
                <UiSelectValue placeholder="Pilih Icon...">
                  <template v-if="componentField.modelValue">
                    <Icon :name="componentField.modelValue" class="h-4 w-4" />
                  </template>
                </UiSelectValue>
              </UiSelectTrigger>
            </UiFormControl>
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem v-for="icon in featureIcons" :value="icon">
                  <Icon :name="icon" class="h-4 w-4 flex-shrink-0" />
                </UiSelectItem>
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
    </div>

    <UiFormField
      v-slot="{ componentField }"
      name="excerpt"
      :validate-on-blur="!isFieldDirty">
      <UiFormItem>
        <UiFormLabel>Ringkasan</UiFormLabel>
        <UiFormControl>
          <UiTextarea
            placeholder="Deskripsi Singkat Fitur..."
            class="resize-none"
            rows="2"
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
            placeholder="Deskripsi Lengkap Fitur..."
            class="resize-none"
            rows="5"
            v-bind="componentField" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>

    <div>
      <FieldArray v-slot="{ fields, push, remove }" name="featureList">
        <div v-for="(field, index) in fields" :key="field.key">
          <UiFormField
            v-slot="{ componentField }"
            :name="`featureList[${index}].value`">
            <UiFormItem class="mb-3">
              <UiFormLabel :class="cn(index !== 0 && 'sr-only')">
                List Detail Fitur
              </UiFormLabel>
              <div class="relative flex items-center gap-2">
                <UiFormControl>
                  <UiInput
                    type="text"
                    placeholder="Pendaftaran Umum & JKN/BPJS ..."
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
          Tambah List
        </UiButton>
      </FieldArray>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <UiFormField
        v-slot="{ handleChange, value }"
        type="checkbox"
        name="isFeatured">
        <UiFormItem
          class="flex flex-row items-center justify-between rounded-lg border border-primary p-4">
          <div class="space-y-0.5">
            <UiFormLabel class="text-base">Fitur Unggulan?</UiFormLabel>
            <UiFormDescription
              >Set Fitur Ini Sebagai Fitur Unggulan untuk menjadi highlight di
              halaman Fitur</UiFormDescription
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
              >Set opsi aktif agar fitur ini tampil di halaman
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
        {{ props.feature ? "Update Paket" : "Simpan Paket" }}
      </UiButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { FieldArray, useForm } from 'vee-validate';
import { featureIcons, featureOptions, featuresSchema } from './feature.constant';
import type { Feature } from '~/server/db/schema';
import { cn } from '~/lib/utils';
import { toast } from 'vue-sonner';

const props = defineProps<{ feature?: Feature }>();

const router = useRouter()

const initialList = formatArrayToObject(props.feature?.featuresList);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: featuresSchema,
  initialValues: {
    title: props.feature?.title ?? "",
    category: props.feature?.category ?? "",
    icon: props.feature?.icon ?? "",
    excerpt: props.feature?.shortDescription ?? "",
    description: props.feature?.longDescription ?? "",
    featureList: initialList,
    isFeatured: props.feature?.isFeatured ?? false,
    isActive: props.feature?.isActive ?? true
  }
});

// Submit
const onSubmit = handleSubmit(async values => {
  const dataToSubmit = {
    ...values,
    featureList: values.featureList.map(v => v.value)
  }

  let res

  try {

    if (!!props.feature) {
      res = await $fetch(`/api/features/${props.feature.id}`, {
        method: "PUT",
        body: dataToSubmit,
      });
    } else {
      res = await $fetch("/api/features", {
        method: "POST",
        body: dataToSubmit,
      });
    }

    toast.success(res.message);

    await refreshNuxtData("features");
    navigateTo("/dashboard/features");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }

    toast.error("Gagal mengupdate fitur", {
      description: "Terjadi kesalahan saat menyimpan fitur perusahaan.",
    });
  }
})
</script>