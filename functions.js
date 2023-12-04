import fs from "fs/promises";
export const writeJSON = async (filePath, jsonData) => {
  try {
    await fs.writeFile(filePath, jsonData, "utf8");
    console.log("JSON data has been written to", filePath);
  } catch (err) {
    console.error("Error writing file:", err);
  }
};
