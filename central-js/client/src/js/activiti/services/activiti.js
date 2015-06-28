import angularAMD from 'angularAMD';

	angularAMD.service('ActivitiService', ['$http', function($http) {
		this.getForm = function(oServiceData, processDefinitionId) {
			//var url = oServiceData.sURL + oServiceData.oData.sPath + '?processDefinitionId=' + processDefinitionId;
                        //{sProcessDefinitionKeyWithVersion:sProcessDefinitionKeyWithVersion,sProcessDefinitionName:sProcessDefinitionName};
			var url = oServiceData.sURL + oServiceData.oData.sPath + '?processDefinitionId=' + processDefinitionId.sProcessDefinitionKeyWithVersion;
			var data = {
				'url': url
			};
			return $http.get('./api/process-form', {
				params: data,
				data: data
			}).then(function(response) {
				return response.data;
			});
		};

		this.submitForm = function(oServiceData, formData) {
			var url = oServiceData.sURL + oServiceData.oData.sPath;
			var data = {
				'url': url
			};
			return $http.post('./api/process-form', angular.extend(data, formData.getRequestObject()), {}).then(function(response) {
				return response.data;
			});
		};

		this.getUploadFileURL = function(oServiceData) {
			return './api/uploadfile?url=' + oServiceData.sURL + 'service/rest/file/upload_file_to_redis';
		}

		this.updateFileField = function(oServiceData, formData, propertyID, fileUUID) {
			formData.params[propertyID].value = fileUUID;
		}
	}]);
