const extractSalary = (description = "", currency = "") => {
  const salary = {
    raw: "",
    min: null,
    max: null,
    currency: currency || "",
  };

  if (!description) return salary;

  // Example: $84,500 - $140,800
  const match = description.match(
    /\$?\s?([\d,]+)\s*-\s*\$?\s?([\d,]+)/
  );

  if (match) {
    salary.raw = match[0];
    salary.min = Number(match[1].replace(/,/g, ""));
    salary.max = Number(match[2].replace(/,/g, ""));
  }

  return salary;
};

export default extractSalary;
