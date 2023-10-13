import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

export const createPdfBuffer = async (htmlContent: string): Promise<Buffer> =>
{
  const browser = await puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      "https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar"
    ),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent);

  const pdfBuffer = await page.pdf({
    format: "a4",
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
