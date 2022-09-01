export default async function handler(req, res) {
  const { rover } = req.query;

  try {
    if (typeof rover === "undefined") {
      throw new Error("Param 'rover' is missing");
    }

    const URL = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?&api_key=${process.env.NASA_ROVER2_API_KEY}`;

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
