import { create } from 'zustand';

export const UseUIStore = create((set) => ({
    //Signin modal open and close state
    isAddChoirOpen: false,
    openAddChoir: () => set({ isAddChoirOpen: true }),
    closeAddChoir: () => set({ isAddChoirOpen: false }),


    //Sidebar Add choir button disable state
    isDisableSignin: false,
    enableSignin: () => set({ isDisableSignin: false }),
    disableSignin: () => set({ isDisableSignin: true }),
}))

