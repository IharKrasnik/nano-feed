import hexToRgba from 'lib/helpers/hexToRgba';

let defaultValues = {
  'backgroundColor': page => {
    getThemeValue(page, 'theme') === 'dark' ? '#000000' : '#ffffff'
  },
  'sectionItemBackgroundColor': page => {
    getThemeValue(page, 'theme') === 'dark' ? hexToRgba('#161619', 0.85)
      : hexToRgba('#f6f5f4', 0.85)

  }

}

export let getThemeValue = (page, key) => {

  if (!page.theme) {
    page.theme = {};
    if (page.parentPage && !page.parentPage.theme) {
      page.parentPage.theme = {};
    }
  }


  let value = page.theme[key] || page.parentPage?.theme[key];

  if (!value) {
    return defaultValues[key] ? defaultValues[key](page) : undefined;
  } else {
    return value;
  }
}


