$("document").ready(function(){
    $(".friend-all").click(function(){
        $(".friend").removeClass("active");
        $(".friend-all").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend").css("display", "block");
    });
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
    $(".friend-suggest").click(function(){
        $(".friend").removeClass("active");
        $(".friend-suggest").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend-suggest").css("display", "block");
    });

    // Accept friend
    $(document).on('click', ".accept-friend", function(e) {
        // console.log("Clicked");
        let contactId = sessionStorage.getItem("userId");
        let userId = $("p.accept-friend").text();
        $.ajax({

            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/accept-friend/" + userId + "/" + contactId,
            type: "POST",
            contentType: false,
            success: function(result){
                $(document).off('click', ".accept-friend");
                $(".accept-friend").text("Bạn bè");
                $(".exampleModal2").remove();
            },
            error: function(result){
                $(document).off('click', ".accept-friend");
                $(".accept-friend").text("Bạn bè");
                $(".exampleModal2").remove();
            },
        });
    });

    // Refuse accept friend
    $(document).on('click', ".refuse-accept-friend", function(e) {
        console.log("Refuse!");
        let contactId = sessionStorage.getItem("userId");
        let userId = $("p.accept-friend").text();
        $.ajax({
            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/refuse-accept-friend/" + userId + "/" + contactId,
            type: "POST",
            contentType: false,
            success: function(result){
                $(document).off('click', ".accept-friend");
                $(".accept-friend").text("Đã từ chối lời mời");
                $(".exampleModal2").remove();
            },
            error: function(result){
                $(document).off('click', ".accept-friend");
                $(".accept-friend").text("Đã từ chối lời mời");
                $(".exampleModal2").remove();
            },
        });
    });

    // Cancel friend
    $(document).on('click', "button.cancel-friend", function(e) {
        // console.log("Refuse!");
        let contactId = sessionStorage.getItem("userId");
        let userId = $("p.list-friend").text().trim();
        console.log(userId);
        $.ajax({
            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/cancel-friend/" + userId + "/" + contactId,
            type: "POST",
            contentType: false,
            success: function(result){
                $(document).off('click', ".cancel-friend");
                $(".profile-success").parents().eq(0).attr("href", "#");
                $(".profile-success").parents().eq(0).click(function(e) {
                    e.preventDefault();
                    //do other stuff when a click happens
                });
                $(".profile-success").text("Đã hủy kết bạn");
                $(".exampleModal1").remove();
            },
            error: function(result){
                $(document).off('click', ".cancel-friend");
                $(".profile-success").parents().eq(0).attr("href", "#");
                $(".profile-success").parents().eq(0).click(function(e) {
                    e.preventDefault();
                    //do other stuff when a click happens
                });                
                $(".profile-success").text("Đã hủy kết bạn");
                $(".exampleModal1").remove();
            },
        });
    });
});