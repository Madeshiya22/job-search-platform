import { getLocations } from "../services/location.service.js";

export const getAllLocations = async (req, res) => {
  try {
    const { search } = req.query;
    const locations = await getLocations(search);
    res.status(200).json({ success: true, data: locations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch locations" });
  }
};
