export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};
