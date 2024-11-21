import { supabase } from "@/lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteProduct = (handleOnSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await supabase.from("products").delete().eq("id", id);
    },
    onSuccess: () => {
      handleOnSuccess();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export { useDeleteProduct };
