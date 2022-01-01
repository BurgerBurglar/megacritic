import { useEffect, useState } from "react";

export const useFetch = <I, O>(fn: (params: I) => Promise<O>, params: I) => {
  const [data, setData] = useState<O>();
  useEffect(() => {
    fn(params).then((res) => setData(res));
  }, [fn, params]);
  return data;
};
