import { alertController, toastController } from '@ionic/vue';

export const alertMsg = async (message) => {
    const alert = await alertController.create({
        message: message,
        buttons: ['확인'],
        mode: 'ios'
    });

    alert.present();

    return alert.onWillDismiss();
}

export const confirmMsg = async (message) => {
    const alertButtons = [
        {
            text: '취소',
            role: 'cancel',
        },
        {
            text: '확인',
            role: 'confirm',
        },
    ];

    const alert = await alertController.create({
        message: message,
        buttons: alertButtons,
        mode: 'ios'
    });

    alert.present();

    return alert.onWillDismiss();
}

export const toastMsg = async (message) => {
    const toast = await toastController.create({
        message,
        duration: 1000,
        mode: 'md'
    })

    toast.present();
}
