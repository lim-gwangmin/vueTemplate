const nowDate = new Date();

const resultDataFormat = _date => {
   const date = new Date(_date);
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two digits
   const day = String(date.getDate()).padStart(2, '0'); // Ensure two digits
   const dayOfWeek = `(${date.toLocaleString('ko', { weekday: 'long' }).substring(0, 1)})`;
   const dateNumber = `${year}.${month}.${day}`;
   const resultDateFormat = `${year}.${month}.${day}${dayOfWeek}`;

   return { date, dateNumber, resultDateFormat };
};

const { date, dateNumber, resultDateFormat } = resultDataFormat(nowDate);


export const dateSelectPopup = {
   namespaced: true,
   state: {
      showDateSelectPopup: false,
      date: date,
      dateNumber: dateNumber,
      format: resultDateFormat,
   },
   mutations: {
      showDateSelectPopup(state, showYn) {
         state.showDateSelectPopup = showYn;
      },
      dateSelectDone(state, newDate) {
         const { date, dateNumber, resultDateFormat } = resultDataFormat(newDate);

         state.date = date;
         state.dateNumber = dateNumber;
         state.format = resultDateFormat;
      },
      increaseDate(state) {
         const previousDate = new Date(state.date);
         previousDate.setDate(previousDate.getDate() + 1);
         
         const { date, dateNumber, resultDateFormat } = resultDataFormat(previousDate);

         state.date = date;
         state.dateNumber = dateNumber;
         state.format = resultDateFormat;
      },
      decreaseDate(state) {
         const nextDate = new Date(state.date);
         nextDate.setDate(nextDate.getDate() - 1);
         
         const { date, dateNumber, resultDateFormat } = resultDataFormat(nextDate);
         
         state.date = date;
         state.dateNumber = dateNumber;
         state.format = resultDateFormat;
      },
   },
   getters: {}
};
