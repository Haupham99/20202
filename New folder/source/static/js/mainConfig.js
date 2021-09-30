const socket = io();
// add Noti like
let addNotiLike = () => {
	socket.on("response-like-post", function(user) {
		// console.log("Like");
		let totalNofi = parseInt($("#notification_count").text());
		// console.log(totalNofi);
		$("#notification_count").text(totalNofi + 1);
		let notif = `<div class="notif-line"><span data-uid="${user.id}"> 
		<img class="rounded-circle" src="images/${user.avatar}" width="40px" alt="">
		<strong>${user.username}</strong> đã thích bài viết của bạn
		</span><br></div>`;
		$("#notificationsBody").prepend(notif);
		let senderId = user.id;
		let senderAvatar = user.avatar;
		let senderUsername = user.username;
		let receiverId = sessionStorage.getItem("userId");
		let receiverAvatar = sessionStorage.getItem("avatar");
		let receiverUsername = sessionStorage.getItem("username");
		$.ajax({
			// /notification/:senderId/:senderUsername/:senderAvatar/:receiverId/:receiverUsername/:receiverAvatar/:content
			url: "/notification/" + senderId + "/" + senderUsername + "/" + senderAvatar + "/" + receiverId + "/" + receiverUsername + "/" + receiverAvatar + "/" + "đã thích bài viết của bạn",
			type: "POST",
			contentType: false,
			success: function(result){
				console.log(result);
			},
			error: function(result){
				console.log(result);
			},
		});
	});
};
// add Noti Comment
let addNotiComment = () => {
	socket.on("response-comment-post", function(user) {
		console.log("comment!");
		let totalNofi = parseInt($("#notification_count").text());
		// console.log(totalNofi);
		$("#notification_count").text(totalNofi + 1);
		let notif = `<div class="notif-line"><span data-uid="${user.id}"> 
		<img class="rounded-circle" src="images/${user.avatar}" width="40px" alt="">
		<strong>${user.username}</strong> đã bình luận bài viết của bạn
		</span><br></div>`;
		$("#notificationsBody").prepend(notif);
		let senderId = user.id;
		let senderAvatar = user.avatar;
		let senderUsername = user.username;
		let receiverId = sessionStorage.getItem("userId");
		let receiverAvatar = sessionStorage.getItem("avatar");
		let receiverUsername = sessionStorage.getItem("username");
		$.ajax({
			// /notification/:senderId/:senderUsername/:senderAvatar/:receiverId/:receiverUsername/:receiverAvatar/:content
			url: "/notification/" + senderId + "/" + senderUsername + "/" + senderAvatar + "/" + receiverId + "/" + receiverUsername + "/" + receiverAvatar + "/" + "đã bình luận bài viết của bạn",
			type: "POST",
			contentType: false,
			success: function(result){
				console.log(result);
			},
			error: function(result){
				console.log(result);
			},
		});
	});
};

// add Message
let addMessage = () => {
	socket.on("response-send-message", function(user) {
		console.log(user);
		$(".msg_history").append(
			`
		<div class="incoming_msg">
		  <div class="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
		  <div class="received_msg">
			<div class="received_withd_msg">
			  <p>` + user["text"] + `</p>
			  <span class="time_date"> 11:01 AM    |    June 9</span></div>
		  </div>
		</div>`);
		$(".msg_history").animate({ scrollTop: $('.msg_history').prop("scrollHeight")}, 1000);
	});
};

addNotiLike();
addNotiComment();
addMessage();