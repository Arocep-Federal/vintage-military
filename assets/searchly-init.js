var searchly = new SEARCHLY();
searchly.init();
if (typeof searchlyConfig != 'undefined'
	&& typeof searchlyConfig.general != 'undefined'
	&& typeof searchlyConfig.general.isInitFilter != 'undefined'
	&& searchlyConfig.general.isInitFilter === true) {
	searchly.initFilter();
}
SEARCHLY.jQ(window).on('load', function(){
	searchly.initSearchBox();
	searchly.initAnalytics();
});
