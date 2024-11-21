import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateOrderItems = (
  handleOnSuccess: (data: InsertTables<"order_items">[]) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: InsertTables<"order_items">[]) => {
      const { data: newOrder, error } = await supabase
        .from("order_items")
        .insert(items)
        .select();

      if (error) {
        throw new Error(error?.message || "Failed to create order");
      }

      return newOrder;
    },
    onSuccess: (data) => {
      handleOnSuccess(data);
    },
  });
};

export { useCreateOrderItems };
