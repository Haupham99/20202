$("document").ready(function(){
    $(".friend-all").click(function(){
        $(".friend").removeClass("active");
        $(".friend-all").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend").css("display", "block");
    });
    // List friend request
    $(".friend-request").click(function(){
        $(".friend").removeClass("active");
        $(".friend-request").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend-request").css("display", "block");
        let userId = sessionStorage.getItem("userId");
        $.ajax({

            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/friend-request/" + userId,
            type: "GET",
            contentType: false,
            success: function(result){
                $(".list-friend-request .chat_list").empty();
                if(result.data.length == 0) {
                    $(".list-friend-request .chat_list").append(`<p>Không có lời mời kết bạn mới nào</p>`)
                }else{
                    $(".list-friend-request .chat_list").append(`<p>Có ` + result.data.length + ` lời mời kết bạn mới </p>`)
                }
                for(var i = 0; i < result.data.length; i++){
                    $(".list-friend-request .chat_list").append(`
                    <div class="chat_people">
                    <p class="accept-friend" style="display: none">` + result.data[i].id + `</p>
                    <div class="chat_img"><a href="` + result.data[i].email.split("@")[0] + `"> <img src="images/` + result.data[i]["avatar"] + `" alt="sunil"></a> </div>
                    <div class="chat_ib">
                    <h5>` + result.data[i].username + ` <span class="chat_date">
                        <button class="btn btn-success accept-friend">Đồng ý kết bạn</button>
                        <button type="button" class="btn btn-danger exampleModal2" data-toggle="modal" data-target="#exampleModal2">
                           Từ chối
                         </button>
                        </span>
                    </h5>
                    </div>
                    </div>
                    `);
                };
            },
            error: function(result){
                // console.log(result);
            },
        });
    });

    // List friend suggest
    $(".friend-suggest").click(function(){
        $(".friend").removeClass("active");
        $(".friend-suggest").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend-suggest").css("display", "block");
        let userId = sessionStorage.getItem("userId");
        $.ajax({

            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/friend-suggest/" + userId,
            type: "GET",
            contentType: false,
            success: function(result){
                $(".list-friend-suggest .chat_list").empty();
                if(result.data.length == 0) {
                    $(".list-friend-suggest .chat_list").append(`<p>Không có gợi ý kết bạn mới nào</p>`)
                }else{
                    $(".list-friend-suggest .chat_list").append(`<p>Có ` + result.data.length + ` gợi ý kết bạn mới </p>`)
                }
                for(var i = 0; i < result.data.length; i++){
                    $(".list-friend-suggest .chat_list").append(`
                    <div class="chat_people">
                    <p class="friend-suggest" style="display: none">` + result.data[i]["_id"] + `</p>
                    <div class="chat_img"><a href="` + result.data[i].email.split("@")[0] + `"> <img src="images/` + result.data[i]["avatar"] + `" alt="sunil"></a> </div>
                    <div class="chat_ib">
                    <h5>` + result.data[i].username + ` <span class="chat_date">
                        <button class="btn btn-success send-friend-request">Gửi lời mời</button>
                        <button type="button" class="btn btn-danger exampleModal3" data-toggle="modal" data-target="#exampleModal3">
                           Xóa
                         </button>
                        </span>
                    </h5>
                    </div>
                    </div>
                    `);
                };
            },
            error: function(result){
                // console.log(result);
            },
        });
    });

    // Accept friend
    $(document).on('click', ".accept-friend", function(e) {
        a = $(this);
        // console.log("Clicked");
        let contactId = sessionStorage.getItem("userId");
        let userId = a.parents().eq(3).find("p.accept-friend").text();
        // console.log(userId, contactId);
        $.ajax({

            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/accept-friend/" + userId + "/" + contactId,
            type: "POST",
            contentType: false,
            success: function(result){
                a.removeClass("accept-friend");
                a.text("Bạn bè");
                a.parents().eq(0).find(".exampleModal2").remove();
            },
            error: function(result){
                a.removeClass("accept-friend");
                a.text("Bạn bè");
                a.parents().eq(0).find(".exampleModal2").remove();
            },
        });
    });

    // Refuse accept friend
    $(document).off('click', "button.exampleModal2").on('click', "button.exampleModal2", function(e) {
        let a = $(this);
        $(document).off('click', ".refuse-accept-friend").on('click', ".refuse-accept-friend", function(e) {
            // console.log("Refuse!");
            let contactId = sessionStorage.getItem("userId");
            let userId = a.parents().eq(3).find("p.accept-friend").text();
            // console.log(userId, contactId);
            $.ajax({
                // url: "/personal/post/:postId/:userId/:userIdPost/:like",
                url: "/refuse-accept-friend/" + userId + "/" + contactId,
                type: "POST",
                contentType: false,
                success: function(result){
                    a.parents().eq(0).find('button.accept-friend').text("Đã từ chối lời mời");
                    a.parents().eq(0).find('button.accept-friend').removeClass("accept-friend");
                    a.remove();
                },
                error: function(result){
                    a.parents().eq(0).find('button.accept-friend').text("Đã từ chối lời mời");
                    a.parents().eq(0).find('button.accept-friend').removeClass("accept-friend");
                    a.remove();
                },
            });
        });
    });

    // Cancel friend
    $(document).off('click', "button.exampleModal1").on('click', "button.exampleModal1", function(e) {
        let a = $(this);
        $(document).off('click', "button.cancel-friend").on('click', "button.cancel-friend", function(e) {
            // console.log("Refuse!");
            let contactId = sessionStorage.getItem("userId");
            let userId = a.parents().eq(3).find("p.list-friend").text().trim();
            // console.log("userId: ", userId);
            // console.log("contactId: ", contactId);
            // console.log(a.parents().eq(0).find('a button.profile-success').text());
            $.ajax({
                // url: "/personal/post/:postId/:userId/:userIdPost/:like",
                url: "/cancel-friend/" + userId + "/" + contactId,
                type: "POST",
                contentType: false,
                success: function(result){
                    a.removeClass("exampleModal1");
                    a.parents().eq(0).find('a button.profile-success').parents().eq(0).attr("href", "#");
                    a.parents().eq(0).find('a button.profile-success').parents().eq(0).click(function(e) {
                        e.preventDefault();
                        //do other stuff when a click happens
                    });
                    a.parents().eq(0).find('a button.profile-success').text("Đã hủy kết bạn");
                    a.remove();
                },
                error: function(result){
                    a.removeClass("exampleModal1");
                    a.parents().eq(0).find('a button.profile-success').parents().eq(0).attr("href", "#");
                    a.parents().eq(0).find('a button.profile-success').parents().eq(0).click(function(e) {
                        e.preventDefault();
                        //do other stuff when a click happens
                    });
                    a.parents().eq(0).find('a button.profile-success').text("Đã hủy kết bạn");
                    a.remove();
                },
            });
        });
    });
    
    // Send friend request
    $(document).on('click', ".send-friend-request", function(e) {
        let a = $(this);
        // console.log("Clicked");
        let userId = sessionStorage.getItem("userId");
        let contactId = a.parents().eq(3).find('p').text();
        // console.log(userId);
        // console.log(contactId);
        $.ajax({

            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/send-friend-request/" + userId + "/" + contactId,
            type: "POST",
            contentType: false,
            success: function(result){
                a.removeClass("send-friend-request");
                a.text("Đã gửi lời mời kết bạn");
                a.parents().eq(0).find(".exampleModal3").remove();
            },
            error: function(result){
                a.removeClass("send-friend-request");
                a.text("Đã gửi lời mời kết bạn");
                a.parents().eq(0).find(".exampleModal3").remove();
            },
        });
    });

    // Refuse suggest friend
    $(document).off('click', "button.exampleModal3").on('click', "button.exampleModal3", function(e) {
        let a = $(this);
        $(document).off('click', ".refuse-suggest-friend").on('click', ".refuse-suggest-friend", function(e) {
            // console.log("Refuse suggest!");
            a.parents().eq(0).find('button.send-friend-request').text("Đã xóa đề nghị kết bạn");
            a.parents().eq(0).find('button.send-friend-request').removeClass("send-friend-request");
            a.remove();
        });
    });
});