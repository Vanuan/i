import angularAMD from 'angularAMD';

import 'js/components/typeahead/directives/typeaheadEmpty';
import 'js/components/typeahead/factories/typeahead';
import 'js/components/dropdown/factories/dropdown';

    angularAMD.factory('RegionListFactory', ['$http', 'TypeaheadFactory', 'DropdownFactory', 'PlacesService', function ($http, TypeaheadFactory, DropdownFactory, PlacesService) {
		var regionList = function() {
			this.typeahead = new TypeaheadFactory();
			this.dropdown = new DropdownFactory();
		};
		
		regionList.prototype.initialize = function(list) {
			this.typeahead.initialize(list);
			this.dropdown.initialize(list);
		};
		
		regionList.prototype.select = function($item, $model, $label) {
			this.typeahead.select($item, $model, $label);
			this.dropdown.select($item);
		};
		
		regionList.prototype.load = function(service, search) {
			var self = this;
			var data = {
				sFind: search
			};
			return this.typeahead.load('./api/places/regions', search, data).then(function(regions) {
				var aServiceData = service.aServiceData;
				
				angular.forEach(regions, function(region) {
					var color = 'red';
					angular.forEach(aServiceData, function(oServiceData) {
						if(oServiceData.hasOwnProperty('nID_Region')) {
							var oRegion = oServiceData.nID_Region;
							if(oRegion.nID == region.nID) {
								color = 'green';
							}
							return;
						}
						if(oServiceData.hasOwnProperty('nID_City')) {
							var oCity = oServiceData.nID_City;
							var oRegion = oCity.nID_Region;
							if(oRegion.nID == region.nID) {
								color = 'green';
							}
							return;
						}
					});
					region.color = color;
				});
				
				return regions;
			}).then(function(regions) {
				self.typeahead.list = regions;
				self.dropdown.list = regions;
				return regions;
			});
		};
		
		regionList.prototype.reset = function() {
			this.typeahead.reset();
			this.dropdown.reset();
		};
		
		return regionList;
    }]);
