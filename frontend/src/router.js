import { createRouter, createWebHistory } from "vue-router"
import EditNote from "./views/EditNote.vue"
import NewNote from "./views/NewNote.vue"
import ListNote from "./views/ListNote.vue"
import LoginOauth from "./views/LoginOauth.vue"
import MiddlewareNote from "./middleware/MiddlewareNote.vue"
import NotFound from "./middleware/NotFound.vue"

const routes = [
  { path: "/", component: LoginOauth },
  {
    path: "/app",
    component: MiddlewareNote,
    children: [
      {
        path: "/app",
        component: ListNote,
      },
      {
        path: "/app/new",
        component: NewNote
      },
      {
        path: "/app/:uid/edit",
        component: EditNote
      }
    ]
  },
  { path: "/:pathMatch(.*)*", component: NotFound },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router