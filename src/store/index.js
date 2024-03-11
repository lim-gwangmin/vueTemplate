import { createStore } from 'vuex';
import { signIn } from './signIn';
import { accessPopup } from './accessPopup';
import { dateSelectPopup } from './dateSelectPopup';
import { beaconPopup } from './beaconPopup';
import { stdnt } from "./stdnt";
import { profsr } from './profsr';
import { common } from './common';

const store = createStore({
    modules: {
        signIn,
        accessPopup,
        beaconPopup,
        dateSelectPopup,
        stdnt,
        profsr,
        common
    }
})

export default store;
