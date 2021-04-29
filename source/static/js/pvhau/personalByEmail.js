$("document").ready(function(){
	$('html,body').animate({
		scrollTop: 200
	});
	// console.log(user);
	$(".textarea-make-post").val("Hãy nhập gì đó!");
	$(".textarea-make-post").focus(function(){
		$(".textarea-make-post").val("");
		$(".textarea-make-post").animate({height: 100 + "px"});
	});
	$(".textarea-make-post").focusout(function(){
		if($(".textarea-make-post").val() == "Hãy nhập gì đó!" || $(".textarea-make-post").val().trim() == ""){
			$(".textarea-make-post").val("Hãy nhập gì đó!");
			$(".textarea-make-post").animate({height: 30 + "px"});
		};
	});

	// Upload image

	// Like post
	$(".like").click(function() {
		let a = $(this);
		let like = $(this).find('span').text();
		let postId = $(this).find('p').text();
		let userIdPost = $(this).find('h1').text();
		let userId = sessionStorage.getItem("userId");
		if(!a.find("i").hasClass("liked")){
			$.ajax({

				// url: "/personal/post/:postId/:userId/:userIdPost/:like",
				url: "/personal/post/" + postId + "/" + userId + "/" + userIdPost + "/" + like,
				type: "POST",
				contentType: false,
				success: function(result){
					a.find('i').addClass("liked");
					a.find('span').text(result["likes"]);
				},
				error: function(result){
					console.log(result);
				},
			});
		}
	});

	
});