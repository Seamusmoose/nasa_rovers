// const chrome = require("chrome-aws-lambda");

// export default async function handler(req, res) {
//   try {
//     const browser = await chrome.puppeteer.launch(
//       process.env.NODE_ENV === "production"
//         ? {
//             args: chrome.args,
//             executablePath: await chrome.executablePath,
//             headless: true,
//           }
//         : {}
//     );

//     const aboutBlankPage = (await browser.pages())[0];
//     if (aboutBlankPage) {
//       await aboutBlankPage.close();
//     }

//     const page = await browser.newPage();
//     await page.goto("https://mars.nasa.gov/msl/weather/");

//     const nasaWeatherDataScrape = await page.evaluate(() => {
//       const high = Array.from(document.querySelectorAll(".celsius .high")).map(
//         (x) => x.innerText
//       );
//       const low = Array.from(document.querySelectorAll(".celsius .low")).map(
//         (x) => x.innerText
//       );
//       return {
//         high,
//         low,
//       };
//     });

//     console.log(nasaWeatherDataScrape, "in");
//     res.json(nasaWeatherDataScrape);

//     const newPage = (await browser.pages())[0];

//     await newPage.close();
//   } catch (error) {
//     console.log(error);

//     res.status(400).json({
//       message: error.message,
//     });
//   }
// }
