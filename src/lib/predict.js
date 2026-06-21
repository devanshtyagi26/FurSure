import axios from "axios";

/**
 * Upload an image to the Next.js API proxy route.
 */
// 🚨 Ensure the "export" keyword is right here before "const"
export const predict = async (file) => {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("/api/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload utility network error:", error);
    throw error;
  }
};
