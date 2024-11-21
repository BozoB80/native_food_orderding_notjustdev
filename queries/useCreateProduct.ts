import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateProduct = (handleOnSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) =>
      await supabase
        .from("products")
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .single(),
    onSuccess: () => {
      handleOnSuccess();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export { useCreateProduct };
