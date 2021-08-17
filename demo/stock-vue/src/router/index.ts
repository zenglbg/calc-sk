import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/home/index.vue";
import BOLL from "../views/BOLL/index.vue";
import VOL from "../views/VOL/index.vue";
import MACD from "../views/MACD/index.vue";
import KDJ from "../views/KDJ/index.vue";
import RSI from "../views/RSI/index.vue";
import WR from "../views/WR/index.vue";
import VR from "../views/VR/index.vue";
import CCI from "../views/CCI/index.vue";
import BIAS from "../views/BIAS/index.vue";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "ma",
    component: Home,
  },
  {
    path: "/BOLL",
    name: "BOLL",
    component: BOLL,
  },
  {
    path: "/VOL",
    name: "VOL",
    component: VOL,
  },
  {
    path: "/MACD",
    name: "MACD",
    component: MACD,
  },
  {
    path: "/KDJ",
    name: "KDJ",
    component: KDJ,
  },
  {
    path: "/RSI",
    name: "RSI",
    component: RSI,
  },
  {
    path: "/WR",
    name: "WR",
    component: WR,
  },
  {
    path: "/VR",
    name: "VR",
    component: VR,
  },
  {
    path: "/CCI",
    name: "CCI",
    component: CCI,
  },
  {
    path: "/BIAS",
    name: "BIAS",
    component: BIAS,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
