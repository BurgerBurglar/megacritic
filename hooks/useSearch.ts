import { useRouter } from "next/router";
import { useState } from "react";

export const useSearch = (initialQuery?: string) => {
  const [newQuery, setNewQuery] = useState(initialQuery || "");
  const router = useRouter();
  return { newQuery, setNewQuery, router };
};
