$("document").ready(function(){
    $(".submit").click(function() {
        let group = $('#group option:selected').attr('value');
        let year = $('#year option:selected').attr('value');
        let identify = group + "-K" + year;
        $.ajax({
            url: "/manage-group/" + identify,
            type: "GET",
            contentType: false,
            success: function(result){
                let data = result["data"];
                // console.log(data);
                $(".chat_list").empty();
                $(".chat_list").append(`<p>Có ` + data.length + ` thành viên</p>`);
                $(".chat_list").append(`<h3 style="margin-bottom: 10px">Giáo viên</h3>`);
                data.forEach(member => {
                    if(member["role"] == "teacher"){
                        $(".chat_list").append(`<div class="chat_people">
                    <p class="list-friend" style="display: none">`+ member['id'] +`</p>
                    <div class="chat_img"><a href="/` + member.email.split('@')[0] + `"><img src="images/` + member.avatar + `" alt="sunil"></a></div>
                    <div class="chat_ib">
                       <h5 style="font-weight: bold;">` + member.username + `<span class="chat_date">
                          <a href="/` + member.email.split('@')[0] + `"><button class="btn btn-success profile-success">Trang cá nhân</button></a>
                          <!-- <button type="button" class="btn btn-danger" id="cancel-friend" data-toggle="modal" data-target="#cancel-friend">Hủy kết bạn</button> -->
                          <button type="button" class="btn btn-danger exampleModal1" data-toggle="modal" data-target="#exampleModal1">
                             Xóa khỏi nhóm
                           </button>
                          </span>
                       </h5>
                       <small>Email: ` + member.email + `</small>
                    </div>
                    </div>`);
                    }
                });
                $(".chat_list").append(`<h3>Sinh viên</h3>`)
                data.forEach(member => {
                    if(member["role"] == "user"){
                        $(".chat_list").append(`<div class="chat_people">
                    <p class="list-friend" style="display: none">`+ member['id'] +`</p>
                    <div class="chat_img"><a href="/` + member.email.split('@')[0] + `"><img src="images/` + member.avatar + `" alt="sunil"></a></div>
                    <div class="chat_ib">
                       <h5 style="font-weight: bold;">` + member.username + `<span class="chat_date">
                          <a href="/` + member.email.split('@')[0] + `"><button class="btn btn-success profile-success">Trang cá nhân</button></a>
                          <!-- <button type="button" class="btn btn-danger" id="cancel-friend" data-toggle="modal" data-target="#cancel-friend">Hủy kết bạn</button> -->
                          <button type="button" class="btn btn-danger exampleModal1" data-toggle="modal" data-target="#exampleModal1">
                             Xóa khỏi nhóm
                           </button>
                          </span>
                       </h5>
                       <small>Email: ` + member.email + `</small>
                    </div>
                    </div>`);
                    }
                });
            },
            error: function(result){
                console.log(result);
            },
        });
    });

    $(".friend-all").click(function(){
        $(".friend").removeClass("active");
        $(".friend-all").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend").css("display", "block");
    });
    // List student request
    $(".friend-request").click(function(){
        $(".chat_list").empty();
        $(".form").empty();
        $(".form").append(`<div class="form-group" style="margin-right: 10px;">
        <label for="year" style="font-weight: bold;">Khóa</label>
        <select class="form-control" name="year" id="year">
         <option value="65" selected>65</option>
         <option value="64">64</option>
         <option value="63">63</option>
         <option value="62">62</option>
         <option value="61">61</option>
         <option value="60">60</option>
         <option value="59">59</option>
         <option value="58">58</option>
         <option value="57">57</option>
         <option value="56">56</option>
         <option value="55">55</option>
         <option value="54">54</option>
         <option value="53">53</option>
         <option value="52">52</option>
         <option value="51">51</option>
         <option value="50">50</option>
       </select>
        </div>
        <div class="form-group" style="margin-right: 10px;">
           <label for="major" style="font-weight: bold;">Chọn viện</label>
           <select class="form-control" name="major" id="major">
            <option value="CNTT" selected>Công nghệ thông tin và truyền thông</option>
            <option value="">Điện</option>
            <option value="">Kỹ thuật hóa học</option>
            <option value="">Cơ khí</option>
            <option value="">Điện tử - viễn thông</option>
            <option value="">Kinh tế - quản lý</option>
            <option value="">Ngoại ngữ</option>
            <option value="">Sư phạm kỹ thuật</option>
            <option value="">Toán ứng dụng và tin học</option>
            <option value="">Cơ khí động lực</option>
            <option value="">Khoa học và công nghệ môi trường</option>
          </select>
       </div>
        <div class="form-group" style="margin-right: 30px;">
            <label for="group" name="group" style="font-weight: bold;">Chọn lớp</label>
            <select class="form-control" id="group">
             <option value="KHMT-01" selected>KHMT-01</option>
             <option value="KHMT-02">KHMT-02</option>
             <option value="KHMT-03">KHMT-03</option>
             <option value="KHMT-04">KHMT-04</option>
             <option value="KHMT-05">KHMT-05</option>
           </select>
        </div>
        <div class="form-group" style="margin-right: 10px">
            <label for="">. </label>
            <button type="submit" class="form-control btn btn-danger submit-request">Tìm</button>
        </div>`);
        $(".form").append(`<div class="form-group">
        <label for="">. </label>
        <button type="submit" class="form-control btn btn-danger submit-all">Tất cả</button>
        </div>`);
        $(".friend").removeClass("active");
        $(".friend-request").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend-request").css("display", "block");
        let userId = sessionStorage.getItem("userId");
        $(".submit-request").click(function(){
            let group = $('#group option:selected').attr('value');
            let year = $('#year option:selected').attr('value');
            let identify = group + "-K" + year;
            $.ajax({

            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/manage-member-request/" + identify,
            type: "GET",
            contentType: false,
            success: function(result){
                $(".list-friend-request .chat_list").empty();
                if(result.data.length == 0) {
                    $(".list-friend-request .chat_list").append(`<p>Không có yêu cầu tham gia mới nào</p>`)
                }else{
                    $(".list-friend-request .chat_list").append(`<p>Có ` + result.data.length + ` yêu cầu tham gia mới </p>`)
                }
                $(".list-friend-request .chat_list").append(`<h3 style="margin-bottom: 10px">Giáo viên</h3>`);
                for(var i = 0; i < result.data.length; i++){
                    if(result.data[i].role == "teacher"){
                        $(".list-friend-request .chat_list").append(`
                    <div class="chat_people">
                    <p class="accept-friend" style="display: none">` + result.data[i].id + `</p>
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
                    }
                };
                $(".list-friend-request .chat_list").append(`<h3 style="margin-bottom: 10px">Sinh viên</h3>`);
                for(var i = 0; i < result.data.length; i++){
                    if(result.data[i].role == "user"){
                        $(".list-friend-request .chat_list").append(`
                    <div class="chat_people">
                    <p class="accept-friend" style="display: none">` + result.data[i].id + `</p>
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
                    }
                };
            },
            error: function(result){
                // console.log(result);
            },
        });
        })
        $(".submit-all").click(function(){
            $.ajax({

            // url: "/personal/post/:postId/:userId/:userIdPost/:like",
            url: "/manage-member-request-all/" ,
            type: "GET",
            contentType: false,
            success: function(result){
                $(".list-friend-request .chat_list").empty();
                if(result.data.length == 0) {
                    $(".list-friend-request .chat_list").append(`<p>Không có yêu cầu tham gia mới nào</p>`)
                }else{
                    $(".list-friend-request .chat_list").append(`<p>Có ` + result.data.length + ` yêu cầu tham gia mới </p>`)
                }
                $(".list-friend-request .chat_list").append(`<h3 style="margin-bottom: 10px">Giáo viên</h3>`);
                for(var i = 0; i < result.data.length; i++){
                    if(result.data[i].role == "teacher"){
                        $(".list-friend-request .chat_list").append(`
                    <div class="chat_people">
                    <p class="accept-friend" style="display: none">` + result.data[i].id + `</p>
                    <div class="chat_img"><a href="` + result.data[i].email.split("@")[0] + `"> <img src="images/` + result.data[i]["avatar"] + `" alt="sunil"></a> </div>
                    <div class="chat_ib">
                    <h5 style="font-weight: bold">` + result.data[i].username + ` <span class="chat_date">
                        <button class="btn btn-success accept-friend">Phê duyệt</button>
                        <button type="button" class="btn btn-danger exampleModal2" data-toggle="modal" data-target="#exampleModal2">
                           Từ chối
                         </button>
                        </span>
                    </h5>
                    <small style="display: block">Email: ` + result.data[i].email + `</small>
                    <small>Lớp: ` + result.data[i].group + `</small>
                    </div>
                    </div>
                    `);
                    }
                };
                $(".list-friend-request .chat_list").append(`<h3 style="margin-bottom: 10px">Sinh viên</h3>`);
                for(var i = 0; i < result.data.length; i++){
                    if(result.data[i].role == "user"){
                        $(".list-friend-request .chat_list").append(`
                    <div class="chat_people">
                    <p class="accept-friend" style="display: none">` + result.data[i].id + `</p>
                    <div class="chat_img"><a href="` + result.data[i].email.split("@")[0] + `"> <img src="images/` + result.data[i]["avatar"] + `" alt="sunil"></a> </div>
                    <div class="chat_ib">
                    <h5 style="font-weight: bold">` + result.data[i].username + ` <span class="chat_date">
                        <button class="btn btn-success accept-friend">Phê duyệt</button>
                        <button type="button" class="btn btn-danger exampleModal2" data-toggle="modal" data-target="#exampleModal2">
                           Từ chối
                         </button>
                        </span>
                    </h5>
                    <small style="display: block">Email: ` + result.data[i].email + `</small>
                    <small>Lớp: ` + result.data[i].group + `</small>
                    </div>
                    </div>
                    `);
                    }
                };
            },
            error: function(result){
                // console.log(result);
            },
        });
        })
    });

    // Accept student
    $(document).on('click', ".accept-friend", function(e) {
        a = $(this);
        // console.log("Clicked");
        let userId = a.parents().eq(3).find("p.accept-friend").text();
        // console.log(userId, contactId);
        console.log(userId);
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



    // Request join Group
});