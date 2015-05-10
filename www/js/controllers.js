/*global angular*/
(function withAngular(angular) {
  'use strict';

  angular.module('bitNFC.controllers', [])
  .controller('DebugCtrl', ['$rootScope', '$scope',
    function DebugCtrlController($rootScope, $scope) {

      $scope.nfcEmpty = function TriggerNfcEmpty() {

        $rootScope.$emit('nfc:status-empty');
      };

      $scope.nfcMessage = function TriggerNfcMessage() {

        $rootScope.$emit('nfc:status-message');
      };
  }])
  .controller('HomeCtrl', ['$rootScope', '$scope', 'BitCoin',
    function HomeCtrlController($rootScope, $scope, BitCoin) {

      var onBitcoinBalance;

      $scope.publicAddress = BitCoin.address;
      BitCoin.balance; // should be a method (used also in sendctrl)
      onBitcoinBalance = $rootScope.$on('bitcoin:balance', function OnBitcoinBalanceEvent(eventInfo, balance){

        $scope.balance = balance;
      });

      $scope.$on('$destroy', function () {

        onBitcoinBalance();
      });
  }])
  .controller('SettingsCtrl', ['$scope', 'BitCoin', 'BlockChain',
    function SettingsCtrlController($scope, BitCoin, BlockChain) {

      $scope.bitcoin = BitCoin;
      $scope.blockchain = BlockChain;
  }])
  .controller('ReceiveCtrl', ['$scope', 'BitCoin',
    function ReceiveCtrlController($scope, BitCoin) {

      $scope.publicAddress = BitCoin.address;
  }])
  .controller('SendCtrl', ['$scope', '$stateParams',
    function SendCtrlController($scope, $stateParams) {

    $scope.toAddress = '1antani';

    if ($stateParams &&
      $stateParams.privateKey) {

      $scope.privateKey = $stateParams.privateKey;
      $scope.$emit('nfc:write-tag', {
        'txt': $scope.privateKey
      });
    }

    // balance
    BitCoin.balance;
    onBitcoinBalance = $rootScope.$on('bitcoin:balance', function OnBitcoinBalanceEvent(eventInfo, balance){

      $scope.balance = balance;
    });

    $scope.$on('$destroy', function () {

      onBitcoinBalance();
    });
  }])
  .controller('SweepCtrl', ['$scope', '$stateParams',
    function SweepCtrlController($scope, $stateParams) {

      $scope.params = $stateParams;

  }]);
}(angular));
