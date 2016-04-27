module.exports = function() {
    var controller = function($scope, infermedicaConditionsService) {
        $scope.waiting = true;

        var initializeBloodhound = function() {
            $scope.suggestions = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                identify: function(obj) {
                    return obj.id;
                },
                local: infermedicaConditionsService.data.conditions
            });

            setTimeout(function() {
                $scope.$broadcast('conditionSearch.suggestions.updated');
            }, 200);
            $scope.waiting = false;

        }


        if (infermedicaConditionsService.ready) {
            initializeBloodhound(); 
        } else {
            $scope.$on('infermedicaConditions_serv.data.updated', function() {
                initializeBloodhound();
            });
        }
    }

    return {
        templateUrl: 'conditionSearch/conditionSearch.template.html',
        scope: {
            onSelect: '='
        }

        , link: function($scope, $element, $attrs) {
            $scope.$on('conditionSearch.suggestions.updated', function() {
                $element.find('.inputSearch').typeahead('destroy');
                $element.find('.inputSearch').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                }, {
                    name: 'conditions',
                    source: $scope.suggestions,
                    displayKey: 'name',
                    templates: {
                        empty: [
                    '<div class="text-muted">',
                    'No Suggestion',
                    '</div>'
                    ].join('\n'),
                    suggestion: function(data) {
                        var templ = '<div class="list-group-item">'
                    + '<dl>'
                    + '<dt>{{name}}<label class="label pull-right">{{severity}}</label></dt>'
                    + '<dd><em>'
                    + '{{categories}}'
                    + '</em></dd>'
                    + '</div>';
                        var item = templ
                            .replace(/{{name}}/g, data.name)
                            .replace(/{{severity}}/g, data.severity)
                            .replace(/{{categories}}/g, data.categories.join(', '))
                            item = $(item);
                        if (data.severity == 'mild') {
                            item.find('label').toggleClass('label-info', true);
                        } else if (data.severity == 'moderate') {
                            item.find('label').toggleClass('label-warning', true);
                        } else if (data.severity == 'severe') {
                            item.find('label').toggleClass('label-danger', true);
                        } else {
                            item.find('label').toggleClass('label-default', true);
                        }

                        return item;
                    }
                    }
                });

                $element.find('.inputSearch').bind('typeahead:select', function(ev, suggestion) {
                    ($scope.onSelect || angular.noop)(suggestion);
                });
            });

        }

        ,
            controller: ['$scope', 'infermedicaConditions_serv', controller]
    }
}
