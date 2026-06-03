export type FooterLink = {
  label: string;
  href?: string;
};

export const footerProductLinks: FooterLink[] = [
  { label: "الميزات", href: "#features" },
  { label: "المساعد الذكي", href: "#ai-assistant" },
  { label: "الاشتراكات", href: "#pricing" },
];

export const footerCompanyLinks: FooterLink[] = [
  { label: "عن MediXa AI" },
  { label: "اتصل بنا" },
  { label: "سياسة الخصوصية" },
  { label: "شروط الاستخدام" },
];

export const footerSupportLinks: FooterLink[] = [
  { label: "مركز المساعدة" },
  { label: "الأسئلة الشائعة", href: "#faq" },
  { label: "تواصل مع الدعم" },
  { label: "التوثيق التقني" },
];
