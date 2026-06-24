// Utility to format date and time in Arabic-friendly format
export const formatArabicDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "تاريخ غير صالح";
  
  // Format options: 12 يونيو 2026 - 12:00:00 ص/م
  const datePart = date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
  const timePart = date.toLocaleTimeString('ar-EG', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true });
  
  return `${datePart} - ${timePart}`;
};