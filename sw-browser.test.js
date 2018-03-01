const puppeteer = require("puppeteer");

const SERVER_URL = "http://127.0.0.1:8887/";

describe("Testing SW install event", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true
    });
    page = await browser.newPage();
  });

  it("should get main bundle and CSS when offline", async done => {
    // navgiate to our local server
    await page.goto(SERVER_URL, { waitUntil: "networkidle0" });
    // wait until serviceWorker is registered
    await page.evaluate("navigator.serviceWorker.ready");
    await page.setOfflineMode(true);
    // success critiria
    let cssFound = false;
    let jsFound = false;
    page.on("response", resp => {
      // check if main styles and main bundle are avialble offline
      if (/style.*css$/.test(resp.url()) && resp.status() === 200) {
        cssFound = true;
      }
      if (/bundle.*js$/.test(resp.url()) && resp.status() === 200) {
        jsFound = true;
      }
      if (cssFound && jsFound) {
        done();
      }
    });
    await page.reload({ waitUntil: "networkidle0" });
  });
});
