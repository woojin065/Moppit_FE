import { create } from "zustand";

interface STLStoreState {
  stlFile: string | null;
  setSTLFile: (file: string | null) => void;
}

export const useSTLStore = create<STLStoreState>((set) => ({
  stlFile: null, // 기본적으로 STL 파일 없음
  setSTLFile: (file) => set({ stlFile: file }),
}));
