app.controller('loginCtr', function($scope, $http) {
    //全てのページの読み込み完了後に呼ばれる。
    console.log("loginCtr");

    $scope.onLogin = function() {
        login($scope, $http);
    }

    //これだけではキーボードが開きっぱなしなので閉じる処理が必要
    // chargeCd.addEventListener('keyup', function(e) {
    //     if (e.keyCode == 13) {
    //     	login($scope, $http);
    //     }
    // });

    $scope.dialogs = {};
    $scope.show = function(dlg, option) {
        if (!$scope.dialogs[dlg]) {
            ons.createDialog(dlg).then(function(dialog) {
                $scope.dialogs[dlg] = dialog;
                errorMessage.innerText = eMessage(option);
                dialog.show();

                dialog.on('prehide', function(e) {
                    chargeCd._input.focus();
                });
            });
        } else {
            errorMessage.innerText = eMessage(option);
            $scope.dialogs[dlg].show();
        }
    }
});

ons.ready(function($http) {
    //UI読み込み後に呼ばれる。表示の変更等はここで行う
    console.log("loginCtr Onsen UI is ready!");
    var module = angular.module('app', ['onsen.directives']);
    //ログインの通信の為の準備
    module.config(function($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;application/json;charset=utf-8';
    });
});

function loadEnd() {
    //読み込み中非表示
    loadingIcon.style.visibility = "hidden";
}

function login($scope, $http) {
    //読み込み中表示
    loadingIcon.style.visibility = "visible";
    //ログイン処理
    var postData = null;
    charge_cd = chargeCd.value;
    if (charge_cd) {
        postData = {
            charge_cd: charge_cd
        };
        //Ajax通信でphpにアクセス
        var url = "https://yoshihira-ec.com/dev/login_api.php",
            config = {
                timeout: 5000
            };
        $http.post(url, postData, config).
        success(function(data, status) {
            if (data[0] == "success") {
                //次の画面へ
                //TODO ここで担当者コードを端末に保存
                localStorage.setItem('charge_cd', charge_cd);
                navi.replacePage('html/home.html');
                loadEnd();
            } else {
                loadEnd();
                //TODOエラーページに飛ばす
                setTimeout(function() {
                    $scope.show('dialog.html', 1)
                }, 0);
            };
            console.log(data);
        }).
        error(function(data, status) {
            loadEnd()
            $scope.show('dialog.html', 2)
            console.log(data);
        });
    } else {
        loadEnd();
        $scope.show('dialog.html', 3)
    };
}

function eMessage(errorNumber) {
    var message = "";
    switch (errorNumber) {
        case 1:
            message = "ログインできませんでした。";
            break;
        case 2:
            message = "エラーが発生しました。"
            break;
        case 3:
            message = "担当者コードを入力してください。"
            break;

    }
    return message;
}