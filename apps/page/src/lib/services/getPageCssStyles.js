import { darken, lighten } from 'lib/helpers/color';

let fontPairs = [
	{ title: 'Inter', text: 'Inter' },
	{ title: 'Calistoga', text: 'IBM Plex Sans' },
	{ title: 'Chillax', text: 'Gilroy' },
	{ title: 'Fraunces', text: 'Poppins' },
	{ title: 'Syne', text: 'Syne' },
	{ title: 'Quattrocento', text: 'Questrial' },
	{ title: 'Albert Sans', text: 'Barlow' }
];

export default (page) => {
	console.log('cssstyles', page.theme);

	if (page.parentPage && !page.theme.isOverride) {
		page.theme = page.parentPage?.theme;
	}
	let styles = {
		'container-width': page.theme?.containerWidth || '1280px',
		'logo-font': page.theme?.logoFont || 'monospace',
		'title-font': page.theme?.titleFont || fontPairs[0].title,
		'subtitle-font': page.theme?.subtitleFont || page.theme?.textFont || page.theme?.titleFont,
		'title-line-height': '1.0',
		'button-radius': page.theme?.buttonRadius || '24px',
		'text-font': page.theme?.textFont || fontPairs[0].text,
		'text-font-size': '18px',
		'text-line-height': 1.55,
		'background-color': page.theme?.backgroundColor || '#ffffff',
		// 'background-color': 'transparent',
		'border-color': page.theme?.theme === 'dark' ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)',
		'text-color': page.theme.theme === 'light' ? '#111111' : '#f5f5f5',
		'accent-color': page.theme?.accentColor || '#000',
		'section-background-color':
			page.theme?.sectionBackgroundColor ||
			(page.theme?.theme === 'dark'
				? darken(page.theme?.accentColor, 0.993)
				: lighten(page.theme?.accentColor, 0.82)),

		'section-description-text-color':
			page.theme?.theme === 'dark' ? 'rgb(229 231 235)' : 'rgba(4, 4, 4, 1)',

		'section-title-font-size': page.theme?.containerWidth ? '20px' : '24px',
		'section-title-line-height': page.theme?.containerWidth ? '1.6' : '1.3',

		'input-background': page.theme?.inputBackground || 'transparent',
		'input-color': page.theme?.inputColor || page.theme?.textColor || '#111',
		'button-color': page.theme?.buttonColor || '#fff',
		'input-container-border-width': page.theme?.isInputBorder ? '0px' : '1px 1px 1px 1px',
		'input-border-width': page.theme?.isInputBorder ? '0px 0px 1px 0px' : '0px'
	};
	styles['accent-color-darker'] = darken(styles['accent-color'], 0.6);
	styles['accent-color-darker-lg'] = darken(styles['accent-color'], 0.8);
	styles['accent-color-darker-xl'] = darken(styles['accent-color'], 0.9);
	styles['accent-color-darker-3xl'] = darken(styles['accent-color'], 0.99);
	styles['accent-color-lighter'] = lighten(styles['accent-color'], 0.6);

	let cssVarStyles = Object.entries(styles)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');

	return { cssVarStyles, styles };
};
