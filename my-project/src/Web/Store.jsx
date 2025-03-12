import { create } from "zustand";

const useCartStore = create((set) => ({
  cartUpdated: false, 
  cartRemove:false,
  updateCart: () => set((state) => ({ cartUpdated: !state.cartUpdated })), 
  removeCart:() => set((state) => ({ cartRemove: !state.cartRemove })),
}));

export default useCartStore;
