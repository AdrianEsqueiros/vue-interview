import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/ClientView";
import ClientComponent from "@/components/ClientComponent";
import EditClientComponent from "@/components/EditClientComponent";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/clients",
    name: "clients",
    component: ClientComponent,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: EditClientComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
