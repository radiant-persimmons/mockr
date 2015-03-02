;(function() {

  angular
    .module('app.controllers.AnalyticsController', [])
    .controller('AnalyticsController', AnalyticsController);
  
  /* @ngInject */
  function AnalyticsController($scope, $stateParams, user, routes) {
    var vm = this;

  
    // form info regarding this route
    vm.formInfo = {
      route: $stateParams.route,
      methodKeys: [],
      methods: {},
      data: [],
      persistence: false,
      businessLogic: ''
    };

    vm.sortType     = 'id'; // set the default sort type
    vm.sortReverse  = false;  // set the default sort order
    vm.searchData   = '';     // set the default search/filter term
  

    vm.tableHead = vm.formInfo.data[0];
    vm.prepareData = prepareData;
    vm.analytics = {};

    activate();


    function activate() {
      // getRoute();
      getRoute().then(function() {
        console.log('route received');
        var data = prepareData();
        renderChart(data);
      });
    }

    function getRoute() {
      return routes.getRoute(vm.formInfo.route)
        .then(function(res) {
          /**
           * The endpoint DB model stores response, headers, status, etc., all
           * on the `methods` property. Here we're separating out method keys from
           * the body for the sake of ng-repeat in view.
           */
          vm.formInfo.methods = res.methods;
          vm.formInfo.persistence = res.persistence;
          vm.formInfo.data = res.data;
          vm.formInfo.methodKeys = Object.keys(vm.formInfo.methods);
          vm.formInfo.businessLogic = res.businessLogic;
          vm.tableHead = vm.formInfo.data[0];
          if(res.analytics) {
            vm.analytics = res.analytics;
          }
          console.log('analytics data from db' , res.analytics);
          return;
        }).catch(function(err) {
          console.error('error fetching route', vm.formInfo.route);
          console.error('Message:', err);
        });
    }

    function prepareData() {
      var position = {
        'GET': 0,
        'POST': 1,
        'PUT': 2,
        'DELETE': 3
      };

      var defaultValues = {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0,
        '6': 0,
        '7': 0
      }; 
      
      var methods = ['GET', 'POST', 'PUT', 'DELETE'];

      for(var i = 0; i < methods.length; i++) { 
        var method = methods[i];
        if(!vm.analytics[method]) {
          vm.analytics[method] = defaultValues;
        }
      }

      var data = [];
      for(var currentMethod in vm.analytics) {
        var days = vm.analytics[currentMethod];
        var dataforMethod = [];
        dataforMethod[0] = currentMethod;
        for(var day in days) {
          var calls = days[day];
          dataforMethod[day] = days[day];
        }
        _.defaults(dataforMethod, defaultValues);
        var positionforMethod = position[currentMethod];
        data[positionforMethod] = dataforMethod;
      }

      return data;
    }

    function renderChart(data) {
      //var data = vm.prepareData();
      console.log('data from renderChart', data); 

      var chart = c3.generate({
        bindTo: '#chart',
        size: {
          width: 450,
          height: 300
        },
        color: {
          pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728']
        },
        data: {
          columns: data
          //type : '  ',
          //onclick: function (d, i) { console.log("onclick", d, i); },
          //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        axis: {
          y: {
            label: { // ADD
              text: 'API calls',
              position: 'outer-middle'
            }
          },
          x: {
            label: { // ADD
              text: 'Day',
              position: 'middle'
            }
          }
        } 
      });
    }


  }
}).call(this);