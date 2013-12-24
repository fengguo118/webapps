window.app.directive('bindkeystring',function () {
  return {
    scope: {
      refobj: "=",
      key: "@keystring"
    },
    transclude: true,
    replace: true,
    // template: '<input class="input-xlarge" ng-model="entity.level">',
    // compile:function(tElement, tAttrs, transclude) {
    // 	console.log('compile====\n', tAttrs)
    // 	console.log(this.scope)
    // 	// console.log('after====',attrs.ngModel, attrs.keystring)
    // },
    link: function (scope, element, attrs) {
      // console.log("link== \n", attrs, scope)
      var v = scope.refobj;
      var keys = scope.key.split('.')
      keys.forEach(function (k) {
        v = v[k]
      })
      attrs.$set('ngModel', "entity[" + scope.key + "]")
      // attrs.$set('value', v)
    }
  }
}).directive('uiBlur', function () {
  return function (scope, elem, attrs) {
    elem.bind('blur', function () {
      scope.$apply(attrs.uiBlur);
    });
  };
});