import store from '../store/index';
import { nowDate } from '@/helper/nowDate';

export const auditDate = () => {
    const auditDate = {
        checkDate: '',
        yy: '',
    };

    if (store.state.signIn.isTestId) {
        auditDate.checkDate = '20210904';
        auditDate.yy = '2021';
    } else {
        auditDate.checkDate = nowDate().yearStr + nowDate().monthStr + nowDate().dateStr;
        // auditDate.checkDate = '20220618';
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month == '1' && day <= '20') {
            auditDate.yy = nowDate().yearStr - 1;
        } else {
            auditDate.yy = nowDate().yearStr
        }
    }

    auditDate.yy = new Date().getFullYear();

    return auditDate;
};
