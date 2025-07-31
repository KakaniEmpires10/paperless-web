<template>
  <div class="space-y-6">
    <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
      <UiCardHeader>
        <UiCardTitle class="text-lg font-semibold">Company Settings</UiCardTitle>
        <UiCardDescription>Manage your company information and preferences</UiCardDescription>
      </UiCardHeader>
      
      <UiCardContent class="space-y-8">
        <!-- Company Information -->
        <div class="space-y-6">
          <div class="border-b border-gray-200/50 pb-6">
            <h4 class="text-md font-medium text-gray-900 mb-4">Company Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <UiLabel for="company-name">Company Name</UiLabel>
                <UiInput
                  id="company-name"
                  v-model="companySettings.name"
                  placeholder="Your Company Name"
                  class="bg-white/50"
                />
              </div>
              <div class="space-y-2">
                <UiLabel for="company-email">Email Address</UiLabel>
                <UiInput
                  id="company-email"
                  type="email"
                  v-model="companySettings.email"
                  placeholder="contact@company.com"
                  class="bg-white/50"
                />
              </div>
              <div class="space-y-2">
                <UiLabel for="company-phone">Phone Number</UiLabel>
                <UiInput
                  id="company-phone"
                  v-model="companySettings.phone"
                  placeholder="+1 (555) 123-4567"
                  class="bg-white/50"
                />
              </div>
              <div class="space-y-2">
                <UiLabel for="company-website">Website</UiLabel>
                <UiInput
                  id="company-website"
                  v-model="companySettings.website"
                  placeholder="https://company.com"
                  class="bg-white/50"
                />
              </div>
            </div>
            
            <div class="mt-6 space-y-2">
              <UiLabel for="company-description">Company Description</UiLabel>
              <UiTextarea
                id="company-description"
                v-model="companySettings.description"
                placeholder="Brief description of your company..."
                class="bg-white/50 min-h-20"
              />
            </div>
          </div>

          <!-- Notification Preferences -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900">Notification Preferences</h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-white/50 transition-colors">
                <div class="flex items-center space-x-3">
                  <Mail class="w-5 h-5 text-gray-600" />
                  <div>
                    <UiLabel class="text-sm font-medium text-gray-900">Email Notifications</UiLabel>
                    <p class="text-xs text-gray-500">Receive updates and alerts via email</p>
                  </div>
                </div>
                <UiSwitch v-model="notificationSettings.email" />
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-white/50 transition-colors">
                <div class="flex items-center space-x-3">
                  <Smartphone class="w-5 h-5 text-gray-600" />
                  <div>
                    <UiLabel class="text-sm font-medium text-gray-900">SMS Notifications</UiLabel>
                    <p class="text-xs text-gray-500">Receive important alerts via SMS</p>
                  </div>
                </div>
                <UiSwitch v-model="notificationSettings.sms" />
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-white/50 transition-colors">
                <div class="flex items-center space-x-3">
                  <Bell class="w-5 h-5 text-gray-600" />
                  <div>
                    <UiLabel class="text-sm font-medium text-gray-900">Push Notifications</UiLabel>
                    <p class="text-xs text-gray-500">Browser push notifications for real-time updates</p>
                  </div>
                </div>
                <UiSwitch v-model="notificationSettings.push" />
              </div>
            </div>
          </div>

          <!-- Security Settings -->
          <div class="space-y-4">
            <h4 class="text-md font-medium text-gray-900">Security Settings</h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-white/50 transition-colors">
                <div class="flex items-center space-x-3">
                  <Shield class="w-5 h-5 text-gray-600" />
                  <div>
                    <UiLabel class="text-sm font-medium text-gray-900">Two-Factor Authentication</UiLabel>
                    <p class="text-xs text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <UiSwitch v-model="securitySettings.twoFactor" />
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-white/50 transition-colors">
                <div class="flex items-center space-x-3">
                  <Lock class="w-5 h-5 text-gray-600" />
                  <div>
                    <UiLabel class="text-sm font-medium text-gray-900">Session Timeout</UiLabel>
                    <p class="text-xs text-gray-500">Automatically log out after period of inactivity</p>
                  </div>
                </div>
                <UiSelect v-model="securitySettings.sessionTimeout">
                  <UiSelectTrigger class="w-32">
                    <UiSelectValue />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem value="15">15 min</UiSelectItem>
                    <UiSelectItem value="30">30 min</UiSelectItem>
                    <UiSelectItem value="60">1 hour</UiSelectItem>
                    <UiSelectItem value="240">4 hours</UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center justify-between pt-6 border-t border-gray-200/50">
            <UiButton variant="outline" @click="resetSettings">
              <RotateCcw class="w-4 h-4 mr-2" />
              Reset to Default
            </UiButton>
            <div class="flex space-x-3">
              <UiButton variant="outline" @click="cancelChanges">Cancel</UiButton>
              <UiButton @click="saveSettings" class="bg-blue-600 hover:bg-blue-700">
                <Save class="w-4 h-4 mr-2" />
                Save Changes
              </UiButton>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Additional Settings Cards -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardHeader>
          <UiCardTitle>Data & Privacy</UiCardTitle>
          <UiCardDescription>Manage your data and privacy settings</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <UiButton variant="outline" class="w-full justify-start">
            <Download class="w-4 h-4 mr-2" />
            Export Data
          </UiButton>
          <UiButton variant="outline" class="w-full justify-start">
            <Trash2 class="w-4 h-4 mr-2" />
            Delete Account
          </UiButton>
          <UiButton variant="outline" class="w-full justify-start">
            <FileText class="w-4 h-4 mr-2" />
            Privacy Policy
          </UiButton>
        </UiCardContent>
      </UiCard>

      <UiCard class="bg-white/70 backdrop-blur-sm border-white/20">
        <UiCardHeader>
          <UiCardTitle>Support</UiCardTitle>
          <UiCardDescription>Get help and contact support</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="space-y-4">
          <UiButton variant="outline" class="w-full justify-start">
            <HelpCircle class="w-4 h-4 mr-2" />
            Help Center
          </UiButton>
          <UiButton variant="outline" class="w-full justify-start">
            <MessageCircle class="w-4 h-4 mr-2" />
            Contact Support
          </UiButton>
          <UiButton variant="outline" class="w-full justify-start">
            <Bug class="w-4 h-4 mr-2" />
            Report Bug
          </UiButton>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  Mail,
  Smartphone,
  Bell,
  Shield,
  Lock,
  RotateCcw,
  Save,
  Download,
  Trash2,
  FileText,
  HelpCircle,
  MessageCircle,
  Bug,
} from "lucide-vue-next";

const companySettings = ref({
  name: "Your Company Name",
  email: "contact@company.com",
  phone: "+1 (555) 123-4567",
  website: "https://company.com",
  description: "A brief description of your company and what you do...",
});

const notificationSettings = ref({
  email: true,
  sms: false,
  push: true,
});

const securitySettings = ref({
  twoFactor: false,
  sessionTimeout: "30",
});

const saveSettings = () => {
  // Save settings logic here
  console.log("Settings saved:", {
    company: companySettings.value,
    notifications: notificationSettings.value,
    security: securitySettings.value,
  });
};

const resetSettings = () => {
  // Reset to default values
  companySettings.value = {
    name: "Your Company Name",
    email: "contact@company.com",
    phone: "+1 (555) 123-4567",
    website: "https://company.com",
    description: "A brief description of your company and what you do...",
  };
  notificationSettings.value = {
    email: true,
    sms: false,
    push: true,
  };
  securitySettings.value = {
    twoFactor: false,
    sessionTimeout: "30",
  };
};

const cancelChanges = () => {
  // Cancel changes logic
  console.log("Changes cancelled");
};
</script>