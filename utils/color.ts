export const colors = {
    primaryBackground: "#F8FAFC",
    mainColor: "#3B82F6",
    secondaryColor: "#10B981",
    dangerColor: "#EF4444",
  } as const;
  
  // Type export
  export type ColorKeys = keyof typeof colors;
  