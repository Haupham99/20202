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

    // Accept student


    // Refuse accept student


    // Cancel student


    let facultyElement = $(".faculty").html();
    // console.log(facultyElement);
    // Get list group
    $("#faculty").change(function(){
        facultyId = $(this).val();
        $.ajax({
            url: "/faculty/" + facultyId,
            type: "GET",
            contentType: false,
            success: function(result){
                $("#group").empty();
                let data = result["data"];
                for(var i = 0; i < data.length; i++){
                    $("#group").append(`<option value="` + data[i]["_id"] + `">` + data[i]["groupName"] + `</option>`)
                }
            },
            error: function(result){
                console.log(result);
            },
        });
    });

    // Search
    $(document).off('click', "#search").on('click', '#search', function(){
    // $("#search").click(function(){
        // console.log("search!");
        groupId = $("#group").val();
        // console.log(groupId);
        $.ajax({
            url: "/group/" + groupId,
            type: "GET",
            contentType: false,
            success: function(result){
                $(".list-friend .chat_list").empty();
                $(".chat_list").append(`<p>Có ` + result.data.length + ` thành viên</p>`);
                for(var i = 0; i < result.data.length; i++){
                    let role = "Sinh viên";
                    console.log(typeof result.data[i].roleId);
                    if(result.data[i].roleId === "60caf972479ac7b0ce81cd44"){
                        role = "Sinh viên";
                    }else{
                        role = "Quản trị lớp";
                    }
                        $(".list-friend .chat_list").append(`
                    <div class="chat_people">
                    <p class="accept-friend" style="display: none">` + result.data[i].id + `</p>
                    <div class="chat_img"><a href="` + result.data[i].email.split("@")[0] + `"> </a> </div>
                    <div class="chat_ib">
                    <h5 style="font-weight: bold">` + result.data[i].email + ` <span class="chat_date">
                        <button class="btn btn-success edit-member">Sửa lớp</button>
                        <p class="roleId" style="display: none;">`+result.data[i].roleId+`</p>
                        <p class="groupId" style="display: none;">`+result.data[i].groupId+`</p>
                        <p class="email" style="display: none;">`+result.data[i].email+`</p>
                        </span>
                    </h5>
                    <small>Chức vụ: ` + role + `</small>
                    </div>
                    </div>
                    `);
                };
            },
            error: function(result){
                console.log(result);
            },
        });
    });

    // Add member
    $(".friend-request").click(function(){
        $(".chat_list").empty();
        $(".form").empty();
        $(".form").css("display", "block");
        $(".form").append(`
        <div class="form-group">
           <label for="email" style="font-weight: bold;">Nhập Email</label>
           <input id="email" type="email" name="email">
       </div>
       <div class="form-group role">
           <label for="role" style="font-weight: bold; display: block">Chức vụ</label>
           <input type="radio" id="student" name="role" value="60caf972479ac7b0ce81cd44" checked>
            <label for="student">Học sinh</label><br>
            <input type="radio" id="teacher" name="role" value="60caf98f479ac7b0ce81cd54">
            <label for="teacher">Quản trị lớp</label><br>
       </div>`
        + facultyElement +
        `<div class="form-group" style="margin-right: 0px;">
            <label for="group" name="group" style="font-weight: bold;">Chọn lớp</label>
            <select id="group1" class="form-control">
             <option value="">Chọn lớp</option>
           </select>
        </div>`);
        $(".form").append(`<div class="form-group">
        <label for="">. </label>
        <button type="submit" class="form-control btn btn-danger submit-all">Submit</button>
        </div>`);
        $("#faculty").attr("id", "faculty1");
        $(".friend").removeClass("active");
        $(".friend-request").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend-request").css("display", "block");
        let userId = sessionStorage.getItem("userId");
        $(".submit-all").click(function(){
            let email = $("#email").val();
            let roleId = $('input[name=role]:checked', '.role').val();
            let groupId = $("#group1").val();
            if(email == "" || roleId == "" || groupId == ""){
                alert("Hãy nhập đủ thông tin!");
            }else{
                console.log(email, roleId, groupId);
                $.ajax({
                    // url: "/personal/post/:postId/:userId/:userIdPost/:like",
                    url: "/member/add/" + email + "/" + groupId + "/" + roleId,
                    type: "POST",
                    contentType: false,
                    success: function(result){
                        alert(result.data);
                    },
                    error: function(result){
                        alert(result.data);
                    },
                });
            }
        })
    });

    // Get list group
    $(document).off('change', "#faculty1").on('change', "#faculty1", function(){
        facultyId = $(this).val();
        console.log(facultyId);
        $.ajax({
            url: "/faculty/" + facultyId,
            type: "GET",
            contentType: false,
            success: function(result){
                $("#group1").empty();
                let data = result["data"];
                for(var i = 0; i < data.length; i++){
                    $("#group1").append(`<option value="` + data[i]["_id"] + `">` + data[i]["groupName"] + `</option>`)
                }
            },
            error: function(result){
                console.log(result);
            },
        });
    });

    // Edit member
    $(document).off('click', ".edit-member").on("click", ".edit-member", function(){
        let a = $(this);
        console.log(a);
        $(".chat_list").empty();
        $(".form").empty();
        $(".form").css("display", "block");
        $(".form").append(`
        <div class="form-group">
           <label for="email2" style="font-weight: bold;">Email</label>
           <input disabled id="email2" type="text" name="email2">
       </div>
       <div class="form-group role2">
           <label for="role2" style="font-weight: bold; display: block">Chức vụ</label>
           <input type="radio" id="student" name="role2" value="60caf972479ac7b0ce81cd44" checked>
            <label for="student">Học sinh</label><br>
            <input type="radio" id="teacher" name="role2" value="60caf98f479ac7b0ce81cd54">
            <label for="teacher">Quản trị lớp</label><br>
       </div>`
        + facultyElement +
        `<div class="form-group" style="margin-right: 0px;">
            <label for="group2" name="group2" style="font-weight: bold;">Chọn lớp</label>
            <select id="group2" class="form-control">
             <option value="">Chọn lớp</option>
           </select>
        </div>`);
        $(".form").append(`<div class="form-group">
        <label for="">. </label>
        <button type="submit" class="form-control btn btn-danger submit-edit">Cập nhật</button>
        </div>`);
        $("#faculty").attr("id", "faculty2");
        // $(".friend").removeClass("active");
        // $(".friend-request").addClass("active");
        // $(".friend-tab").css("display", "none");
        // $(".list-friend-request").css("display", "block");
        // let roleId = a.parents().eq(0).find('p.roleId').text();
        let email2 = a.parents().eq(0).find('p.email').text();
        // let groupId = a.parents().eq(0).find('p.groupId').text();
        // console.log(roleId, email, groupId);
        $("#email2").val(email2);
        $(".submit-edit").click(function(){
            let email = $("#email2").val();
            let roleId = $('input[name=role2]:checked', '.role2').val();
            let groupId = $("#group2").val();
            
            if(email == "" || roleId == "" || groupId == ""){
                alert("Hãy nhập đủ thông tin!");
            }else{
                // console.log(email, roleId, groupId);
                $.ajax({
                    // url: "/personal/post/:postId/:userId/:userIdPost/:like",
                    url: "/member/edit/" + email + "/" + groupId + "/" + roleId,
                    type: "POST",
                    contentType: false,
                    success: function(result){
                        alert(result.data);
                    },
                    error: function(result){
                        alert(result.data);
                    },
                });
            }
        })
    });

    // Get list group
    $(document).off('change', "#faculty2").on('change', "#faculty2", function(){
        facultyId = $(this).val();
        console.log(facultyId);
        $.ajax({
            url: "/faculty/" + facultyId,
            type: "GET",
            contentType: false,
            success: function(result){
                $("#group2").empty();
                let data = result["data"];
                for(var i = 0; i < data.length; i++){
                    $("#group2").append(`<option value="` + data[i]["_id"] + `">` + data[i]["groupName"] + `</option>`)
                }
            },
            error: function(result){
                console.log(result);
            },
        });
    });

    // Add faculty
    $(".add-faculty").click(function(){
        $(".chat_list").empty();
        $(".form").empty();
        $(".form").css("display", "block");
        $(".form").append(`
        <div class="form-group">
           <label for="add-faculty" style="font-weight: bold;">Nhập tên viện</label>
           <input id="add-faculty" type="text" name="add-faculty">
       </div>
       `);
        $(".form").append(`<div class="form-group">
        <label for="">. </label>
        <button type="submit" class="form-control btn btn-danger submit-faculty">Submit</button>
        </div>`);
        // $("#faculty").attr("id", "faculty1");
        $(".friend").removeClass("active");
        $(".add-faculty").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend-request").css("display", "block");
        let userId = sessionStorage.getItem("userId");
        $(".submit-faculty").click(function(){
            let facultyName = $("#add-faculty").val();
            $.ajax({
                // url: "/personal/post/:postId/:userId/:userIdPost/:like",
                url: "/faculty/add/" + facultyName,
                type: "POST",
                contentType: false,
                success: function(result){
                    // $(".modal-dialog").css("display", "block");
                    alert(result.data);
                },
                error: function(result){
                    alert(result.data);
                },
            });
        })
    });

    $(document).off('click', ".modal-title").on('click', ".modal-title", function(){
        $(".modal-dialog").css("display", "none!important");
    });

    // Add group
    $(".add-group").click(function(){
        $(".chat_list").empty();
        $(".form").empty();
        $(".form").css("display", "block");
        $(".form").append(`
        <div class="form-group">
           <label for="add-group" style="font-weight: bold;">Nhập tên lớp</label>
           <input id="add-group" type="text" name="add-group">
       </div>
       ` + facultyElement);
        $(".form").append(`<div class="form-group">
        <label for="">. </label>
        <button type="submit" class="form-control btn btn-danger submit-group">Submit</button>
        </div>`);
        // $("#faculty").attr("id", "faculty1");
        $(".friend").removeClass("active");
        $(".add-group").addClass("active");
        $(".friend-tab").css("display", "none");
        $(".list-friend-request").css("display", "block");
        let userId = sessionStorage.getItem("userId");
        $(".submit-group").click(function(){
            let groupName = $("#add-group").val();
            let facultyId = $("#faculty").val();
            $.ajax({
                // url: "/personal/post/:postId/:userId/:userIdPost/:like",
                url: "/group/add/" + facultyId + "/" + groupName,
                type: "POST",
                contentType: false,
                success: function(result){
                    alert(result.data);
                },
                error: function(result){
                    alert(result.data);
                },
            });
        })
    });
});