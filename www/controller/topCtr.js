app.controller('topCtr', function($scope) {
	console.log("topCtr");

	document.addEventListener("init", init, false);
    function init(event) {
        var page = event.target;
        if (page.matches('#top-page')) {
        	//↓ローカルに保存されているIDを消す
        	//localStorage.removeItem('charge_cd');
            if (localStorage.getItem("charge_cd") !== null) {
                //idが保存されていたらログイン済みとしてホーム画面へ
                navi.replacePage('html/home.html', {animation:'none'});
            }else{
            	//idが保存されていなければログイン画面へ
                navi.replacePage('html/login.html', {animation:'none'});
            }
        }
    }
});
ons.ready(function() {
    console.log("topCtr Onsen UI is ready!");
});