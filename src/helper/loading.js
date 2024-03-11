import { loadingController } from '@ionic/vue';

const presentLoading = async () => {
    const loading = await loadingController.create({ duration: { valueOf: 1000 }, mode: 'ios' });
    await loading.present();

    return loading;
}

const dismissLoading = async () => {
    await loadingController.dismiss();
}

const isLoading = async () => {
    return await loadingController.getTop().then(a => {
        if (a) {
            a.dismiss().then(() => console.log('loading dismissed'));
        }
    });
}

export { presentLoading, dismissLoading, isLoading }
