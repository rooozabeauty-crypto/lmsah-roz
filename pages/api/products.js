export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.salla.dev/admin/v2/products",
      {
        headers: {
          Authorization: `Bearer ${process.env.SALLA_TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
