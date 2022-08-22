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

export const convertNumberToThai = (numberMonth) =>{
    return numberMonth === 1 ? 'มกราคม': numberMonth === 2? 'กุมภาพันธ์':
    numberMonth === 3? 'มีนาคม': numberMonth === 4?'เมษายน': numberMonth === 5? 'พฤษภาคม':
    numberMonth === 6? 'มิถุนายน': numberMonth === 7?'กรกฎาคม': numberMonth === 8? 'สิงหาคม':
    numberMonth === 9? 'กันยายน': numberMonth === 10?'Oct': numberMonth === 11? 'พฤษจิกายน':
    numberMonth === 12? 'ธันวาคม': ''
}

export class convertTZ {

    static getFullDate(date){

        const local_date = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: "Asia/Jakarta"}));   
        return `${local_date.getFullYear()}-${local_date.getMonth()+1}-${local_date.getDate()} ${local_date.getHours()}:${local_date.getMinutes()}:${local_date.getSeconds()}`
    }
}
