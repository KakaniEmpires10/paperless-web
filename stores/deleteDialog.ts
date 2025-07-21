import { defineStore } from "pinia";

// Types untuk callback functions
type DeleteSuccessCallback = (itemId: string | number) => void | Promise<void>;
type DeleteErrorCallback = (error: unknown) => void | Promise<void>;
type CloseCallback = () => void | Promise<void>;

// Interface untuk state
interface DeleteDialogState {
  isOpen: boolean;
  loading: boolean;
  title: string;
  description: string;
  itemId: string | number | null;
  itemName: string;
  endpoint: string;
  onDeleteSuccess: DeleteSuccessCallback | null;
  onDeleteError: DeleteErrorCallback | null;
  onClose: CloseCallback | null;
}

// Interface untuk parameter openDialog
interface OpenDialogParams {
  id: string | number;
  name?: string;
  endpoint: string;
  title?: string;
  description?: string;
  onSuccess?: DeleteSuccessCallback | null;
  onError?: DeleteErrorCallback | null;
  onClose?: CloseCallback | null;
}

export const useDeleteDialogStore = defineStore("DeleteDialogStore", {
  state: (): DeleteDialogState => ({
    isOpen: false,
    loading: false,
    title: "Apakah Anda yakin?",
    description:
      "Aksi ini tidak dapat dibatalkan. Anda akan menghapus anggota tim ini secara permanen.",
    itemId: null,
    itemName: "",
    endpoint: "",
    // Callback functions
    onDeleteSuccess: null,
    onDeleteError: null,
    onClose: null,
  }),

  actions: {
    openDialog({
      id,
      name = "",
      endpoint,
      title = "Apakah Anda yakin?",
      description = "Aksi ini tidak dapat dibatalkan. Anda akan menghapus item ini secara permanen.",
      onSuccess = null,
      onError = null,
      onClose = null,
    }: OpenDialogParams): void {
      this.isOpen = true;
      this.itemId = id;
      this.itemName = name;
      this.endpoint = endpoint;
      this.title = title;
      this.description = description.replace("{item}", name);
      this.onDeleteSuccess = onSuccess;
      this.onDeleteError = onError;
      this.onClose = onClose;
    },

    closeDialog(): void {
      this.isOpen = false;
      this.loading = false;
      this.itemId = null;
      this.itemName = "";
      this.endpoint = "";

      // Call onClose callback if provided
      if (this.onClose) {
        this.onClose();
      }

      // Reset callbacks
      this.onDeleteSuccess = null;
      this.onDeleteError = null;
      this.onClose = null;
    },

    async confirmDelete(): Promise<void> {
      if (!this.itemId || !this.endpoint) return;

      this.loading = true;
      try {
        // Make delete request
        await $fetch(`${this.endpoint}/${this.itemId}`, {
          method: "DELETE",
        });

        // Call success callback
        if (this.onDeleteSuccess) {
          await this.onDeleteSuccess(this.itemId);
        }

        // Close dialog
        this.closeDialog();
      } catch (error) {
        console.error("Delete failed:", error);

        // Call error callback
        if (this.onDeleteError) {
          await this.onDeleteError(error);
        }

        this.loading = false;
      }
    },
  },
});