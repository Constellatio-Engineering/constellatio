import puppeteer from "puppeteer";

export const createPdfBuffer = async (htmlContent: string): Promise<Buffer> =>
{
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.setContent(htmlContent);

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      bottom: "2cm",
      left: "2cm",
      right: "2cm",
      top: "2cm",
    }
  });

  await browser.close();

  return pdfBuffer;
};
