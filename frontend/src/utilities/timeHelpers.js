export const getTimeAgo = (dateString) => {
  const now = new Date();
  const created = new Date(dateString);

  const seconds = Math.floor((now - created) / 1000);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  return `${years} year${years > 1 ? "s" : ""} ago`;
};

export const isNewBookmark = (dateString) => {
  const now = new Date();
  const created = new Date(dateString);

  const diffHours = (now - created) / (1000 * 60 * 60);

  return diffHours <= 24; // NEW if within 24 hours
};
