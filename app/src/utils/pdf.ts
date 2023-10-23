import puppeteer, { type Browser } from "puppeteer";

export const createPdfBuffer = async (htmlContent: string): Promise<Buffer> =>
{
  console.log("--- Creating PDF buffer ---");

  let browser: Browser | null = null;

  try
  {
    browser = await puppeteer.connect({
      browserWSEndpoint: "wss://chrome.browserless.io?token=c891bdcb-f85e-435c-beb5-02d853052a08",
      ignoreHTTPSErrors: true,
      protocolTimeout: 10000
    });

    console.log("Browser connected");

    const page = await browser.newPage();
    await page.setContent(htmlContent);

    console.log("Page content set");

    const pdfBuffer = await page.pdf({
      format: "a4",
      margin: {
        bottom: "2cm",
        left: "2cm",
        right: "2cm",
        top: "2cm",
      }
    });

    console.log("PDF buffer created");

    return pdfBuffer;
  }
  catch (e: any)
  {
    console.log("errrrrroooooor", e);
    return await Promise.reject(e);
  }
  finally
  {
    console.log("finally");
    await browser?.close();
    console.log("Browser closed");
  }
};
