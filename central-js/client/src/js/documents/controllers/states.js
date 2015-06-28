import angularAMD from 'angularAMD';

    angularAMD.controller('DocumentsController', ['$state', '$scope', 'config', 'BankIDService', function ($state, $scope, config, BankIDService) {
        $scope.config = config;

        $scope.loading = false;
        BankIDService.isLoggedIn().then(function () {
            if ($state.is('documents')) {
                $scope.loading = true;
                return $state.go('documents.content').finally(function () {
                    $scope.loading = false;
                });
            }
        }).catch(function () {
            if ($state.is('documents')) {
                return $state.go('documents.bankid');
            }
        });

    }]);

    angularAMD.controller('DocumentsBankIdController', function ($scope, $state, $location, $window, BankIDService) {
        $scope.authProcess = false;

        $scope.loginWithBankId = function () {
            var stateForRedirect = $state.href('documents.bankid', {});
            var redirectURI = $location.protocol() + '://' + $location.host() + ':' + $location.port() + stateForRedirect;
            //$window.location.href = 'https://bankid.org.ua/DataAccessService/das/authorize?response_type=code&client_id=9b0e5c63-9fcb-4b11-84ff-31fc2cea8801&redirect_uri=' + redirectURI;
            $window.location.href = $scope.config.sProtocol_AccessService_BankID + '://' + $scope.config.sHost_AccessService_BankID + '/DataAccessService/das/authorize?response_type=code&client_id=' + $scope.config.client_id + '&redirect_uri=' + redirectURI;
        }

        if ($state.is('documents.bankid')) {
            if (!!$state.params.code) {
                $scope.authProcess = true;
                return $state.go('documents.content', {code: $state.params.code});
            } else {
                return BankIDService.isLoggedIn().then(function () {
                    $scope.authProcess = true;
                    return $state.go('documents.content', {code: $state.params.code});
                });
            }
        }
    });

    angularAMD.controller('DocumentsContentController',
        function ($scope, $state, documents, FileFactory, ServiceService, $modal) {
            var file = new FileFactory();
            $scope.file = file;

            angular.forEach(documents, function (item) {
                if (item.oDate_Upload === null) {
                    item.oDate_Upload = new Date();
                }
            });
            $scope.documents = documents;
            $scope.sTelephone = '+380';
            $scope.nDaysOptions = [{day: 1, title: '1 день'}, {day: 7, title: '1 тиждень'}, {day: 365, title: '1 рік'}];
            $scope.nDays = $scope.nDaysOptions[1];

            $scope.shareLink = function (document, sFIO, sTelephone, sMail, nDays) {
                ServiceService.shareLink($state.nID_Subject, document.nID, sFIO,
                    getTelephone(sTelephone), sMail, getDaysInMilliseconds(nDays))
                    .then(showConfirmationModal);
            };

            function getTelephone(sTelephone) {
                if (sTelephone == '+380') {
                    return ' '
                }
                return sTelephone;
            }

            function getDaysInMilliseconds(nDays) {
                if (isNaN(nDays.day * 86400000)) {
                    return 7 * 86400000;
                }
                return nDays * 86400000;
            }

            function showConfirmationModal(reply) {
                if (reply.code) {
                    showShareLinkError(reply);
                    return;
                }
                showShareLinkSuccess(reply);
            }

            function showShareLinkSuccess(reply) {
                $modal.open({
                    animation: true,
                    templateUrl: 'urlmodal.html',
                    controller: 'ModalController',
                    size: '',
                    resolve: {
                        url: function () {
                            return reply.value
                        }
                    }
                });
            }

            function showShareLinkError(reply) {
                switch (reply.code) {
                    case 'BUSINESS_ERR':
                        alert("Сталася помилка\n" + reply.code + ': ' + reply.message);
                        break;
                    default:
                        alert("Сталася помилка\n" + reply.code + ': ' + reply.message);
                }
            }
        });

    angularAMD.controller('ModalController',
        function ($scope, $modalInstance, url) {
            $scope.url = url;

            $scope.close = function () {
                $modalInstance.close();
            };
        });
