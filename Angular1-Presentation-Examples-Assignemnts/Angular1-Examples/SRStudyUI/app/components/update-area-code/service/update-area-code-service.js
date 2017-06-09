attApp.service("updateAreacodeService", ['$http', '$q', function ($http, $q) {
    return ({
        getAreacode: getAreacode
    });

    function getAreacode() {
        var request = $http({
            method: "POST",
            async: true,
            cache: false,
            url: "data/updateAreacode.json"
        });
        return (request.then(handleSuccess, handleError));
    }

    function addNewAreacode(newAreaCode) {
        var request = $http({
            method: "POST",
            async: true,
            cache: false,
            data: newAreaCode,
            url: "data/updateAreacode.json"
        });
        return (request.then(handleSuccess, handleError));
    }

    function handleSuccess(response) {
        return response.data;
    }

    function handleError(response) {
        console.log("error handling Analyst Sample service");
    }

}]);