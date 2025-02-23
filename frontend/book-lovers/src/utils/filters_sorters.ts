export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export const FILTEROPTIONS: FilterOption[] = [
  { id: "fiction", label: "Fiction", value: "fiction" },
  { id: "non-fiction", label: "Non-Fiction", value: "non-fiction" },
  { id: "science", label: "Science", value: "science" },
  { id: "history", label: "History", value: "history" },
  { id: "mystery", label: "Mystery", value: "mystery" },
  { id: "romance", label: "Romance", value: "romance" },
  { id: "horror", label: "Horror", value: "horror" },
  { id: "fantasy", label: "Fantasy", value: "fantasy" },
  { id: "biography", label: "Biography", value: "biography" },
];
