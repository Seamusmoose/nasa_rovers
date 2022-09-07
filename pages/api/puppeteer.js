let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

export default async function handler(req, res) {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    const browser = await puppeteer.launch(options);

    const aboutBlankPage = (await browser.pages())[0];
    if (aboutBlankPage) {
      await aboutBlankPage.close();
    }

    const page = await browser.newPage();
    await page.goto("https://mars.nasa.gov/msl/weather/");

    const nasaWeatherDataScrape = await page.evaluate(() => {
      let items = [...document.querySelectorAll(".item")];
      return items.map((item) => {
        const newMap = new Map();
        newMap["Sol"] = item.childNodes[0].innerText.split(" ").pop();
        newMap["Date"] = item.childNodes[1].innerText;
        newMap["High"] = item.childNodes[4].innerText
          .split("C")[0]
          .split(" ")
          .pop();
        newMap["Low"] = item.childNodes[4].innerText
          .split("C")[1]
          .split(" ")
          .pop();
        return newMap;
      });
    });

    console.log(nasaWeatherDataScrape, "in");
    res.send(nasaWeatherDataScrape);

    const newPage = (await browser.pages())[0];
    await newPage.close();
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
}
