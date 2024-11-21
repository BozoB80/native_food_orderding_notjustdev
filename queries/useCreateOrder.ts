import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateOrder = (
  handleOnSuccess: (data: InsertTables<"orders">) => void
) => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    mutationFn: async (data: InsertTables<"orders">) => {
      const { data: newOrder, error } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error?.message || "Failed to create order");
      }

      return newOrder;
    },
    onSuccess: (data) => {
      handleOnSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

export { useCreateOrder };
