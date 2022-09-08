const chrome = require("chrome-aws-lambda");

export default async function handler(req, res) {
  try {
    const browser = await chrome.puppeteer.launch({
      args: [
        "--headless",
        "--hide-scrollbars",
        "--mute-audio",
        "--disable-gl-drawing-for-tests",
      ],
      executablePath: await chrome.executablePath,
      headless: true,
    });

    // const aboutBlankPage = (await browser.pages())[0];
    // if (aboutBlankPage) {
    //   await aboutBlankPage.close();
    // }

    const page = (await browser.pages())[0];
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
