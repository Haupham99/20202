$("document").ready(function() {
    // Get notification from database
    let userId = sessionStorage.getItem("userId");
    $.ajax({
        url: "/notification/" + userId,
        type: "GET",
        contentType: false,
        success: function(result){
            console.log(result);
            $("#notification_count").text(result.total);
            let data = result.data;
            for(let i = 0; i < data.length; i++){
                let notif = "";
                if(data[i].isRead){
                    notif = `<div class="notif-line" style="background-color: #fff"><p style="display: none">${data[i]._id}</p><span data-uid="${data[i].sender.id}"> 
                    <img class="rounded-circle" src="images/${data[i].sender.avatar}" width="40px" alt="">
                    <strong>${data[i].sender.username}</strong> ${data[i].content}
                    </span><br></div>`;
                }else{
                    notif = `<div class="notif-line"><p style="display: none">${data[i]._id}</p><span data-uid="${data[i].sender.id}"> 
                    <img class="rounded-circle" src="images/${data[i].sender.avatar}" width="40px" alt="">
                    <strong>${data[i].sender.username}</strong> ${data[i].content}
                    </span><br></div>`;
                }
                
                $("#notificationsBody").prepend(notif);
            }
        },
        error: function(result){
            console.log(result);
        },
    });

    // $("#notificationLink").click(function(){
    //     console.log("!noti");
    //     $(this).css("background-color", "#006699");
    // })

    // Show notification
    $("#notificationLink").click(function() {
        // console.log(1);
        $("#notificationContainer").fadeToggle(300);
        $("#notification_count").fadeOut("slow");
        $("document").click(function() {
            // console.log(2);
            $("#notificationContainer").hide();
        });
        if($("#notificationContainer").is(":visible")){
            // console.log("hide");
            $("#notification_count").css("display", "block");
        }
        return false;
    });
    

    //Document Click
    $(window).click(function() {
        //Hide the menus if visible
        // console.log(2);
        $("#notificationContainer").hide();
        $("#notification_count").show();
    });
    //Popup Click
    $("#notificationContainer").click(function() {
        // console.log(3);
        return false
    });

    //Read Notification
    $("#notificationsBody").on("click", ".notif-line", function(){
        // console.log("Click notif!");
        $(this).css("background-color", "#fff");
        let totalNofi = parseInt($("#notification_count").text());
		// console.log(totalNofi);
		$("#notification_count").text(totalNofi - 1);
        let a = $(this);
        let notificationId = a.find('p').text();
        $.ajax({
            url: "/notification/read/" + notificationId,
            type: "POST",
            contentType: false,
            success: function(result){
                console.log(result);
                // for(let i = 0; i < data.length; i++){
                    
                // }
            },
            error: function(result){
                console.log(result);
            },
        });
    });

    //See detail notification

});