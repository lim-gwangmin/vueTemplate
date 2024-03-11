export const accessPopup = {
    namespaced: true,
    state: {
        showAccessPopup: false,
        showAlert: false,
        showCodePopup: false,
        showCodeAttPopup: false,
        msg: {},
        update: false
    },
    mutations: {
        showAccessPopup(state, showYn) {
            state.showAccessPopup = showYn;
        },
        showAlert(state, showYn) {
            state.showAlert = showYn;
        },
        showUntactCodePopup(state, showYn) {
            state.showCodePopup = showYn;
        },
        showCodeAttPopup(state, showYn) {
            state.showCodeAttPopup = showYn;
        },
        setAlertMsg(state, message) {
            state.msg = message;
        },
        updateData(state, data) {
            state.update = data;
        },
    },
    getters: {}
};