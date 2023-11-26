import moment from 'moment';
let getGrowthPercentage = () => {};

export default (stats, timeframe = '7_days') => {
	let userChartData = null;
	let viewChartData = null;
	let maxViewsCount;
	let maxReferralCount;
	let maxCountryCount;

	let userGrowth;

	if (!stats.totalUsersCount && !stats.prevUsersCount) {
		userGrowth = 0;
	} else if (stats.totalUsersCount === 0) {
		userGrowth = -100;
	} else if (stats.prevUsersCount === 0) {
		userGrowth = 100;
	} else {
		userGrowth = parseInt((stats.totalUsersCount / stats.prevUsersCount - 1) * 100);
	}

	maxViewsCount = stats.pageStats[0]?.count;
	maxReferralCount = stats.referralStats[0]?.count;
	maxCountryCount = stats.userCountryStats[0]?.count;

	let dateFrom;
	let unitToAdd;
	let dateLabelFormat = 'yyyy-MM-DD';

	if (timeframe === '7_days') {
		dateFrom = moment().subtract(7, 'days');
		unitToAdd = 'day';
		dateLabelFormat = 'yyyy-MM-DD';
	} else if (timeframe === '24_hours') {
		dateFrom = moment().subtract(24, 'hours');
		unitToAdd = 'hour';
		dateLabelFormat = 'DD-HH';
	}

	let now = moment().add(1, 'hour');

	userChartData = {};
	viewChartData = {};

	while (dateFrom < now) {
		let dateLabel = dateFrom.format(dateLabelFormat);

		userChartData[dateLabel] = stats.userStats.find((s) => s.date === dateLabel)?.count || 0;
		viewChartData[dateLabel] = stats.viewStats?.find((s) => s.date === dateLabel)?.count || 0;
		dateFrom.add(1, unitToAdd);
	}

	return {
		userChartData,
		viewChartData,
		maxViewsCount,
		maxReferralCount,
		maxCountryCount,
		userGrowth
	};
};
