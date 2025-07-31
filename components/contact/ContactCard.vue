<template>
  <Motion
    :initial="{ opacity: 0, y: 30 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }">
    <UiCard class="max-w-5xl mx-auto p-0">
      <UiCardContent class="grid lg:grid-cols-[1fr_2fr] gap-4 p-1">
        <!-- Contact Info Section -->
        <Motion
          :initial="{ opacity: 0, x: -50 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }">
          <UiCard
            class="h-full flex justify-center bg-gradient-to-br from-sky-500 to-sky-600 text-white p-8 border-0 relative shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div class="z-10">
              <Motion
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ duration: 0.8, delay: 0.3 }">
                <h3 class="text-2xl font-bold mb-2">Informasi Kontak</h3>
              </Motion>

              <Motion
                :initial="{ opacity: 0 }"
                :animate="{ opacity: 1 }"
                :transition="{ duration: 0.8, delay: 0.5 }">
                <p class="text-sky-100 mb-8">
                  Kami siap membantu digitalisasi layanan kesehatan Anda dengan
                  tim profesional dan teknologi terpercaya.
                </p>
              </Motion>

              <div class="space-y-6">
                <!-- Phone -->
                <Motion
                  :initial="{ opacity: 0, x: 50 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.8, delay: 0.7 }"
                  class="flex items-center space-x-4 group cursor-pointer">
                  <Motion
                    :whileHover="{
                      scale: 1.1,
                      backgroundColor: 'rgba(255,255,255,0.3)',
                    }"
                    class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0">
                    <Motion
                      :whileHover="{
                        y: [-2, 0, -2],
                        transition: { repeat: Infinity, duration: 1 },
                      }">
                      <Phone class="size-4" />
                    </Motion>
                  </Motion>
                  <div>
                    <p class="font-medium">{{ setting?.phoneNumber }}</p>
                  </div>
                </Motion>

                <!-- Email -->
                <Motion
                  :initial="{ opacity: 0, x: 50 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.8, delay: 0.9 }"
                  class="flex items-center space-x-4 group cursor-pointer">
                  <Motion
                    :whileHover="{
                      scale: 1.1,
                      backgroundColor: 'rgba(255,255,255,0.3)',
                    }"
                    class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0">
                    <Motion
                      :whileHover="{
                        y: [-2, 0, -2],
                        transition: { repeat: Infinity, duration: 1 },
                      }">
                      <Mail class="size-4" />
                    </Motion>
                  </Motion>
                  <div>
                    <p class="font-medium">{{ setting?.email }}</p>
                  </div>
                </Motion>

                <!-- Location -->
                <Motion
                  :initial="{ opacity: 0, x: 50 }"
                  :animate="{ opacity: 1, x: 0 }"
                  :transition="{ duration: 0.8, delay: 1.1 }"
                  class="flex items-center space-x-4 group cursor-pointer">
                  <Motion
                    :whileHover="{
                      scale: 1.1,
                      backgroundColor: 'rgba(255,255,255,0.3)',
                    }"
                    class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0">
                    <Motion
                      :whileHover="{
                        y: [-2, 0, -2],
                        transition: { repeat: Infinity, duration: 1 },
                      }">
                      <MapPin class="size-4" />
                    </Motion>
                  </Motion>
                  <div>
                    <p class="font-medium">{{ setting?.address }}</p>
                  </div>
                </Motion>
              </div>
            </div>

            <!-- Decorative Circles -->
            <div
              class="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 translate-y-8"></div>
            <div
              class="absolute bottom-1/4 -right-8 w-24 h-24 bg-white/5 rounded-full"></div>
            <div
              class="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-full -translate-x-4 -translate-y-4"></div>
          </UiCard>
        </Motion>

        <!-- Form Section -->
        <Motion
          :initial="{ opacity: 0, x: 50 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ duration: 0.8, ease: 'easeOut' }">
          <form class="py-10 px-10 lg:px-16 space-y-6" @submit="onSubmit">
            <UiFormField
              v-slot="{ componentField }"
              name="name"
              :validate-on-blur="!form.isFieldDirty">
              <Motion
                :initial="{ opacity: 0, y: 30 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, delay: 0.3 }">
                <UiFormItem>
                  <UiFormLabel>Nama</UiFormLabel>
                  <UiFormControl>
                    <Motion :whileFocus="{ scale: 1.02 }">
                      <UiInput
                        variant="underline"
                        type="text"
                        placeholder="Nama Anda..."
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
                :validate-on-blur="!form.isFieldDirty">
                <Motion
                  :initial="{ opacity: 0, y: 30 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.8, delay: 0.5 }">
                  <UiFormItem>
                    <UiFormLabel>Email</UiFormLabel>
                    <UiFormControl>
                      <Motion :whileFocus="{ scale: 1.02 }">
                        <UiInput
                          variant="underline"
                          type="email"
                          placeholder="Example@gmail.com"
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
                :validate-on-blur="!form.isFieldDirty">
                <Motion
                  :initial="{ opacity: 0, y: 30 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.8, delay: 0.7 }">
                  <UiFormItem>
                    <UiFormLabel>No. Tel</UiFormLabel>
                    <UiFormControl>
                      <Motion :whileFocus="{ scale: 1.02 }">
                        <UiInput
                          variant="underline"
                          type="tel"
                          placeholder="0823213..."
                          v-bind="componentField"
                          class="transition-all duration-300" />
                      </Motion>
                    </UiFormControl>
                    <UiFormMessage />
                  </UiFormItem>
                </Motion>
              </UiFormField>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
              <UiFormField
                v-slot="{ componentField }"
                name="hospitalName"
                :validate-on-blur="!form.isFieldDirty">
                <Motion
                  :initial="{ opacity: 0, y: 30 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.8, delay: 0.9 }">
                  <UiFormItem>
                    <UiFormLabel>Nama RS</UiFormLabel>
                    <UiFormControl>
                      <Motion :whileFocus="{ scale: 1.02 }">
                        <UiInput
                          variant="underline"
                          type="text"
                          placeholder="RSUD SUMUT..."
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
                name="position"
                :validate-on-blur="!form.isFieldDirty">
                <Motion
                  :initial="{ opacity: 0, y: 30 }"
                  :animate="{ opacity: 1, y: 0 }"
                  :transition="{ duration: 0.8, delay: 1.1 }">
                  <UiFormItem>
                    <UiFormLabel>Posisi</UiFormLabel>
                    <UiFormControl>
                      <Motion :whileFocus="{ scale: 1.02 }">
                        <UiInput
                          variant="underline"
                          type="text"
                          placeholder="Dirut..."
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
              name="message"
              :validate-on-blur="!form.isFieldDirty">
              <Motion
                :initial="{ opacity: 0, y: 30 }"
                :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.8, delay: 1.3 }">
                <UiFormItem>
                  <UiFormLabel>Pesan</UiFormLabel>
                  <UiFormControl>
                    <Motion :whileFocus="{ scale: 1.02 }">
                      <UiTextarea
                        class="min-h-24 transition-all duration-300"
                        variant="underline"
                        placeholder="Masukkan Pesan Anda..."
                        v-bind="componentField" />
                    </Motion>
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </Motion>
            </UiFormField>

            <Motion
              :initial="{ opacity: 0, y: 30 }"
              :animate="{ opacity: 1, y: 0 }"
              :transition="{ duration: 0.8, delay: 1.5 }"
              :whileHover="{ scale: 1.05 }"
              :whileTap="{ scale: 0.95 }">
              <UiButton
                :disabled="loading"
                :aria-disabled="loading"
                class="w-full transition-all duration-300 hover:shadow-lg group">
                {{ loading ? "Mengirim..." : "Kirim" }}
                <Loader2 v-if="loading" class="size-3.5 animate-spin" />
                <Send v-else class="size-3.5" />
              </UiButton>
            </Motion>
          </form>
        </Motion>
      </UiCardContent>
    </UiCard>
  </Motion>

  <!-- Success Dialog Component -->
  <SuccessDialog
    :isOpen="showSuccessDialog"
    v-model:open="showSuccessDialog"
    @closed="onDialogClosed" />
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { z } from "zod";

const settingStore = useSettingStore();
const { setting } = storeToRefs(settingStore);

const loading = ref(false);
const showSuccessDialog = ref(false);

const contactSchema = toTypedSchema(
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
    position: z.string({ required_error: "Posisi Wajib Diisi" }),
    hospitalName: z.string({ required_error: "Nama Rumah Sakit Wajib Diisi" }),
    message: z
      .string({ required_error: "Pesan Wajib Diisi" })
      .min(10, { message: "Pesan Tidak Boleh Kurang Dari 10 karakter" }),
  })
);

const form = useForm({ validationSchema: contactSchema });

const onSubmit = form.handleSubmit(async values => {
  loading.value = true;

  try {
    const res = await $fetch("/api/contacts", {
      method: "POST",
      body: values,
    });

    if (res.success) {
      showSuccessDialog.value = true;
      form.resetForm();
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
