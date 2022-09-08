export default async function handler(req, res) {
  try {
    const url = `https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json`;

    const weatherData = await fetch(url);
    const data = await weatherData.json();

    if (!weatherData.ok) {
      throw new Error(JSON.stringify(data));
    }
    const slicedData = data.soles.slice(0, 10);
    res.json(slicedData);
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
}
