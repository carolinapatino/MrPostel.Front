import Vue from "vue";
import routeService from "../../services/routeService";

export default {
  namespaced: true,
  // -----------------------------------------------------------------
  state: {
    mapRoute: [],
    route: [],
  },
  // -----------------------------------------------------------------
  mutations: {
    setMapRoute(state: {}, route: {}) {
      Vue.set(state, "mapRoute", route);
    },
    setRoute(state: {}, route: {}) {
      Vue.set(state, "route", route);
    },
  },
  // -----------------------------------------------------------------
  actions: {
    sleep: async (context: any, ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    getRoute: async (context: any, trackingId: string) => {
      await routeService.getRoute(trackingId).then(async (response: any) => {
        const route = response.data;
        context.commit("setRoute", route);
        let latLon;
        for (let i = 0; i < route.length; i++) {
          latLon = await routeService.getLatLon(
            route[i].primaryline + ", " + route[i].city
          );
          route[i].latlon = latLon.data;
          await context.dispatch("sleep", 250);
        }
        context.commit(
          "setMapRoute",
          route.filter((x: undefined | []) => x !== undefined)
        );
      });
    },
  },
};
