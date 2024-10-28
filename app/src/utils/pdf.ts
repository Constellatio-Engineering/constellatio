// import puppeteer from "puppeteer";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,import/no-unused-modules
export const createPdfBuffer = (/* htmlContent: string*/) =>
{
  console.error("currently not implemented");
  return;

  /* const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: "new",
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

  return pdfBuffer;*/
};
