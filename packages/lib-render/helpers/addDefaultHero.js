import { v4 as uuidv4 } from 'uuid';

export default (page) => {
	page.heros = [
		{
			id: uuidv4(),
			isHidden: false,
			renderType: 'default',

			title: page.title,
			subtitle: page.subtitle,
			demoUrl: page.demoUrl,

			interactiveRenderType:
				page.interactiveRenderType || (page.isCollectEmails ? 'email' : 'link'),

			callToActionText: page.callToAction,
			ctaExplainer: page.ctaExplainer || '',

			url: page.url,
			actionUrl: page.actionUrl,

			url2: page.url2,
			isUrl2Link: page.isUrl2Link,

			bgImageUrl: page.theme?.heroBgImage,

			theme: {
				isLeft: page.theme?.isHeroLeft,
				isVertical: page.theme?.isHeroVertical,
				isHuge: page.theme?.isHugeTitle
			}
		}
	];

	if (page.sections) {
		page.sections = page.sections.map((s) => {
			if (s.items) {
				s.items = s.items.map((i) => {
					if (i.url) {
						i.interactiveRenderType = 'link';
					}
					return i;
				});
			}

			return s;
		});
	}

	if (page.theme) {
		page.theme.isHidePageName = false;
	}
};
