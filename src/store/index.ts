import { reactive } from "vue";
import type { herosResType } from "#/axios";

interface Store {
  heros: herosResType;
  setHeros(data: herosResType): void;
}

export const store: Store = reactive({
  heros: [] as herosResType,
  setHeros(data) {
    this.heros.push(...data);
  },
});