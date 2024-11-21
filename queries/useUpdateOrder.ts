import { supabase } from "@/lib/supabase";
import { UpdateTables } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateOrder = (handleOnSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updatedField,
    }: {
      id: number;
      updatedField: UpdateTables<"orders">;
    }) => {
      const { error, data: updatedOrder } = await supabase
        .from("orders")
        .update(updatedField)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedOrder;
    },
    onSuccess: (_, { id }) => {
      handleOnSuccess();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
    },
  });
};

export { useUpdateOrder };
