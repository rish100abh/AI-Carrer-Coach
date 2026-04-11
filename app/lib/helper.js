// // Helper function to convert entries to markdown
// export function entriesToMarkdown(entries, type) {
//   if (!entries?.length) return "";

//   return (
//     `## ${type}\n\n` +
//     entries
//       .map((entry) => {
//         const dateRange = entry.current
//           ? `${entry.startDate} - Present`
//           : `${entry.startDate} - ${entry.endDate}`;
//         return `### ${entry.title} @ ${entry.organization}\n${dateRange}\n\n${entry.description}`;
//       })
//       .join("\n\n")
//   );
// }

// export function entriesToMarkdown(entries, type) {
//   if (!entries?.length) return "";

//   return (
//     `## ${type}\n\n` +
//     entries
//       .map((entry) => {
//         const dateRange = entry.current
//           ? `${entry.startDate} - Present`
//           : `${entry.startDate} - ${entry.endDate}`;

//         return [
//           `### ${entry.title} @ ${entry.organization}`,
//           `${dateRange}`,
//           "",
//           `${entry.description}`,
//         ].join("\n");
//       })
//       .join("\n\n")
//   );
// }

const isNonEmpty = (value) =>
  typeof value === "string" ? value.trim().length > 0 : Boolean(value);

const clean = (value) =>
  typeof value === "string" ? value.trim() : "";

const escapeMarkdown = (value = "") =>
  clean(value).replace(/([\\`*_{}[\]()#+\-.!|>])/g, "\\$1");

const safeUrl = (value = "") => {
  const url = clean(value);
  if (!url) return "";
  try {
    return encodeURI(url);
  } catch {
    return "";
  }
};

const joinLines = (lines = []) =>
  lines
    .map((line) => (typeof line === "string" ? line.trim() : ""))
    .filter(Boolean)
    .join("\n");

const formatDateRange = (entry = {}) => {
  if (isNonEmpty(entry.startDate) && entry.current !== undefined) {
    return entry.current
      ? `${clean(entry.startDate)} - Present`
      : `${clean(entry.startDate)} - ${clean(entry.endDate) || "Present"}`;
  }

  if (isNonEmpty(entry.startDate) && isNonEmpty(entry.endDate)) {
    return `${clean(entry.startDate)} - ${clean(entry.endDate)}`;
  }

  if (isNonEmpty(entry.issueDate)) {
    return isNonEmpty(entry.expiryDate)
      ? `${clean(entry.issueDate)} - ${clean(entry.expiryDate)}`
      : clean(entry.issueDate);
  }

  if (isNonEmpty(entry.date)) return clean(entry.date);

  return "";
};

const renderExperience = (entry = {}) => {
  const title = clean(entry.title);
  const organization = clean(entry.organization);
  const heading =
    title && organization
      ? `### ${escapeMarkdown(title)} @ ${escapeMarkdown(organization)}`
      : `### ${escapeMarkdown(title || organization || "Experience")}`;

  const meta = [clean(entry.location), clean(entry.employmentType)]
    .filter(Boolean)
    .map(escapeMarkdown)
    .join(" • ");

  const dateRange = formatDateRange(entry);
  const description = clean(entry.description);

  return joinLines([
    heading,
    meta,
    escapeMarkdown(dateRange),
    "",
    escapeMarkdown(description),
  ]);
};

const renderEducation = (entry = {}) => {
  const degree = clean(entry.degree);
  const institution = clean(entry.institution);
  const heading =
    degree && institution
      ? `### ${escapeMarkdown(degree)} - ${escapeMarkdown(institution)}`
      : `### ${escapeMarkdown(degree || institution || "Education")}`;

  const dateRange = formatDateRange(entry);

  const meta = [
    isNonEmpty(entry.fieldOfStudy)
      ? `Field of Study: ${escapeMarkdown(entry.fieldOfStudy)}`
      : "",
    isNonEmpty(entry.gpa) ? `GPA: ${escapeMarkdown(entry.gpa)}` : "",
  ]
    .filter(Boolean)
    .join(" • ");

  return joinLines([
    heading,
    escapeMarkdown(entry.location || ""),
    escapeMarkdown(dateRange),
    meta,
    isNonEmpty(entry.achievements)
      ? `Achievements: ${escapeMarkdown(entry.achievements)}`
      : "",
    "",
    escapeMarkdown(entry.description || ""),
  ]);
};

const renderProject = (entry = {}) => {
  const heading = `### ${escapeMarkdown(clean(entry.title) || "Project")}`;
  const dateRange = formatDateRange(entry);

  const links = [
    isNonEmpty(entry.liveUrl)
      ? `[Live Demo](${safeUrl(entry.liveUrl)})`
      : "",
    isNonEmpty(entry.githubUrl)
      ? `[GitHub](${safeUrl(entry.githubUrl)})`
      : "",
  ]
    .filter(Boolean)
    .join(" • ");

  return joinLines([
    heading,
    isNonEmpty(entry.role) ? `Role: ${escapeMarkdown(entry.role)}` : "",
    escapeMarkdown(dateRange),
    isNonEmpty(entry.technologies)
      ? `Technologies: ${escapeMarkdown(entry.technologies)}`
      : "",
    links,
    "",
    escapeMarkdown(entry.description || ""),
  ]);
};

const renderCertification = (entry = {}) => {
  const heading = `### ${escapeMarkdown(clean(entry.name) || "Certification")}`;
  const dateRange = formatDateRange(entry);

  return joinLines([
    heading,
    isNonEmpty(entry.issuer)
      ? `Issuer: ${escapeMarkdown(entry.issuer)}`
      : "",
    escapeMarkdown(dateRange),
    isNonEmpty(entry.credentialId)
      ? `Credential ID: ${escapeMarkdown(entry.credentialId)}`
      : "",
    isNonEmpty(entry.credentialUrl)
      ? `[View Credential](${safeUrl(entry.credentialUrl)})`
      : "",
  ]);
};

const renderAchievement = (entry = {}) => {
  return joinLines([
    `### ${escapeMarkdown(clean(entry.title) || "Achievement")}`,
    isNonEmpty(entry.issuer)
      ? `Issuer: ${escapeMarkdown(entry.issuer)}`
      : "",
    isNonEmpty(entry.date) ? `Date: ${escapeMarkdown(entry.date)}` : "",
    "",
    escapeMarkdown(entry.description || ""),
  ]);
};

const renderEntry = (entry, sectionType = "") => {
  switch (sectionType.toLowerCase()) {
    case "work experience":
    case "experience":
      return renderExperience(entry);
    case "education":
      return renderEducation(entry);
    case "projects":
    case "project":
      return renderProject(entry);
    case "certifications":
    case "certification":
      return renderCertification(entry);
    case "achievements":
    case "achievement":
      return renderAchievement(entry);
    default:
      return renderExperience(entry);
  }
};

export function entriesToMarkdown(entries, type) {
  if (!Array.isArray(entries) || entries.length === 0) return "";

  const safeType = clean(type);
  const renderedEntries = entries
    .map((entry) => renderEntry(entry, safeType))
    .filter(Boolean)
    .join("\n\n");

  if (!renderedEntries) return "";

  return `## ${escapeMarkdown(safeType)}\n\n${renderedEntries}`;
}