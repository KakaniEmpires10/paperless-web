import { join, extname, basename } from "node:path";
import { createHash } from "node:crypto";

interface ImageUploadOptions {
  uploadDir?: string;
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  generateUniqueName?: boolean;
  keepOriginalName?: boolean;
}

interface ImageFile {
  filename: string;
  type: string;
  data: Buffer;
  size: number;
}

interface UploadResult {
  success: boolean;
  filePath?: string;
  publicPath?: string;
  error?: string;
  originalName?: string;
  size?: number;
}

// Default configuration
const defaultOptions: Required<ImageUploadOptions> = {
  uploadDir: "",
  maxSize: 4 * 1024 * 1024, // 4MB
  allowedTypes: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ],
  generateUniqueName: true,
  keepOriginalName: false,
};

const generateFileName = (
  originalName: string,
  generateUnique: boolean = true
): string => {
  const ext = extname(originalName);
  const nameWithoutExt = basename(originalName, ext);

  if (!generateUnique) {
    return originalName;
  }

  const timestamp = Date.now();
  const hash = createHash("md5")
    .update(`${nameWithoutExt}-${timestamp}`)
    .digest("hex")
    .substring(0, 8);

  return `${nameWithoutExt}-${timestamp}-${hash}${ext}`;
};

const validateFile = (
  file: ImageFile,
  options: Required<ImageUploadOptions>
): { valid: boolean; error?: string } => {
  // Check file size
  if (file.size > options.maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size: ${Math.round(options.maxSize / 1024 / 1024)}MB`,
    };
  }

  // Check file type
  if (!options.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed: ${options.allowedTypes.join(", ")}`,
    };
  }

  // Check if filename exists
  if (!file.filename) {
    return { valid: false, error: "No filename provided" };
  }

  return { valid: true };
};

// Main utility functions
export const uploadImage = async (
  file: ImageFile,
  options: Partial<ImageUploadOptions> = {}
): Promise<UploadResult> => {
  const opts = { ...defaultOptions, ...options };
  const storage = useStorage("uploads");

  try {
    // Validate file
    const validation = validateFile(file, opts);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    // Generate filename
    const fileName = opts.keepOriginalName
      ? file.filename
      : generateFileName(file.filename, opts.generateUniqueName);

    const dir = opts.uploadDir ? opts.uploadDir : ""

    const fileInsert = join(dir, fileName).replace(/\\/g, "/");
    const filePath = join("/uploads", dir, fileName).replace(
      /\\/g,
      "/"
    );

    // Write file
    await storage.setItemRaw(fileInsert, file.data);

    return {
      success: true,
      filePath,
    };
  } catch (error) {
    return {
      success: false,
      error: `Upload img failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};

export const replaceImage = async (
  newFile: ImageFile,
  oldImagePath: string | null | undefined,
  options: Partial<ImageUploadOptions> = {}
): Promise<UploadResult> => {
  try {
    // Upload new image first
    const uploadResult = await uploadImage(newFile, options);

    if (!uploadResult.success) {
      return uploadResult;
    }

    // Delete old image if it exists
    if (oldImagePath) {
      await deleteImage(oldImagePath);
    }

    return uploadResult;
  } catch (error) {
    return {
      success: false,
      error: `Replace img failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};

export const deleteImage = async (
  imagePath: string
): Promise<{ success: boolean; message?: string; error?: string }> => {
  const storage = useStorage("uploads");

  try {
    if (!imagePath) {
      return { success: true }; // Nothing to delete
    }

    const filename = imagePath.replace("/uploads/", "");

    // Check if file exists before deletion
    const fileExists = await storage.hasItem(filename);

    if (fileExists) {
      await storage.removeItem(filename);
      return { success: true, message: "Gambar Berhasil Dihapus" };
    } else {
      return { success: true, message: "Gambar Tidak Ditemukan" };
    }
  } catch (error) {
    return {
      success: false,
      error: `Delete img failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
};
