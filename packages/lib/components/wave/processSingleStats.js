import moment from 'moment';

export default (stats, timeframe = '7_days') => {
	let chartData = null;

	let growth;

	if (!stats.totalCount && !stats.prevTotalCount) {
		growth = 0;
	} else if (stats.totalCount === 0) {
		growth = -100;
	} else if (stats.totalCount === 0) {
		growth = 100;
	} else {
		growth = parseInt((stats.totalCount / stats.prevTotalCount - 1) * 100);
	}

	let dateFrom;
	let unitToAdd;
	let dateLabelFormat = 'yyyy-MM-DD';

	if (timeframe === '7_days') {
		dateFrom = moment().subtract(7, 'days');
		unitToAdd = 'day';
		dateLabelFormat = 'yyyy-MM-DD';
	} else if (timeframe === '30_days') {
		dateFrom = moment().subtract(30, 'days');
		unitToAdd = 'day';
		dateLabelFormat = 'yyyy-MM-DD';
	} else if (timeframe === '24_hours') {
		dateFrom = moment().subtract(24, 'hours');
		unitToAdd = 'hour';
		dateLabelFormat = 'DD-HH';
	}

	let now = moment().add(1, 'hour');

	chartData = {};

	while (dateFrom < now) {
		let dateLabel = dateFrom.format(dateLabelFormat);

		chartData[dateLabel] = stats.grouped.find((s) => s.date === dateLabel)?.count || 0;

		dateFrom.add(1, unitToAdd);
	}

	return {
		chartData
	};
};
