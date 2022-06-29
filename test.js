const puppeteer = require('puppeteer');
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.msn.com/vi-vn/news/world/c%E1%BB%B1u-%C4%91%E1%BA%B7c-nhi%E1%BB%87m-h%C3%A0n-kh%C3%B4ng-h%E1%BB%91i-ti%E1%BA%BFc-v%C3%AC-t%E1%BB%9Bi-ukraine-tham-chi%E1%BA%BFn/ar-AAYUqZw?ocid=msedgntp&cvid=52214eae05d743c2a1a0b84529ee4456', {waitUntil: 'domcontentloaded'});
  // Wait for 5 seconds
  const html = await page.content();
  // console.log(await page.content());
  fs.writeFile("./a.html", html, err => {
    console.log(err);
  });
  // Take screenshot
  await browser.close();
})();

