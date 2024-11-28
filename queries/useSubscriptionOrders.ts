import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const useSubscriptionOrders = () => {
  const queryQlient = useQueryClient();

  useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload);
          queryQlient.invalidateQueries({ queryKey: ["orders"] });
        }
      )
      .subscribe();
    return () => {
      orders.unsubscribe();
    };
  }, []);
};

export { useSubscriptionOrders };
