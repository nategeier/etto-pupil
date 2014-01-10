
angular.module("ettoPupil")
  .directive('yaTree', function () {

   return {
    restrict: 'A',
    transclude: 'element',
    priority: 1000,
    terminal: true,
    compile: function (tElement, tAttrs, transclude) {

      var repeatExpr, childExpr, rootExpr, childrenExpr, branchExpr;

      repeatExpr = tAttrs.yaTree.match(/^(.*) in ((?:.*\.)?(.*)) at (.*)$/);
      childExpr = repeatExpr[1];
      rootExpr = repeatExpr[2];
      childrenExpr = repeatExpr[3];
      branchExpr = repeatExpr[4];

      return function link (scope, element, attrs) {

        var rootElement = element[0].parentNode,
            cache = [];

        // Reverse lookup object to avoid re-rendering elements
        function lookup (child) {
          var i = cache.length;
          while (i--) {
            if (cache[i].scope[childExpr] === child) {
              return cache.splice(i, 1)[0];
            }
          }
        }

        scope.$watch(rootExpr, function (root) {

          var currentCache = [];

          // Recurse the data structure
          (function walk (children, parentNode, parentScope, depth) {
            if(children && children[0]){
            
              var i = 0,
                n = children.length,
                last = n - 1,
                cursor,
                child,
                cached,
                childScope,
                grandchildren;

              // Iterate the children at the current level
              for (i = 0; i < n; i++) {

                // We will compare the cached element to the element in 
                // at the destination index. If it does not match, then 
                // the cached element is being moved into this position.
                cursor = parentNode.childNodes[i];

                child = children[i];

                // See if this child has been previously rendered
                // using a reverse lookup by object reference
                cached = lookup(child);
                
                // If the parentScope no longer matches, we've moved.
                // We'll have to transclude again so that scopes 
                // and controllers are properly inherited
                if (cached && cached.parentScope !== parentScope) {
                  cache.push(cached);
                  cached = null;
                }
                
                // If it has not, render a new element and prepare its scope
                // We also cache a reference to its branch node which will
                // be used as the parentNode in the next level of recursion
                if (!cached) {
                  transclude(parentScope.$new(), function (clone, childScope) {

                    childScope[childExpr] = child;
                    
                    cached = {
                      scope: childScope,
                      parentScope: parentScope,
                      element: clone[0],
                      branch: clone.find(branchExpr)[0]
                    };

                    // This had to happen during transclusion so inherited 
                    // controllers, among other things, work properly
                    parentNode.insertBefore(cached.element, cursor);

                  });
                } else if (cached.element !== cursor) {
                  parentNode.insertBefore(cached.element, cursor);
                }

                // Lets's set some scope values
                childScope = cached.scope;

                // Store the current depth on the scope in case you want 
                // to use it (for good or evil, no judgment).
                childScope.$depth = depth;
                
                // Emulate some ng-repeat values
                childScope.$index = i;
                childScope.$first = (i === 0);
                childScope.$last = (i === last);
                childScope.$middle = !(childScope.$first || childScope.$last);

                // Push the object onto the new cache which will replace
                // the old cache at the end of the walk.
                currentCache.push(cached);

                // If the child has children of its own, recurse 'em.             
                grandchildren = child[childrenExpr];
                if (grandchildren && grandchildren.length) {
                  walk(grandchildren, cached.branch, childScope, depth + 1);
                }
              }
            }
          })(root, rootElement, scope, 0);

          // Cleanup objects which have been removed.
          // Remove DOM elements and destroy scopes to prevent memory leaks.

          var i = cache.length;
          var cached = [];
          while (i--) {
            cached = cache[i];
            if (cached.scope) {
              cached.scope.$destroy();
            }
            if (cached.element) {
              cached.element.parentNode.removeChild(cached.element);
            } 
          }

          // Replace previous cache.
          cache = currentCache;


        }, true);
      };
    }
  };
});





/*
angular.module("ettoPupil")
  .directive("ettoTierTree", [

    function () {
      return {
        templateUrl: "/views/directives/ettoTierTree.html",
        restrict: "AE",
        terminal: true,
        controller: function ($scope, Tiers, $compile) {

         
          $scope.listChildren = function (tierID, callback) {
            
            var obj = {
              parentID: $scope.user._tier._id
            }

            Tiers.list_children_and_count_users(obj, function(err, tiers){
              console.log('tiers!-----', tiers)
              callback(tiers);
              
            })
          };
          
        },
        link: function (scope, element, attrs) {
          
          scope.redirectTo = attrs.redirectTo;
        }
      };
    }
  ]).directive("ettoToggleArrow", [
    
    function () {
      return {
        restrict: "AE",
        controller: function ($scope, Tiers, $compile) {
          
        },
        link: function (scope, element, attrs) {
          element.bind('click', function(e){
            console.log('attrs!-----', attrs.tierId)
            console.log('clicked!-----', $(e.target).parent())

            scope.listChildren(attrs.tierId, function(lowerTiers){

              $(e.target).parent().append("<div ng-repeat = 'lowerTier in lowerTiers'><p>{{lowerTier.title}}</p></div>")
            })
            
          })

        }
      };
    }
  ]);
*/

/*
angular.module("ettoPupil")
  .directive("ettoTree", ["$compile", function($compile) {
    return {
        restrict: "E",
        scope: {tiers: '='},
        templateUrl: "/views/directives/ettoTierTree.html",

        compile: function(tElement, tAttr) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, iElement, iAttr) {
                if(!compiledContents) {
                    compiledContents = $compile(contents);
                }
                compiledContents(scope, function(clone, scope) {
                    iElement.append(clone); 
                });
            };
        }
    };
}]).directive("ettoToggleArrow", [
    
    function () {
      return {
        restrict: "AE",
        controller: function ($scope, Tiers, $compile) {
          
        },
        link: function (scope, element, attrs) {
          element.bind('click', function(e){
            
           var obj = scope.$eval(attrs.tier)
           obj.children = [];

            obj.children.push({
              title: 'one more',
              children : []
            })

            scope.tiers = [];


            console.log('attrs!-----', attrs.tier)
            console.log('clicked!-----', $(e.target).parent())

            
          })

        }
      };
    }
  ]);




*/














