"use strict";

angular.module("ettoPupil")
  .directive("ettoAssetLibraryModal", [

    function () {
      return {
        restrict: "AE",
        controller: function ($scope, $modal, $rootScope, $http, $upload) {
          $scope.showAssetLibrary = function (done) {
            var modal = $modal.open({
              templateUrl: "/views/directives/ettoAssetLibraryModal.html",
              windowClass: "app-modal-large",
              controller: function ($scope, $modalInstance, Asset) {
                $scope.assets = Asset.query({});

                $scope.selectAsset = function (id) {
                  $scope.assets.forEach(function (asset) {
                    if (asset._id === id) {
                      $modalInstance.close(asset);
                    }
                  });
                };

                $scope.uploadData = [];

                $scope.onFileSelect = function ($files) {
                  $scope.files = $files;
                  $scope.upload = [];

                  $files.forEach(function (file, i) {
                    var asset = new Asset();
                    asset.getS3Policy(file.type, function () {
                      $scope.upload[i] = $upload.upload({
                        url: "https://" + $rootScope.config.aws.bucket + ".s3.amazonaws.com/",
                        method: "POST",
                        data: {
                          "key": "s3UploadExample/" + Math.round(Math.random() * 10000) + "$$" + file.name,
                          "acl": "public-read",
                          "Content-Type": file.type,
                          "AWSAccessKeyId": asset.s3.AWSAccessKeyId,
                          "success_action_status": "201",
                          "Policy": asset.s3.s3Policy,
                          "Signature": asset.s3.s3Signature
                        },
                        file: file,
                      }).then(function (response) {
                        file.progress = 100;
                        if (response.status === 201) {
                          // TODO: Determine better way to convert XML to object
                          var data = $(new DOMParser().parseFromString(response.data, "text/xml"));
                          var parsedData = {
                            bucket: data.find("Bucket").text(),
                            key: data.find("Key").text(),
                            etag: data.find("ETag").text().replace(/^\"|\"$/g, ""),
                          };

                          asset.url = data.find("Location").text();
                          asset.s3 = parsedData;

                          asset.$save();
                          $scope.assets.push(asset);
                        } else {
                          $scope.err = {
                            message: "Upload Failed"
                          };
                        }
                      }, null, function (evt) {
                        file.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
                      });
                    });
                  });
                };
              }
            });

            modal.result.then(function (asset) {
              done(asset);
            });
          };
        },
        link: function postLink(scope, element, attrs) {}
      };
    }
  ]);