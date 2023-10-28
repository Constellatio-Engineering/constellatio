export const getFileExtensionLowercase = (filename: string): string | undefined =>
{
  const fileExtension = filename.split(".").pop();
  const fileExtensionLowercase = fileExtension?.toLowerCase();
  return fileExtensionLowercase;
};
