import { create } from "zustand";

const useCartStore = create((set) => ({
  cartUpdated: false, 
  updateCart: () => set((state) => ({ cartUpdated: !state.cartUpdated })), 
}));

export default useCartStore;
