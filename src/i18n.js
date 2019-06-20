import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  en: {
    translation: {
      'English': 'English',
      // 'Patient ID': 'Patient ID'
    }
  },
  zh: {
    translation: {
      '中文': 'English',
      'Patient ID': '病人',
      'Gender': '性别',
      'Acute Cerebrovascular Lesion Side': '大脑可疑病灶侧',
      'Name': '姓名',
      'Scan time': '扫描时间',
      'Age': '年龄',
      'LEFT': '左',
      'RIGHT': '右',
      'Left': '左侧',
      'Right': '右侧',
      'Both': '双侧',
      'ASPECT Score': 'ASPECT 评分',
      'Confident Level': '置信区间',
      'HOUNSFIELD UNIT MEAN': 'HU 平均值',
      'ORIENTATION': '方向',
      'C'  : '尾状核 (C)',
      'IC'  : '内囊 (IC)',
      'L'  : '豆状核 (L)',
      'I'  : '岛叶皮质 (I)'
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;