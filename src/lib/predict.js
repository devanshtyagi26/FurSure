import axios from "axios";

/**
 * Upload an image to the server.
 * @param {File} file - The image file to upload.
 * @returns {Promise<Object>} The response from the server.
 */
export const predict = async (file) => {
  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  const formData = new FormData();
  formData.append("file", file); // ✅ field name must match the backend

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await axios.post(`${apiUrl}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
