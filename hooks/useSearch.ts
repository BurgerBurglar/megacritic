import { useRouter } from "next/router";
import { useState } from "react";

export const useSearch = (initialQuery?: string) => {
  const [newQuery, setNewQuery] = useState(initialQuery || "");
  const router = useRouter();
  const search = () => router.push(`/search?query=${newQuery}`);
  return { newQuery, setNewQuery, search };
};
