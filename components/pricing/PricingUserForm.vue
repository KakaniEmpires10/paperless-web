<template>
  <form class="py-10 px-10 lg:px-16 space-y-6" @submit="onSubmit">
    <div class="space-y-6">
      <UiFormField
        v-slot="{ componentField }"
        name="name"
        :validate-on-blur="!isFieldDirty">
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.1 }">
          <UiFormItem>
            <UiFormLabel>Nama Lengkap</UiFormLabel>
            <UiFormControl>
              <Motion :whileFocus="{ scale: 1.02 }">
                <UiInput
                  variant="underline"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda..."
                  v-bind="componentField"
                  class="transition-all duration-300" />
              </Motion>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </Motion>
      </UiFormField>

      <UiFormField
        v-slot="{ componentField }"
        name="instanceName"
        :validate-on-blur="!isFieldDirty">
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.2 }">
          <UiFormItem>
            <UiFormLabel>Nama Instansi</UiFormLabel>
            <UiFormControl>
              <Motion :whileFocus="{ scale: 1.02 }">
                <UiInput
                  variant="underline"
                  type="text"
                  placeholder="Nama instansi/rumah sakit..."
                  v-bind="componentField"
                  class="transition-all duration-300" />
              </Motion>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </Motion>
      </UiFormField>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <UiFormField
          v-slot="{ componentField }"
          name="email"
          :validate-on-blur="!isFieldDirty">
          <Motion
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.3 }">
            <UiFormItem>
              <UiFormLabel>Email</UiFormLabel>
              <UiFormControl>
                <Motion :whileFocus="{ scale: 1.02 }">
                  <UiInput
                    variant="underline"
                    type="email"
                    placeholder="email@domain.com"
                    v-bind="componentField"
                    class="transition-all duration-300" />
                </Motion>
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </Motion>
        </UiFormField>

        <UiFormField
          v-slot="{ componentField }"
          name="phone"
          :validate-on-blur="!isFieldDirty">
          <Motion
            :initial="{ opacity: 0, y: 30 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.4 }">
            <UiFormItem>
              <UiFormLabel>Nomor Telepon</UiFormLabel>
              <UiFormControl>
                <Motion :whileFocus="{ scale: 1.02 }">
                  <UiInput
                    variant="underline"
                    type="tel"
                    placeholder="+62 812-3456-7890"
                    v-bind="componentField"
                    class="transition-all duration-300" />
                </Motion>
              </UiFormControl>
              <UiFormMessage />
            </UiFormItem>
          </Motion>
        </UiFormField>
      </div>

      <UiFormField
        v-slot="{ componentField }"
        name="address"
        :validate-on-blur="!isFieldDirty">
        <Motion
          :initial="{ opacity: 0, y: 30 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, delay: 0.5 }">
          <UiFormItem>
            <UiFormLabel>Alamat Lengkap</UiFormLabel>
            <UiFormControl>
              <Motion :whileFocus="{ scale: 1.02 }">
                <UiTextarea
                  class="min-h-24 transition-all duration-300"
                  variant="underline"
                  placeholder="Masukkan alamat lengkap..."
                  v-bind="componentField" />
              </Motion>
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </Motion>
      </UiFormField>
    </div>

    <Motion
      :initial="{ opacity: 0, y: 30 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, delay: 0.6 }"
      :whileHover="{ scale: 1.05 }"
      :whileTap="{ scale: 0.95 }">
      <UiButton
        :disabled="loading"
        :aria-disabled="loading"
        class="w-full transition-all duration-300 hover:shadow-lg group">
        {{ loading ? "Mengirim..." : "Kirim Permintaan" }}
        <Loader2 v-if="loading" class="size-3.5 animate-spin" />
        <Send v-else class="size-3.5" />
      </UiButton>
    </Motion>
  </form>
  <SuccessDialog
    :isOpen="showSuccessDialog"
    content="pricing"
    v-model:open="showSuccessDialog"
    @closed="onDialogClosed" />
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import {
  Loader2,
  Send,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  CheckCircle,
  Sparkles,
} from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import * as z from "zod";

const props = defineProps<{ id: string }>();

const loading = ref(false);
const showSuccessDialog = ref(false);

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({ required_error: "Nama Wajib Diisi" })
      .max(50, { message: "Nama Tidak Boleh Lebih dari 50 karakter" }),
    email: z
      .string({ required_error: "Email Wajib Diisi" })
      .email({ message: "Email Tidak Valid" }),
    phone: z
      .string({ required_error: "No Telephone Wajib Diisi" })
      .min(8, { message: "Nomor Telepon Wajib Diisi dan minimal 8 digit" })
      .max(15, { message: "Nomor Telepon Tidak Boleh Lebih dari 15 digit" })
      .regex(/^\+?\d{8,15}$/, { message: "Nomor Telepon Tidak Valid" }),
    instanceName: z
      .string({ required_error: "Nama Instansi Wajib Diisi" })
      .min(1, "Nama Instansi Wajib Diisi"),
    address: z
      .string({ required_error: "Alamat Wajib Diisi" })
      .min(1, { message: "Alamat Wajib Diisi" }),
  })
);

const { isFieldDirty, handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async values => {
  loading.value = true;

  const dataToSubmit = { ...values, pricingPlanId: props.id };

  try {
    const res = await $fetch("/api/price/demand", {
      method: "POST",
      body: dataToSubmit,
    });

    if (res.success) {
      showSuccessDialog.value = true;
      resetForm();
    }
  } catch (error) {
    toast.error(extractErrorMessage(error));
  } finally {
    loading.value = false;
  }
});

const onDialogClosed = async () => {
  await navigateTo("/");

  // Optional: Track analytics
  // gtag('event', 'contact_form_submitted', {
  //   event_category: 'engagement',
  //   event_label: 'contact_form'
  // })
};
</script>
