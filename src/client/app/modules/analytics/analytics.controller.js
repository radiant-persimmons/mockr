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
          
          vm.formInfo.data = res.data;
          vm.tableHead = vm.formInfo.data[0];
          if(res.analytics) {
            vm.analytics = res.analytics;
          }
          return;
        }).catch(function(err) {
          console.error('error fetching route', vm.formInfo.route);
          console.error('Message:', err);
        });
    }

    function prepareData() {

      //Position object is for inserting the data in the order on C3
      var position = {
        'GET': 0,
        'POST': 1,
        'PUT': 2,
        'DELETE': 3
      };
      
      var methods = ['GET', 'POST', 'PUT', 'DELETE'];

      var data = [];
      for(var currentMethod in vm.analytics) {
        var days = vm.analytics[currentMethod];
        var dataforMethod = [];
        dataforMethod[0] = currentMethod;
        for(var day in days) {
          var calls = days[day];
          dataforMethod[day] = days[day];
        }
        var positionforMethod = position[currentMethod];
        data[positionforMethod] = dataforMethod;
      }

      var xAxis = ['days', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
      data.unshift(xAxis);

      return data;

    /**
     * Data will end up with this format
     * [ ['days', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'], ['GET', 0, 0, 0, 0, 0, 0, 0],
     *  ['POST', 0, 0, 0, 0, 0, 0, 0], ['PUT', 0, 0, 0, 0, 0, 0, 0], ['DELETE', 0, 0, 0, 0, 0, 0, 0] ] 
     */
    }

    function renderChart(data) {

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
          x: 'days',
          columns: data
        },
        axis: {
          y: {
            label: {
              text: 'API calls',
              position: 'outer-middle'
            }
          },
          x: {
            type: 'category',
            label: {
              text: 'Day',
              position: 'outer-middle'
            }
          }
        } 
      });
    }


  }
}).call(this);
