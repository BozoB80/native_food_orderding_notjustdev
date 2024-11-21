import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProduct = (handleOnSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: any) =>
      await supabase
        .from("products")
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .eq("id", data.id)
        .select()
        .single(),
    onSuccess: (_, { id }) => {
      handleOnSuccess();
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });
};

export { useUpdateProduct };
