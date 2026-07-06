import type { ReactNode } from "react";

export interface PaginationData {
  page: number;
  pages: number;
  total: number;
  limit: number;
}

export interface CustomAutocompleteWithPaginationProps<T> {
  label: string;

  placeholder?: string;

  options: T[];

  value: T | null;

  loading?: boolean;

  pagination?: PaginationData;

  getOptionLabel: (option: T) => string;

  isOptionEqualToValue?: (option: T, value: T) => boolean;

  onChange: (value: T | null) => void;

  onSearch?: (value: string) => void;

  onPageChange: (page: number) => void;

  noOptionsText?: ReactNode;

  onQuickAdd?: () => void;
}

// export interface CreateField {
//   name: string;
//   label: string;
//   type?: "text" | "select";
//   required?: boolean;

//   options?: {
//     label: string;
//     value: string;
//   }[];
// }

// export interface CreateEntityConfig<T> {
//   title: string;

//   fields: CreateField[];

//   loading?: boolean;

//   onSubmit: (
//     values: Record<string, string>,
//     reset: () => void,
//   ) => Promise<void>;

//   onCreated?: (item: T) => void;
// }
