import { getCompanies } from "../services/company.service.js";

export const getAllCompanies = async (req, res) => {
  try {
    const { search } = req.query;
    const companies = await getCompanies(search);
    res.status(200).json({ success: true, data: companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch companies" });
  }
};
