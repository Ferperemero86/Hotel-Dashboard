import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { duplicateCabin } from "../../services/apiCabins";

export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: duplicateCab } = useMutation({
    mutationFn: duplicateCabin,
    onSuccess: () => {
      toast.success("Cabin duplicated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, duplicateCab };
}
