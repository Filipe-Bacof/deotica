import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../interfaces/user.interface";

export interface UserStore {
  user: User;
  handleAddUser: (data: User) => void;
  handleRemoveUser: () => void;
}

export const useAuthStore = create<UserStore>()(
  persist(
    (set) => ({
      user: {} as User,

      handleAddUser: ({
        id,
        nome,
        email,
        perfil,
        createdAt,
        updatedAt,
      }: User) => {
        set({
          user: {
            id,
            nome,
            email,
            perfil,
            createdAt,
            updatedAt,
          },
        });
      },

      handleRemoveUser: () => set({}, true),
    }),
    { name: "@deoticaUser" },
  ),
);
