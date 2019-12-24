(function() {
    angular.module('angular.chips', [])
        .directive('chips', Chips)
        .controller('chipsController', ChipsController);

    function isPromiseLike(obj) {
        return obj && angular.isFunction(obj.then);
    }

    /*
     * update values to ngModel reference
     */
    function ngModel(modelCtrl) {
        return {
            add: function(val) {
                var modelCopy = angular.copy(modelCtrl.$modelValue) || [];
                modelCopy.push(val)
                modelCtrl.$setViewValue(modelCopy);
            },
            delete: function(index) {
                var modelCopy = angular.copy(modelCtrl.$modelValue);
                modelCopy.splice(index, 1);
                modelCtrl.$setViewValue(modelCopy);
            },
            deleteByValue: function(val) {
                var index, resultIndex;
                for (index = 0; index < modelCtrl.$modelValue.length; index++) {
                    if (angular.equals(modelCtrl.$modelValue[index], val)) {
                        resultIndex = index;
                        break;
                    }

                }
                if (resultIndex !== undefined)
                    this.delete(resultIndex)
            }
        }
    }

    function DeferChip(data, promise) {
        var self = this;
        this.type = 'defer';
        this.defer = data;
        this.isLoading = false;
        this.isFailed = false;

        if (promise) {
            self.isLoading = true;
            promise.then(function(data) {
                self.defer = data;
                self.isLoading = false;
            }, function(data) {
                self.defer = data;
                self.isLoading = false;
                self.isFailed = true;
            });
        }
    }

    /*
     * get function param key
     * example: 'render(data)' data is the key here
     * getParamKey('render(data)') will return data
     */
    function getParamKey(funStr) {
        if (funStr === undefined)
            return;
        var openParenthesisIndex, closeParenthesisIndex;
        openParenthesisIndex = funStr.indexOf('(') + 1;
        closeParenthesisIndex = funStr.indexOf(')');
        return funStr.substr(openParenthesisIndex, closeParenthesisIndex - openParenthesisIndex);
    }
    /*@ngInject*/
    function Chips($compile, $timeout, DomUtil) {
        /*@ngInject*/
        function linkFun(scope, iElement, iAttrs, ngModelCtrl, transcludefn) {
            if ((error = validation(iElement)) !== '') {
                throw error;
            }

            var model = ngModel(ngModelCtrl);
            var isDeferFlow = iAttrs.hasOwnProperty('defer');
            var functionParam = getParamKey(iAttrs.render);

            /*
             *  @scope.chips.addChip should be called by chipControl directive or custom XXXcontrol directive developed by end user
             *  @scope.chips.deleteChip will be called by removeChip directive
             *
             */

            /*
             * ngModel values are copies here
             */
            scope.chips.list;

            scope.chips.addChip = function(data) {
                var updatedData, paramObj;

                if (scope.render !== undefined && functionParam !== '') {
                    paramObj = {};
                    paramObj[functionParam] = data;
                    updatedData = scope.render(paramObj);
                } else { updatedData = data }

                if (!updatedData) {
                  return false;
                }

                if (isPromiseLike(updatedData)) {
                    updatedData.then(function(response) {
                        model.add(response);
                    });
                    scope.chips.list.push(new DeferChip(data, updatedData));
                    scope.$apply();
                } else {
                    update(updatedData);
                }

                function update(data) {
                    scope.chips.list.push(data);
                    model.add(data);
                }

                return true;
            };

            scope.chips.deleteChip = function(index) {
                var deletedChip = scope.chips.list.splice(index, 1)[0];
                if (deletedChip.isFailed) {
                    scope.$apply();
                    return;
                }

                deletedChip instanceof DeferChip ? model.deleteByValue(deletedChip.defer) : model.delete(index);
            }

            /*
             * ngModel values are copied when it's updated outside
             */
            ngModelCtrl.$render = function() {
                if (isDeferFlow && ngModelCtrl.$modelValue) {
                    var index, list = [];
                    for (index = 0; index < ngModelCtrl.$modelValue.length; index++) {
                        // list.push(ngModelCtrl.$modelValue[index]);
                        list.push(new DeferChip(ngModelCtrl.$modelValue[index]))
                    }
                    scope.chips.list = list;
                } else {
                    scope.chips.list = angular.copy(ngModelCtrl.$modelValue) || [];
                }

            }

            var chipNavigate = null;
            /*
             * @index selected chip index
             * @return function, which will return the chip index based on left or right arrow pressed
             */
            function chipNavigator(index) {
                return function(direction) {
                    direction === 37 ? index-- : index++;
                    index = index < 0 ? scope.chips.list.length - 1 : index > scope.chips.list.length - 1 ? 0 : index;
                    return index;
                }
            }

            /*Extract the chip-tmpl and compile inside the chips directive scope*/
            var rootDiv = angular.element('<div></div>');
            var tmplStr = iElement.html();
            tmplStr = tmplStr.substr(tmplStr.indexOf('<chip-tmpl'),tmplStr.indexOf('</chip-tmpl>')-('</chip-tmpl>').length);
            iElement.find('chip-tmpl').remove();
            var tmpl = angular.element(tmplStr);
            var chipTextNode, chipBindedData, chipBindedDataSuffix;
            tmpl.attr('ng-repeat', 'chip in chips.list track by $index');
            tmpl.attr('ng-class', '{\'chip-failed\':chip.isFailed}')
            tmpl.attr('tabindex', '-1')
            tmpl.attr('index', '{{$index+1}}')
            rootDiv.append(tmpl);
            var node = $compile(rootDiv)(scope);
            iElement.prepend(node);


            /*clicking on chips element should set the focus on INPUT*/
            iElement.on('click', function(event) {
                if (event.target.nodeName === 'CHIPS')
                    iElement.find('input')[0].focus();
            });
            /*on every focus we need to nullify the chipNavigate*/
            iElement.find('input').on('focus', function() {
                chipNavigate = null;
            });
            /*this method will handle 'delete or Backspace' and left, right key press*/
            scope.chips.handleKeyDown = function(event) {
                if (event.target.nodeName !== 'INPUT' && event.target.nodeName !== 'CHIP-TMPL' || (iElement.find('chip-tmpl').length === 0 && event.target.value === ''))
                    return;

                var chipTmpls;

                function focusOnChip() {
                    var index = parseInt(document.activeElement.getAttribute('index')) || (chipTmpls = iElement.find('chip-tmpl')).length;
                    chipTmpls = iElement.find('chip-tmpl');
                    chipTmpls[index - 1].focus();
                    chipNavigate = chipNavigator(index-1);
                    if(event.target.nodeName !== 'INPUT')
                        chipTmpls[chipNavigate(event.keyCode)].focus();
                }

                if (event.keyCode === 8) {
                    if (event.target.nodeName === 'INPUT' && event.target.value === '') {
                        focusOnChip();
                        event.preventDefault();
                    } else if (event.target.nodeName === 'CHIP-TMPL') {
                        /*
                         * This block will be called during chip deletion using delete or Backspace key
                         * Below code will set the focus of the next available chip
                         */
                        var chipTemplates = iElement.find('chip-tmpl');
                        if (chipTemplates.length > 0 && parseInt(event.target.getAttribute('index')) - 1 === chipTemplates.length)
                            iElement.find('chip-tmpl')[chipNavigate(37)].focus();
                    }

                } else if (event.keyCode === 37 || event.keyCode === 39) {
                    chipNavigate === null ? focusOnChip() : iElement.find('chip-tmpl')[chipNavigate(event.keyCode)].focus();
                }
            };

            iElement.on('keydown', scope.chips.handleKeyDown);

            DomUtil(iElement).addClass('chip-out-focus');
        }

        return {
            restrict: 'E',
            scope: {
                /*
                 * optional callback, this will be called before rendering the data,
                 * user can modify the data before it's rendered
                 */
                render: '&?'
            },
            transclude: true,
            require: 'ngModel',
            link: linkFun,
            controller: 'chipsController',
            controllerAs: 'chips',
            template: '<div ng-transclude></div>'
        }


    };
    /* <chip-tmpl> tag is mandatory added validation to confirm that*/
    function validation(element) {
        return element.find('chip-tmpl').length === 0 ? 'should have chip-tmpl' : element.find('chip-tmpl').length > 1 ? 'should have only one chip-tmpl' : '';
    }
    /*@ngInject*/
    function ChipsController($scope, $element, DomUtil) {
        /*toggling input controller focus*/
        this.setFocus = function(flag) {
            if (flag) {
                DomUtil($element).removeClass('chip-out-focus').addClass('chip-in-focus');
            } else {
                DomUtil($element).removeClass('chip-in-focus').addClass('chip-out-focus');
            }
        }
        this.removeChip = function(data, index) {
            this.deleteChip(index);
        }
    }
})();
