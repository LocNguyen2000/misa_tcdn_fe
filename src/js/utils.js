// HÀM TIỆN ÍCH
import currency from "currency.js";
/**
* Mô tả : format lại dữ liệu date trong danh sách nhân viên
* @param value: dữ liệu dạng Date
* @return dữ liệu date được format
* Created by: Nguyễn Hữu Lộc - MF1099
* Created date: 20:51 18/04/2022
*/
export function formatDate(value) {
  try {
    if (value) {
      let dateOfBirth = new Date(value);

      let date = dateOfBirth.getDate();
      let month = dateOfBirth.getMonth() + 1;
      let year = dateOfBirth.getFullYear();

      date = date < 10 ? `0${date}` : date;
      month = month < 10 ? `0${month}` : month;

      value = `${date}/${month}/${year}`;
    } else value = "";
    return value;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}
/**
* Mô tả : So sánh giữa 2 object với nhau
* @return true: nếu giống nhau | false: nếu khác nhau
* Created by: Nguyễn Hữu Lộc - MF1099
* Created date: 13:42 26/04/2022
*/
export function isMatch(object, compareObject) {
  const isSameObject = (JSON.stringify(object) === JSON.stringify(compareObject));

  console.log(isSameObject);
  return isSameObject;
}

/**
* Mô tả : format lại dữ liệu date trong Form
* @param value: dữ liệu dạng Date
* @return dữ liệu date được format để trong form
* Created by: Nguyễn Hữu Lộc - MF1099
* Created date: 20:51 18/04/2022
*/
export function formatDateInForm(value) {
  try {
    if (value) {
      let dateOfBirth = new Date(value);

      let date = dateOfBirth.getDate();
      let month = dateOfBirth.getMonth() + 1;
      let year = dateOfBirth.getFullYear();

      date = date < 10 ? `0${date}` : date;
      month = month < 10 ? `0${month}` : month;

      value = `${year}-${month}-${date}`;
    } else value = "";
    return value;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}
/**
* Mô tả : Validate dữ liệu email
* Created by: Nguyễn Hữu Lộc - MF1099
* Created date: 08:44 02/04/2022
*/
export function isValidateEmail(email) {
  try {
    if (email) {
      let isValidateMail = String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      if (isValidateMail)
        return true
      return false
    }
    return false
  } catch (error) {
    console.error(error);
  }
}

export function mapData(value, key, mapKey, data) {
  let res = data.filter((item) => {
    return item[key] == value
  })

  if (res.length <= 0) return;

  let mapValue = res[0][mapKey]
  return mapValue
}

export function removeEmptyObject(arr) {
  const result = arr.filter(element => {
    if (Object.keys(element).length !== 0) {
      return true;
    }

    return false;
  });

  return result
}

export function formatDataInTable(value, type) {
  switch (type) {
    case "date": {
      if (!value) return "";

      let dateOfBirth = new Date(value);

      let date = dateOfBirth.getDate();
      let month = dateOfBirth.getMonth() + 1;
      let year = dateOfBirth.getFullYear();

      date = date < 10 ? `0${date}` : date;
      month = month < 10 ? `0${month}` : month;

      value = `${date}/${month}/${year}`;
      break;
    }
    case "money": {
      value = currency(value, { symbol: '', separator: '.', decimal: ',', precision: 1 }).format()
    }
  }
  return value;
}

export function toCamelCase(text) {
  let result = text.replace(/\W+(.)/g, function (match, chr) {
    return chr.toUpperCase();
  });

  return result
}

export function isNumeric(value) {
  var regexDouble = /^(\d*)([,]\d{0,1})?$/;
  if (regexDouble.test(value)) return true
  else return false
}

export function isNumber(value) {
  var regex = /^(\d*)?$/;
  if (regex.test(value)) return true
  else return false
}

export function formatNumber(value) {
  try {
    if (!value) return 0;
    let result = Intl.NumberFormat("vi-VN").format(value);
    return result;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
