$("document").ready(function(){
    $(".friend-all").click(function(){
        $(".friend").removeClass("active");
        $(".friend-all").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend").css("display", "block");
    });
    // List student request
    $(".friend-request").click(function(){
        $(".friend").removeClass("active");
        $(".friend-request").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend-request").css("display", "block");
        let userId = sessionStorage.getItem("userId");
        $.ajax({

            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/member-request/",
            type: "GET",
            contentType: false,
            success: function(result){
                $(".list-friend-request .chat_list").empty();
                if(result.data.length == 0) {
                    $(".list-friend-request .chat_list").append(`<p>Không có yêu cầu tham gia mới nào</p>`)
                }else{
                    $(".list-friend-request .chat_list").append(`<p>Có ` + result.data.length + ` yêu cầu tham gia mới </p>`)
                }
                for(var i = 0; i < result.data.length; i++){
                    $(".list-friend-request .chat_list").append(`
                    <div class="chat_people">
                    <p class="accept-friend" style="display: none">` + result.data[i]._id + `</p>
                    <div class="chat_img"><a href="` + result.data[i].email.split("@")[0] + `"> <img src="images/` + result.data[i]["avatar"] + `" alt="sunil"></a> </div>
                    <div class="chat_ib">
                    <h5 style="font-weight: bold">` + result.data[i].username + ` <span class="chat_date">
                        <button class="btn btn-success accept-friend">Phê duyệt</button>
                        <button type="button" class="btn btn-danger exampleModal2" data-toggle="modal" data-target="#exampleModal2">
                           Từ chối
                         </button>
                        </span>
                    </h5>
                    <small>Email: ` + result.data[i].email + `</small>
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

    // Accept student
    $(document).on('click', ".accept-friend", function(e) {
        a = $(this);
        // console.log("Clicked");
        let userId = a.parents().eq(3).find("p.accept-friend").text();
        // console.log(userId, contactId);
        $.ajax({

            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/accept-member/" + userId,
            type: "POST",
            contentType: false,
            success: function(result){
                a.removeClass("accept-friend");
                a.text("Thành viên lớp");
                a.parents().eq(0).find(".exampleModal2").remove();
            },
            error: function(result){
                a.removeClass("accept-friend");
                a.text("Thành viên lớp");
                a.parents().eq(0).find(".exampleModal2").remove();
            },
        });
    });

    // Refuse accept student
    $(document).off('click', "button.exampleModal2").on('click', "button.exampleModal2", function(e) {
        let a = $(this);
        $(document).off('click', ".refuse-accept-friend").on('click', ".refuse-accept-friend", function(e) {
            // console.log("Refuse!");
            let userId = a.parents().eq(3).find("p.accept-friend").text();
            // console.log(userId, contactId);
            $.ajax({
                // url: "/personal/post/:postId/:userId/:userIdPost/:like",
                url: "/refuse-accept-member/" + userId,
                type: "POST",
                contentType: false,
                success: function(result){
                    a.parents().eq(0).find('button.accept-friend').text("Đã từ chối yêu cầu tham gia");
                    a.parents().eq(0).find('button.accept-friend').removeClass("accept-friend");
                    a.remove();
                },
                error: function(result){
                    a.parents().eq(0).find('button.accept-friend').text("Đã từ chối yêu cầu tham gia");
                    a.parents().eq(0).find('button.accept-friend').removeClass("accept-friend");
                    a.remove();
                },
            });
        });
    });

    // Cancel student
    $(document).off('click', "button.exampleModal1").on('click', "button.exampleModal1", function(e) {
        let a = $(this);
        $(document).off('click', "button.cancel-friend").on('click', "button.cancel-friend", function(e) {
            // console.log("Refuse!");
            let userId = a.parents().eq(3).find("p.list-friend").text().trim();
            // console.log("userId: ", userId);
            // console.log("contactId: ", contactId);
            // console.log(a.parents().eq(0).find('a button.profile-success').text());
            $.ajax({
                // url: "/personal/post/:postId/:userId/:userIdPost/:like",
                url: "/cancel-member/" + userId,
                type: "POST",
                contentType: false,
                success: function(result){
                    a.removeClass("exampleModal1");
                    a.parents().eq(0).find('a button.profile-success').parents().eq(0).attr("href", "#");
                    a.parents().eq(0).find('a button.profile-success').parents().eq(0).click(function(e) {
                        e.preventDefault();
                        //do other stuff when a click happens
                    });
                    a.parents().eq(0).find('a button.profile-success').text("Đã xóa thành viên");
                    a.remove();
                },
                error: function(result){
                    a.removeClass("exampleModal1");
                    a.parents().eq(0).find('a button.profile-success').parents().eq(0).attr("href", "#");
                    a.parents().eq(0).find('a button.profile-success').parents().eq(0).click(function(e) {
                        e.preventDefault();
                        //do other stuff when a click happens
                    });
                    a.parents().eq(0).find('a button.profile-success').text("Đã xóa thành viên");
                    a.remove();
                },
            });
        });
    });
    
    // Update Cover Image
    $('#edit-profile').one('click', function(e) {  
        e.preventDefault();      
        console.log("update-image");
        $("#choose-image").click();
        $('#choose-image').change(function() {
            let groupId = sessionStorage.getItem('groupId');
            var filename = $('#choose-image').val();
            console.log(filename.split('\\')[filename.split('\\').length-1]);
            console.log(groupId);
            $("#cover-img").attr('src', 'images/' + filename.split('\\')[filename.split('\\').length-1]);
            $.ajax({

                // url: "/personal/post/:postId/:userId/:userIdPost/:like",
                url: "/group/update-cover/" + groupId + '/' + filename.split('\\')[filename.split('\\').length-1],
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

    // Send friend request
    // $(document).on('click', ".send-friend-request", function(e) {
    //     let a = $(this);
    //     // console.log("Clicked");
    //     let userId = sessionStorage.getItem("userId");
    //     let contactId = a.parents().eq(3).find('p').text();
    //     // console.log(userId);
    //     // console.log(contactId);
    //     $.ajax({

    //         // url: "/personal/post/:postId/:userId/:userIdPost/:like",
    //         url: "/send-friend-request/" + userId + "/" + contactId,
    //         type: "POST",
    //         contentType: false,
    //         success: function(result){
    //             a.removeClass("send-friend-request");
    //             a.text("Đã gửi lời mời kết bạn");
    //             a.parents().eq(0).find(".exampleModal3").remove();
    //         },
    //         error: function(result){
    //             a.removeClass("send-friend-request");
    //             a.text("Đã gửi lời mời kết bạn");
    //             a.parents().eq(0).find(".exampleModal3").remove();
    //         },
    //     });
    // });

    // Refuse suggest friend
    // $(document).off('click', "button.exampleModal3").on('click', "button.exampleModal3", function(e) {
    //     let a = $(this);
    //     $(document).off('click', ".refuse-suggest-friend").on('click', ".refuse-suggest-friend", function(e) {
    //         // console.log("Refuse suggest!");
    //         a.parents().eq(0).find('button.send-friend-request').text("Đã xóa đề nghị kết bạn");
    //         a.parents().eq(0).find('button.send-friend-request').removeClass("send-friend-request");
    //         a.remove();
    //     });
    // });
});