import angularAMD from 'angularAMD';

    angularAMD.factory('ParameterFactory', function () {
        var parameter = function () {
            this.value = null;
        };
		
		parameter.prototype.get = function() {
			return this.value;
		};

        return parameter;
    });
