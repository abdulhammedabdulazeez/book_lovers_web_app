export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export const FILTEROPTIONS: FilterOption[] = [
  { id: "fiction", label: "Fiction", value: "Fiction" },
  { id: "non-fiction", label: "Non-Fiction", value: "Non-Fiction" },
  { id: "science", label: "Science", value: "Science" },
  { id: "history", label: "History", value: "History" },
  { id: "mystery", label: "Mystery", value: "Mystery" },
  { id: "romance", label: "Romance", value: "Romance" },
  { id: "horror", label: "Horror", value: "Horror" },
  { id: "fantasy", label: "Fantasy", value: "Fantasy" },
  { id: "biography", label: "Biography", value: "Biography" },
];
