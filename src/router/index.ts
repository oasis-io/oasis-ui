import { createRouter, createWebHashHistory } from "vue-router";
import baseRouter from "./modules/baseRouter";


const router = createRouter({
  history: createWebHashHistory(),
  routes: baseRouter,
});


export default router;
