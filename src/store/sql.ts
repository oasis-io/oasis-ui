// store/sql.ts
import { defineStore } from 'pinia';

export const useSqlStore = defineStore({
  id: 'sql',
  state: () => ({
    code: '',
  }),
  actions: {
    setCode(code: string) {
      this.code = code;
    },
  },
});
