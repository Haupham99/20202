$("document").ready(function(){
	$('html,body').animate({
		scrollTop: 200
	});
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

	// Delete Post
	$(".edit-post").click(function(){
		let a = $(this);
		let postId = a.parents().eq(6).find('p:first').text();
		$.ajax({

			// url: "/personal/post/:postId/:userId/:userIdPost/:like",
			url: "/post/delete/" + postId,
			type: "POST",
			contentType: false,
			success: function(result){
				console.log(a.parents().eq(6));
				a.parents().eq(5).fadeOut();
			},
			error: function(result){
				console.log(result);
			},
		});
	});

	// Upload image
	$("#upload").change(function(){
		// d = new Date();
		var imgArr = [];
		for (var i = 0; i < $(this).get(0).files.length; ++i) {
			imgArr.push($(this).get(0).files[i].name);
		}
		if(imgArr.length > 4){
			alert("Chọn tối đa 4 bức ảnh!");
		}else{
			if(imgArr.length > 0) {
				$("#img-arr").css("display", "block");
				for (var i = 0; i < imgArr.length; i++){
					$("#img" + (i+1).toString() ).removeAttr("src").attr("src", "images/" + imgArr[i]);
					$("#image" + (i+1).toString() ).val(imgArr[i]);
				}
			}else {
				$("#img-arr").css("display", "none");
			}
		}
	});

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

	// Update Cover Image
	$('#edit-profile').one('click', function(e) {  
		e.preventDefault();      
		console.log("update-image");
		$("#choose-image").click();
		$('#choose-image').change(function() {
			let userId = sessionStorage.getItem('userId');
			var filename = $('#choose-image').val();
			console.log(filename.split('\\')[filename.split('\\').length-1]);
			console.log(userId);
			$("#cover-img").attr('src', 'images/' + filename.split('\\')[filename.split('\\').length-1]);
			$.ajax({

				// url: "/personal/post/:postId/:userId/:userIdPost/:like",
				url: "/personal/update-cover/" + userId + '/' + filename.split('\\')[filename.split('\\').length-1],
				type: "POST",
				contentType: false,
				success: function(result){
					alert("Cập nhật thành công!");
				},
				error: function(result){
					alert("Có lỗi xảy ra, xin thử lại!");
				},
			});
		});
	});
});