$("document").ready(function() {
    $(".chat_list").each(function(){
        $(this).click(function(){
            let a = $(this);
            let userId = sessionStorage.getItem("userId");
            let friendId = a.find('h1').text();
            let friendAvatar = a.find("img").attr("src").split('/')[1];
		    let friendUsername = a.find(".chat_ib").find('h5').text();
            // console.log(friendId, friendAvatar, friendUsername);
            $.ajax({
                url: "/chat/" + userId + "/" + friendId,
                type: "GET",
                contentType: false,
                success: function(result){
                    let data = result.data;
                    console.log(data);
                    $(".msg_history").empty();
                    $(".msg_history").append(`<h1 class="friendId" style="display: none">` + friendId + `</h1>`);
                    $(".msg_history").append(`<h1 class="friendAvatar" style="display: none">` + friendAvatar + `</h1>`);
                    $(".msg_history").append(`<h1 class="friendUsername" style="display: none">` + friendUsername + `</h1>`);
                    // console.log(data.length);
                    for(var i = 0; i < data.length; i++){
                        // console.log(data[i]);
                        let time = "";
                        if("incoming" in data[i]){
                            if (Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000) > 24) {
                                time = Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000/24) + " days ago"; 
                            }
                            else if (Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000) == 1){
                                time = "Vừa xong";
                            }else if(Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000) < 2){
                                time = Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000*60) + " min ago"
                            }
                            else {
                                time = Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000) + " h ago";
                            };
                            // console.log("Have");
                            $(".msg_history").append(
                                `
                            <div class="incoming_msg">
                              <div class="incoming_msg_img"> <img src="images/` + data[i]["incoming"]["sender"]["avatar"] + `" alt="sunil"> </div>
                              <div class="received_msg">
                                <div class="received_withd_msg">
                                  <p>` + data[i]["incoming"]["text"] + `</p>
                                  <span class="time_date"> ` + time + `</span></div>
                              </div>
                            </div>`)
                        }else{
                            if (Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000) > 24) {
                                time = Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000/24) + " days ago"; 
                            }
                            else if (Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000) == 1){
                                time = "Vừa xong";
                            }else if(Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000) < 2){
                                time = Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000*60) + " min ago"
                            } else {
                                time = Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000) + " h ago";
                            };
                            $(".msg_history").append(
                                `
                                <div class="outgoing_msg">
                                <div class="sent_msg">
                                  <p>` + data[i]["outgoing"]["text"] + `</p>
                                  <span class="time_date"> ` + time + `</span> </div>
                              </div>
                              </div>`)
                        };
                    };
                    // console.log(data[data.length - 1]);
                    if(data[data.length - 1] != undefined){
                        let i = data.length - 1;
                        let timeAgo = "";
                        if(data["outgoing"] != undefined){
                            if (Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000) > 24) {
                                timeAgo = Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000/24) + " days ago"; 
                            }
                            else if (Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000) == 1){
                                timeAgo = "Vừa xong";
                            }else if(Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000) < 2){
                                timeAgo = Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000*60) + " min ago"
                            } else {
                                timeAgo = Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000) + " h ago";
                            };
                        }else{
                            if (Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000) > 24) {
                                timeAgo = Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000/24) + " days ago"; 
                            }
                            else if (Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000) == 1){
                                timeAgo = "Vừa xong";
                            }else if(Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000) < 2){
                                timeAgo = Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000*60) + " min ago"
                            } else {
                                timeAgo = Math.ceil((Date.now() - data[i]["incoming"].createdAt)/3600000) + " h ago";
                            };
                        }
                        a.find('h5 span').text(timeAgo);

                        if("incoming" in data[data.length - 1]){
                            a.find('p').text(data[data.length - 1]["incoming"]["text"]);
                        }else{
                            a.find('p').text(data[data.length - 1]["outgoing"]["text"]);
                        };
                    }else{
                        a.find('p').text("");
                        a.find('h5 span').text("Chưa nhắn tin");
                    }
                },
                error: function(result){
                    console.log(result);
                },
            });
            // console.log($(this).find('p').text());
        });
    });
    $(".chat_list").trigger("click");
    
    // Send message
    $(".msg_send_btn").click(function(){
        let a = $(this);
        // /chat/:userId/:userUsername/:userAvatar/:friendId/:friendUsername/:friendAvatar/:text
        let friendId = a.parents().eq(2).find(".msg_history").find(".friendId").text();
		let friendAvatar = a.parents().eq(2).find(".msg_history").find(".friendAvatar").text();
		let friendUsername = a.parents().eq(2).find(".msg_history").find(".friendUsername").text();
		let userId = sessionStorage.getItem("userId");
		let userAvatar = sessionStorage.getItem("avatar");
		let userUsername = sessionStorage.getItem("username");
        let text = $(".write_msg").val();
        // console.log(userId, userAvatar, userUsername, friendId, friendAvatar, friendUsername, text);
		// console.log(text);
        $.ajax({
			url: "/chat/" + userId + "/" + userUsername + "/" + userAvatar + "/" + friendId + "/" + friendUsername + "/" + friendAvatar + "/" + text,
			type: "POST",
			contentType: false,
			success: function(result){
				console.log(result);
                let time = "";
                if (Math.ceil((Date.now() - result["data"]["outgoing"].createdAt)/3600000) > 24) {
                    time = Math.ceil((Date.now() - result["data"]["outgoing"].createdAt)/3600000/24) + " days ago"; 
                }
                else if (Math.ceil((Date.now() - result["data"]["outgoing"].createdAt)/3600000) == 1){
                    time = "Vừa xong";
                }else if(Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000) < 2){
                    time = Math.ceil((Date.now() - data[i]["outgoing"].createdAt)/3600000*60) + " min ago"
                } else {
                    time = Math.ceil((Date.now() - result["data"]["outgoing"].createdAt)/3600000) + " h ago";
                };
                $(".msg_history").append(
                    `
                    <div class="outgoing_msg">
                    <div class="sent_msg">
                      <p>` + result["data"]["outgoing"]["text"] + `</p>
                      <span class="time_date"> ` + 
                      time
                      + `</span> </div>
                  </div>
                </div>`);
                $(".msg_history").animate({ scrollTop: $('.msg_history').prop("scrollHeight")}, 1000);
                $(".write_msg").val("");
                socket.emit("send-message", {friendId: friendId, text: text});
			},
			error: function(result){
				console.log(result);
			},
		});
        // $('.msg_history').scrollTop($('.msg_history')[0].scrollHeight);
    });
    $(".msg_history").animate({ scrollTop: $('.msg_history').prop("scrollHeight")}, 1000);
});