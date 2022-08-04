export const convertShortMonthEngToLongThai = (strDate) =>{
    return strDate === 'Jan' ? 'มกราคม': strDate === 'Feb'? 'กุมภาพันธ์':
    strDate === 'Mar'? 'มีนาคม': strDate === 'Apr'?'เมษายน': strDate === 'May'? 'พฤษภาคม':
    strDate === 'Jun'? 'มิถุนายน': strDate === 'Jul'?'กรกฎาคม': strDate === 'Aug'? 'สิงหาคม':
    strDate === 'Sep'? 'กันยายน': strDate === 'Oct'?'ตุลาคม': strDate === 'Nov'? 'พฤษจิกายน':
    strDate === 'Dec'? 'ธันวาคม': ''
}

export const convertShortMonthEngToLongEng = (strDate) =>{
    return strDate === 'Jan' ? 'January': strDate === 'Feb'? 'February':
    strDate === 'Mar'? 'March': strDate === 'Apr'?'April': strDate === 'May'? 'May':
    strDate === 'Jun'? 'June': strDate === 'Jul'?'July': strDate === 'Aug'? 'August':
    strDate === 'Sep'? 'September': strDate === 'Oct'?'October': strDate === 'Nov'? 'November':
    strDate === 'Dec'? 'December': ''
}

export const convertNumberToLongEng = (numberMonth) =>{
    return numberMonth === 1 ? 'January': numberMonth === 2? 'February':
    numberMonth === 3? 'March': numberMonth === 4?'April': numberMonth === 5? 'May':
    numberMonth === 6? 'June': numberMonth === 7?'July': numberMonth === 8? 'August':
    numberMonth === 9? 'September': numberMonth === 10?'October': numberMonth === 11? 'November':
    numberMonth === 12? 'December': ''
}