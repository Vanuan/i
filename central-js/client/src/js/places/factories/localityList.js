import angularAMD from 'angularAMD';

import 'js/components/typeahead/directives/typeaheadEmpty';
import 'js/components/typeahead/factories/typeahead';
import 'js/components/dropdown/factories/dropdown';

    angularAMD.factory('LocalityListFactory', ['$http', 'TypeaheadFactory', 'DropdownFactory', 'PlacesService', function ($http, TypeaheadFactory, DropdownFactory, PlacesService) {
		var localityList = function() {
			this.typeahead = new TypeaheadFactory();
			this.dropdown = new DropdownFactory();
		};
		
		localityList.prototype.initialize = function(list) {
			this.typeahead.initialize(list);
			this.dropdown.initialize(list);
		};
		
		localityList.prototype.select = function($item, $model, $label) {
			this.typeahead.select($item, $model, $label);
			this.dropdown.select($item);
		};
		
		localityList.prototype.load = function(service, region, search) {
			var self = this;
			var data = {
				sFind: search
			};
			return this.typeahead.load('./api/places/region/' + region + '/cities', search, data).then(function(cities) {
				var aServiceData = service.aServiceData;
				angular.forEach(cities, function(oCity) {
					var color = 'red';
					angular.forEach(aServiceData, function(oServiceData) {
						if(oServiceData.hasOwnProperty('nID_City') == false) {
							return;
						}
						if(oServiceData.nID_City.nID == oCity.nID) {
							color = 'green';
						}
					})
					oCity.color = color;
				});
				return cities;
			}).then(function(cities) {
				self.typeahead.list = cities;
				self.dropdown.list = cities;
				return cities;
			});
		};
		
		localityList.prototype.reset = function() {
			this.typeahead.reset();
			this.dropdown.reset();
		};
		
		return localityList;
    }]);
