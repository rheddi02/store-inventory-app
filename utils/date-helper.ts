export const formatDate = (iso: string, time = false) => {
  const d = new Date(iso);

  const datePart = `${d.toLocaleString('en-US', { month: 'short' })}, ${String(
    d.getDate()
  ).padStart(2, '0')}, ${d.getFullYear()}`;

  const timePart = d.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  if (!time) return datePart;
  return `${datePart} ${timePart}`;
};