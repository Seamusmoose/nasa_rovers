export default async function handler(req, res) {
  const { earth_date, rover } = req.query;

  try {
    if (typeof earth_date === "undefined" || typeof rover === "undefined") {
      throw new Error("Param 'earth_date', 'rover' is missing");
    }

    const URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${earth_date}&api_key=${process.env.NASA_ROVER2_API_KEY}`;

    const r = await fetch(URL);

    const data = await r.json();

    if (!r.ok) {
      throw new Error(JSON.stringify(data));
    }

    res.json(data);
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
}
