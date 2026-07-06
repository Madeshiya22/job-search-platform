import { distance } from "fastest-levenshtein";

const TITLE_DISTANCE_THRESHOLD = 3;

const detectDuplicates = (jobs) => {
  const bulkOperations = [];
  const exactMap = new Map();
  const groups = new Map();

  for (const job of jobs) {
    const exactKey = `${job.normalizedCompany}|${job.normalizedTitle}|${job.location
      .trim()
      .toLowerCase()}`;

    // Exact duplicate
    if (exactMap.has(exactKey)) {
      bulkOperations.push({
        updateOne: {
          filter: { _id: job._id },
          update: {
            $set: {
              isDuplicate: true,
              duplicateType: "exact",
              duplicateOf: exactMap.get(exactKey)._id,
            },
          },
        },
      });
      // Mark as duplicate in memory so we don't process it again in near duplicate logic
      job.isDuplicate = true;
      continue;
    }

    exactMap.set(exactKey, job);

    const groupKey = `${job.normalizedCompany}|${job.location
      .trim()
      .toLowerCase()}`;

    if (!groups.has(groupKey)) {
      groups.set(groupKey, []);
    }

    groups.get(groupKey).push(job);
  }

  // Near duplicate detection
  for (const group of groups.values()) {
    if (group.length < 2) continue;

    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        if (group[j].isDuplicate) continue;

        // Skip short titles to avoid misleading Levenshtein distances (e.g. "SDE" vs "SDE II")
        if (
          group[i].normalizedTitle.length < 5 ||
          group[j].normalizedTitle.length < 5
        ) {
          continue;
        }

        const diff = distance(
          group[i].normalizedTitle,
          group[j].normalizedTitle
        );

        if (diff <= TITLE_DISTANCE_THRESHOLD) {
          bulkOperations.push({
            updateOne: {
              filter: { _id: group[j]._id },
              update: {
                $set: {
                  isDuplicate: true,
                  duplicateType: "near",
                  duplicateOf: group[i]._id,
                },
              },
            },
          });
          group[j].isDuplicate = true;
        }
      }
    }
  }

  return bulkOperations;
};

export default detectDuplicates;
