;(function() {
  angular
    .module('app.controllers.DocsController', [])
    .controller('DocsController', DocsController);

    /**
    *
    *
    *
    *
    *
    * @ngInject
    */
    function DocsController() {
      var vm = this;
      vm.docList = [
        {name: 'Getting Started',path: 'start'},
        {name:'Adding an Endpoint',path: 'add'},
        {name:'Editing an Endpoint',path: 'edit'},
        {name:'Deleting an Endpoint',path: 'delete'},
        {name:'Using Mock Data',path: 'mock'},
        {name:'Using Persistant Data',path: 'persist'},
        {name:'Business Logic',path: 'business'}
      ];
    };
})();
