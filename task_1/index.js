import { encoded, translations } from './data.js';

function decodeData(encoded, translations) {
    // Создаем множество для хранения уникальных id
    let uniqueIds = new Set();
    
    // Проходим по каждому объекту в переменной _encoded_
    const decoded = encoded.map(obj => {
        // Создаем новый объект для хранения расшифрованных данных
        let decodedObj = {};
        for (const key in obj) {
            // Проверяем, есть ли суффикс 'id' в ключе исключая нужные ключи
            if (key.endsWith('id') && !['_groupId', '_service', '_formatSize', '_ca'].includes(key)) {
                const decodedKey = key.replace('id', '');
                // Расшифровываем значение ключа, используя словарь translations
                decodedObj[decodedKey] = translations[obj[key]];
                // Добавляем расшифрованное id в множество уникальных id
                uniqueIds.add(obj[key]);
            } else {
                // Если ключ не требует расшифровки, оставляем его в изначальном виде
                decodedObj[key] = obj[key];
            }
        }
        return decodedObj;
    });

    return { decoded, uniqueIds: Array.from(uniqueIds) };
}

// Вызываем функцию и выводим результат
const { decoded, uniqueIds } = decodeData(encoded, translations);
console.log(decoded);
console.log("Unique ids:", uniqueIds);
