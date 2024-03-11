export const attType = (value) => {
    const text = { 
      'ULS58.10': { text:'출석', status:'status1'}, 
      'ULS58.20': { text:'지각', status:'status2'}, 
      'ULS58.30': { text:'조퇴', status:'status3'}, 
      'ULS58.40': { text:'결석', status:'status4'}, 
      'ULS58.50': { text:'공결', status:'status6'}, 
      'ULS58.60': { text:'휴가', status:'status7'}, 
   };

    return text[value];
};
