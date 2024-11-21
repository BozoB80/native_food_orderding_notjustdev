import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useGetProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export { useGetProduct };
