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
	let styles = {
		'container-width': page.theme?.containerWidth || '1280px',
		'logo-font': page.theme?.logoFont || 'monospace',
		'title-font': page.theme?.titleFont || fontPairs[0].title,
		'subtitle-font': page.theme?.subtitleFont || page.theme?.titleFont,
		'title-font-size': page.theme?.isHugeTitle ? '72px' : '48px',
		'title-line-height': '1.0',
		'button-radius': page.theme?.buttonRadius || '24px',
		'text-font': page.theme?.textFont || fontPairs[0].text,
		'text-font-size': '18px',
		'text-line-height': 1.55,
		// 'background-color': page.theme?.backgroundColor || '#ffffff',
		'background-color': 'transparent',
		'text-color': page.theme?.textColor || '#111',
		'accent-color': page.theme?.accentColor || '#000',
		'section-background-color':
			page.theme?.sectionBackgroundColor || (page.theme?.theme === 'dark' ? '#1a1c28' : '#f6f5f4'),
		'section-description-text-color':
			page.theme?.theme === 'dark' ? 'rgb(229 231 235)' : 'rgba(4, 4, 4, 1)',

		'section-title-font-size': page.theme?.containerWidth ? '20px' : '24px',
		'section-title-line-height': page.theme?.containerWidth ? '1.6' : '1.3',

		'input-background': page.theme?.inputBackground || 'transparent',
		'input-color': page.theme?.inputColor || page.theme?.textColor || '#111',
		'button-color': page.theme?.buttonColor || '#fff'
	};

	let cssVarStyles = Object.entries(styles)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');

	return { cssVarStyles, styles };
};
