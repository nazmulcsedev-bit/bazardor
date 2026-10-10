const D = "০১২৩৪৫৬৭৮৯";
export const toBn = (v) =>
  Number(v).toLocaleString("en-US", { maximumFractionDigits: 2 }).replace(/\d/g, (d) => D[d]);
export const fromBn = (s) =>
  Number(String(s).replace(/[০-৯]/g, (d) => D.indexOf(d)).replace(/[^\d.\-]/g, "")) || 0;
export const bnDate = () =>
  new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
