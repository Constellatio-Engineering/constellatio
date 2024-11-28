export const getFileExtensionLowercase = (filename: string): string | undefined =>
{
  const fileExtension = filename.split(".").pop();
  const fileExtensionLowercase = fileExtension?.toLowerCase();
  return fileExtensionLowercase;
};

export const getFileNameWithoutExtension = (filename: string): string =>
{
  return filename.split(".").slice(0, -1).join(".");
};
