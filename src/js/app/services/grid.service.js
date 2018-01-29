(function(){
    'use strict';

    angular
    .module('app')
    .factory('gridService', gridService);

    function gridService(){
        return {
            GridDataSource: GridDataSource
        }
    }

    

    function GridDataSource(loadFunc) {
        var that = this;
        that.columns = null;
        that.items = null;
        that.isLoaded = false;
        var sort = [];
        that.pagging = {
            totalCount: null,
            currentPage: 0,
            pageSize: 5,
            totalPages: null
        };

        function load() {
            that.isLoaded = false;
            loadFunc({
                sorting: sort,
                page: that.pagging.currentPage,
                pageSize: that.pagging.pageSize
            }, function (data) {
                if (!that.items && data.items.length > 0) {
                    that.columns = Object.getOwnPropertyNames(data.items[0]).map(function (name) {
                        return {
                            name: name,
                            type: geType(data.items[0][name])
                        }
                    });
                }

                that.items = data.items;
                that.pagging.totalCount = data.totalCount;
                that.pagging.totalPages = Math.ceil(pagging.totalCount / pagging.pageSize);
                that.isLoaded = true;
            });
        }

        this.toggleSort = function (colName) {
            var colInfo = $scope.grid.columns.filter(function (col) {
                return col.name === colName
            })[0];
            colInfo.sortDirection = !colInfo.sortDirection ?
                'asc' :
                colInfo.sortDirection === 'asc' ? 'desc' : 'asc';
            var currentSortItem = $scope.grid.sort.filter(function (item) {
                return item.name === colName
            });

            if (currentSortItem.length > 0) {
                $scope.grid.sort.splice($scope.grid.sort.indexOf(currentSortItem[0]), 1);
            }

            $scope.grid.sort.push({
                name: colInfo.name,
                direction: colInfo.sortDirection
            });

            $scope.grid.items.sort(function (left, right) {
                for (var i = $scope.grid.sort.length - 1; i >= 0; i--) {
                    var result = sortFunc[$scope.grid.sort[i].direction](left[$scope.grid.sort[i].name], right[$scope.grid.sort[i].name]);
                    if (result !== 0) {
                        return result;
                    }
                }

                return 0;
            });

            load();
        }

        this.goToPage = function (index) {
            if (index < 0 || index >= that.pagging.totalPages) {
                return;
            }

            that.pagging.currentPage = index;
            load();
        }

        function geType(value) {
            if (angular.isArray(value)) {
                return 'array';
            }

            if (!isNaN(value)) {
                return 'number';
            }

            return 'string';
        };

        load();
    }
})();