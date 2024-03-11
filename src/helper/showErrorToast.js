import { Toast } from '@capacitor/toast';

export const showErrorToast = async () => {
    await Toast.show({
        text: "데이터를 호출하는데 오류가 발생했습니다.\n앱을 종료 후 재 실행 하거나, 앱을 업데이트 해주시기 바랍니다.",
        position: 'center',
        duration: 'long'
    });
};
