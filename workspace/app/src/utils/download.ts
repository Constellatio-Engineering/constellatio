export const downloadFileFromUrl = async (url: string, filename: string): Promise<void> =>
{
  const response = await fetch(url);
  const blob = await response.blob();
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = filename;
  downloadLink.click();
  URL.revokeObjectURL(downloadLink.href);
  downloadLink.remove();
};
