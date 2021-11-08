import dotenv from 'dotenv';
dotenv.config();

// colores de https://tailwindcss.com/docs/customizing-colors
// el color principal cambiará si es un día especial
function getColor() {
    const date = new Date();
    const day = date.getUTCDay();
    const month = date.getUTCMonth();

    if (day == 1 && month == 1 ) {
        return '#F59E0B'; // Año nuevo
    }
    else if (day == 8 && month == 3 ) {
        return '#8B5CF6'; // dia de la mujer
    }
    else if (day == 19 && month == 10 ) {
        return '#F9A8D4'; // dia del cancer de mama
    }
    else if ((day > 12 && day <= 25) && month == 12 ) {
        return '#15803D'; // Navidad
    }
    else if (day == 31 && month == 10 ) {
        return '#EA580C'; // Halloween
    }
    else if (day == 21 && month == 6 ) {
        return '#FACC15'; // Verano
    }
    else if (day == 28 && month == 6 ) {
        return 'RANDOM'; // Día del orgullo gay
    }
    else if (day == 6 && month == 8 ) {
        return '#000000'; // Hiroshima
    }
    else if (day == 9 && month == 8 ) {
        return '#000000'; // Nagasaki
    }
    else if (day == 11 && month == 9 ) {
        return '#000000'; // 11 s
    }
    else if (day == 21 && month == 3 ) {
        return '#FF0000'; // ascenso del comunismo en rusia XD
    }
    else if (day == 12 && month == 10 ) {
        return '#EF4444'; // dia de la hispanidad xd
    }
    else if (day == 14 && month == 2 ) {
        return '#F472B6'; // San valentin
    }
    /*else if (day ==  && month ==  ) {
        return '';
    }
    else if (day ==  && month ==  ) {
        return '';
    }
    else if (day ==  && month ==  ) {
        return '';
    }*/
    // reservado para otros días que me haya acordado
    else {
        return '#60A5FA';
    }
    
}
export const config = {
    prefix: 'a.',
    dev: '685947556655923242',
    mongo: process.env.MONGO_URI,
    token: process.env.TOKEN,
}
export const color: any = {
    success: '#10B981',
    error: '#F43F5E',
    warning: '#F59E0B',
    info: '#1D4ED8',
    debug: '#1E40AF',
    default: getColor()
}
