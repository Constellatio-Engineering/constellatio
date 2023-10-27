import type Chromium from "chrome-aws-lambda";
import { type Browser as PuppeteerBrowser, type PuppeteerNode } from "puppeteer";
import { type Browser as PuppeteerCoreBrowser, type PuppeteerNode as PuppeteerCoreNode } from "puppeteer-core";

const isRunningOnVercel = process.env.AWS_LAMBDA_FUNCTION_VERSION != null;

let chrome: typeof Chromium;
let puppeteerCore: PuppeteerCoreNode;
let puppeteer: PuppeteerNode;

if(isRunningOnVercel)
{
  chrome = require("chrome-aws-lambda");
  puppeteerCore = require("puppeteer-core");
}
else 
{
  puppeteer = require("puppeteer");
}

export const createPdfBuffer = async (htmlContent: string): Promise<Buffer> =>
{
  let browser: PuppeteerBrowser | PuppeteerCoreBrowser;

  if(isRunningOnVercel)
  {
    browser = await puppeteerCore.launch({
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  }
  else
  {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: "new",
      ignoreHTTPSErrors: true,
    });
  }

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
