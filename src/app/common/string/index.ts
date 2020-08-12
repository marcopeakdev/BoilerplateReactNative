import equals from 'react-fast-compare';
export const onChangeAlias = (value: string | number): string => {
  var str = value + '';
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  return str;
};
export const padStart = (value: any, maxPad = 2, stringPad = '0') => {
  const stringP = Array(maxPad).fill(stringPad).join('');
  return String(stringP + value).slice(-maxPad);
};
export const padEnd = (value: any, maxPad = 2, stringPad = '0') => {
  const stringP = Array(maxPad).fill(stringPad).join('');
  return String(value + stringP).slice(0, maxPad);
};
export const replaceAll = (source = '', textReplace = '', textInstead = '') => {
  return source.split(textReplace).join(textInstead);
};
export const removeHtmlTag = (source = '') => {
  return source.replace(/<\/?[^>]+(>|$)/g, '');
};
export const compareValue = (val1: any, val2: any) => {
  return equals(val1, val2);
};
export const removeChar = (source = '') => {
  return source.replace(/[^0-9]/g, '');
};
export const trimArray = (sourceArr: Array<unknown> = []): Array<unknown> => {
  const newArr = sourceArr.map((element: any) => {
    if (Array.isArray(element)) {
      return trimArray(element);
    }
    switch (typeof element) {
      case 'string':
        return element.trim();
      case 'object':
        return trimObject(element);
      default:
        return element;
    }
  });
  return newArr;
};

export const trimObject = (source: any) => {
  if (!source) {
    return source;
  }
  let newObject = source;
  Object.keys(newObject).forEach((key: string) => {
    if (Array.isArray(newObject[key])) {
      newObject[key] = trimArray(newObject[key]);
    }
    if (typeof newObject[key] === 'string') {
      newObject[key] = newObject[key].trim();
    }
    if (typeof newObject[key] === 'object') {
      newObject[key] = trimObject(newObject[key]);
    }
  });
  return newObject;
};
export const toFullWidth = (value: any) => {
  return (
    value +
    ''.replace(/[A-Za-z0-9]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) + 0xfee0);
    })
  );
};
interface ResultHandleTagToArrayText {
  text: string;
  bold: boolean;
}
export const onHandleTagToArrayText = (
  source = '',
  char = '#',
): Array<ResultHandleTagToArrayText> => {
  const textSplit = source.split(' ');
  const arrText: ResultHandleTagToArrayText[] = [];
  textSplit.forEach((text: string, i: number) => {
    const textData = {text: text, bold: false};
    if (text[0] === char) {
      textData.bold = true;
      arrText.push(textData);
    } else {
      arrText.push({text: text, bold: false});
    }
    if (
      (text === '' && i !== textSplit.length - 1) ||
      i !== textSplit.length - 1
    ) {
      arrText.push({text: ' ', bold: false});
    }
  });
  return arrText;
};
