"use strict";

angular.module("ettoPupil")
  .directive("ettoFileUpload", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $upload, Asset) {
          $scope.onFileSelect = function ($files) {

            async.waterfall([

                function (callback) {
                  Asset.s3Url(function (results) {
                    callback(null, results.url);
                  });
                },
                function (url, callback) {

                  for (var i = 0; i < $files.length; i++) {

                    $scope.uploadRightAway = true;

                    var file = $files[i];
                    $scope.upload = $upload.upload({
                      url: url, //upload.php script, node.js route, or servlet url
                      method: "PUT",
                      /*headers: {
                        "Content-Type": file.type,
                      },*/
                      //withCredentials: true,
                      data: {
                        myObj: $scope.myModelObj
                      },
                      file: file,
                    }).progress(function (evt) {
                      console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    }).error(function (data, status, headers, config) {
                      // file is uploaded successfully
                      console.log("fail-----", data, status, headers, config);

                    }).success(function (data, status, headers, config) {
                      // file is uploaded successfully
                      console.log("successss-----", data);
                    });
                    //.error(...)
                    //.then(success, error, progress); 
                  }

                }
              ],

              function (err, results) {
                console.log("finished-----");
              });

            /*
            
            */
            // $scope.upload = $upload.upload({...}) alternative way of uploading, sends the the file content directly with the same content-type of the file. Could be used to upload files to CouchDB, imgur, etc... for HTML5 FileReader browsers. 
          };

        },
        link: function postLink(scope, element, attrs) {

        }
      };
    }
  ]);
