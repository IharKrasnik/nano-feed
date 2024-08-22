import { darken, lighten } from 'lib/helpers/color';

function hexToRGBA(hex, opacity = 1) {
	if (!hex) {
		hex = '#111111';
	}

	var c;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = '0x' + c.join('');
		return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${opacity})`;
	}
	throw new Error('Bad Hex');
}

export default (page) => {
	if (page.parentPage && !page.theme?.isOverride) {
		page.theme = page.parentPage?.theme;
	}

	let accentColor = page.theme?.accentColor || '#000';

	//1
	let styles = {
		'container-width': page.theme?.containerWidth || '1200px',
		'logo-font': page.theme?.logoFont || 'monospace',
		'title-font': page.theme?.titleFont || 'Inter',
		'subtitle-font':
			page.theme?.subtitleFont || page.theme?.textFont || page.theme?.titleFont || 'Inter',
		'title-line-height': '1.0',
		'button-radius': page.theme?.buttonRadius || '24px',
		'button-huge-radius': `${parseInt(page.theme?.buttonRadius?.replace('px', '') || '24') + 8}px`,
		'button-large-radius': `${parseInt(page.theme?.buttonRadius?.replace('px', '') || '24') + 4}px`,
		'text-font': page.theme?.textFont || 'Inter',
		'label-font': page.theme?.labelFont || 'Inter',
		'text-font-size': '18px',
		'text-line-height': 1.55,
		'background-color': page.theme?.backgroundColor || '#ffffff',
		'background-color-opposite': page.theme?.theme === 'dark' ? '#f6f5f4' : '#222222',
		'text-color-opposite': page.theme?.theme === 'dark' ? '#111111' : '#f6f5f4',
		'text-color-default': page.theme?.theme === 'dark' ? '#f6f5f4' : '#111111',
		// 'background-color-alternative':
		// 	page.theme?.theme === 'dark'
		// 		? hexToRGBA(lighten(page.theme?.backgroundColor, 0.5), 0.1)
		// 		: hexToRGBA(darken(page.theme?.backgroundColor, 0.5), 0.1),
		'background-color-alternative':
			page.theme?.theme === 'dark'
				? lighten(page.theme?.backgroundColor, 0.005)
				: darken(page.theme?.backgroundColor, 0.1),
		'background-color-alternative-stronger':
			page.theme?.theme === 'dark'
				? lighten(page.theme?.backgroundColor, 0.1)
				: darken(page.theme?.backgroundColor, 0.15),
		'border-color': page.theme.borderColor || (page.theme?.theme === 'dark' ? 'rgba(255,255,255,.1)' : '#00000014'),
		'text-color': page.theme?.textColor || (page.theme?.theme === 'dark' ? '#fbf5ec' : '#111111'),
		'accent-color': accentColor,
		'accent-color-darker': darken(accentColor, 0.5),
		'accent-color-lighter': lighten(accentColor, 0.5),
		'link-color': page.theme?.linkColor || accentColor,
		'section-item-background-color':
			page.theme?.sectionItemBackgroundColor ||
			(page.theme?.theme === 'dark' ? hexToRGBA('#161619', 0.85) : hexToRGBA('#f6f5f4', 0.85)),
		// (page.theme?.theme === 'dark'
		// 	? hexToRGBA(darken(page.theme?.accentColor, 0.993), 0.8)
		// 	: hexToRGBA(lighten(page.theme?.accentColor, 0.9), 0.5)),

		'section-description-text-color':
			page.theme?.textColor ? page.theme?.textColor : page.theme?.theme === 'dark' ? '#f6f5f4' : '#111111',
		'section-description-text-color-opposite':
			page.theme?.theme === 'dark' ? 'rgba(0,0,0, .7)' : 'rgba(255,255,255, .7)',
		'title-font-size':
			page.activeHero?.theme?.titleSize && page.activeHero?.theme?.titleSize !== 'normal'
				? page.activeHero?.theme?.titleSize === 'huge'
					? '72px'
					: '105px'
				: '48px',

		'section-title-font-size': page.theme?.containerWidth <= 900 ? '18px' : '20px',
		'section-title-line-height': '1.3',

		'input-background': page.theme?.inputBackground || 'var(--section-item-background-color)',
		'input-color': page.theme?.theme === 'dark' ? '#f6f5f4' : '#111111',
		'button-color': page.theme?.buttonColor || '#fff',
		'input-container-border-width': page.theme?.isInputBorder ? '0px' : '1px 1px 1px 1px',
		'input-border-width': page.theme?.isInputBorder ? '0px 0px 1px 0px' : '0px',

	};
	styles['accent-color-darker'] = darken(styles['accent-color'], 0.6);
	styles['accent-color-darker-lg'] = darken(styles['accent-color'], 0.8);
	styles['accent-color-darker-xl'] = darken(styles['accent-color'], 0.9);
	styles['accent-color-darker-3xl'] = darken(styles['accent-color'], 0.99);
	styles['accent-color-lighter'] = lighten(styles['accent-color'], 0.3);
	styles['accent-color-lighter-lg'] = lighten(styles['accent-color'], 0.6);

	let cssVarStyles = Object.entries(styles)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');

	return { cssVarStyles, styles };
};
