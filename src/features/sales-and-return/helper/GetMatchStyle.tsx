export const getMatchStyle = (type?: string) => {
  switch (type) {
    // --- حالات البحث بالاسم التجاري ---
    case "EXACT_COMPOSITION":
      return { color: "#22c55e", label: "نفس التركيبة" }; // أخضر
    case "SAME_INGREDIENTS_DIFFERENT_STRENGTH":
      return { color: "#eab308", label: "عيار مختلف" }; // أصفر
    case "SAME_INGREDIENTS_DIFFERENT_FORM":
      return { color: "#3b82f6", label: "شكل مختلف" }; // أزرق

    // --- حالات البحث بالمادة الفعالة ---
    case "EXACT_INGREDIENT_SET":
      return { color: "#22c55e", label: "تطابق تام" }; // أخضر (نفس فكرة نفس التركيبة)
    case "CONTAINS_ALL_SELECTED_INGREDIENTS":
      return { color: "#a855f7", label: "يحوي مواد إضافية" }; // بنفسجي

    default:
      return { color: "#64748b", label: "بديل" };
  }
};
