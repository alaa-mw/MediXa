export const getMatchStyle = (type?: string) => {
  switch (type) {
    // --- حالات البحث بالاسم التجاري ---
    case "EXACT_COMPOSITION":
      return { color: "#22c55e", label: "نفس التركيبة" }; 
    case "SAME_INGREDIENTS_DIFFERENT_STRENGTH":
      return { color: "#eab308", label: "عيار مختلف" }; 
    case "SAME_INGREDIENTS_DIFFERENT_FORM":
      return { color: "#3b82f6", label: "شكل مختلف" }; 

    // --- حالات البحث بالمادة الفعالة ---
    case "EXACT_INGREDIENT_SET":
      return { color: "#22c55e", label: "تطابق تام" }; 
    case "CONTAINS_ALL_SELECTED_INGREDIENTS":
      return { color: "#a855f7", label: "يحوي مواد إضافية" }; 

    default:
      return { color: "#64748b", label: "بديل" };
  }
};
