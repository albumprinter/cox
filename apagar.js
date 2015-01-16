var Q = require('q');  


var doSomething = function(){
	var deferred = Q.defer();

	console.log('doing something');
	setTimeout(function(){
		console.log('done something');
		deferred.resolve('this was nice');
	}, 1000);

	return deferred.promise;
};

doSomething().then(function(result){
	console.log('resolved:', result);
});