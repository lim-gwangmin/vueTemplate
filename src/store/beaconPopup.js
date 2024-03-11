export const beaconPopup = {
   namespaced: true,
   state: {
      visible: false,
   },
   mutations: {
       showbeaconPopupToggle(state, showYn) {
           state.visible = showYn;
       },
   },
   getters: {}
};