const puppeteer = require('puppeteer');

const SERVER_URL = "http://127.0.0.1:8887/"

async function  run () {
    let browser = await puppeteer.launch({
    headless: true
    });

    let page = await browser.newPage();
    
    //await page._client.send('ServiceWorker.enable');
    await page.goto(SERVER_URL,  { waitUntil: 'networkidle0' });
    await page.evaluate('navigator.serviceWorker.ready');
    await page.setOfflineMode(true);

    page.on('response', resp => {
        //console.log(resp.url());
        if(/style.*css$/.test(resp.url())) {
            console.log(resp.status());
        }
        
    });

    await page.reload({waitUntil: 'networkidle0'});

}

run();

