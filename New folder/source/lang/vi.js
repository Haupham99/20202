export const transValidation = {
    email_incorrect: "Email phải có dạng abc@gmail.com",
    password_incorrect: "Mật khẩu không chính xác"
};

export const transErrors = {
    wrong_account: "Email này chưa được dùng để tạo tài khoản",
    account_in_use: "Email này đã được sử dụng.",
    account_removed: "Tài khoản này đã được gỡ khỏi hệ thống.",
    account_not_active: "Email đã được đăng ký, vui lòng kiểm tra Email để kích hoạt tài khoản.",
    token_undefined: "Token không tồn tại!",
    account_not_found: "Email chưa được đăng ký",
    account_wrong_password: "Mật khẩu không chính xác",
    server_error: "Server falied!",
    avatar_type: "Kiểu file không hợp lệ, chỉ chấp nhận file png, jpg, jpeg",
    avatar_update_failed: "Cập nhật thất bại",
    old_password_incorrect: "Mật khẩu cũ không chính xác",
    new_password_not_changed: "Mật khẩu mới không được trùng với mật khẩu cũ",
    confirm_password_wrong: "Mật khẩu mới không khớp"
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để active tài khoản.`;
    },
    account_actived: "Kích hoạt tài khoản thành công, bạn đã có thể đăng nhập vào ứng dụng.",
    account_login: "Đăng nhập thành công",
    avatar_updated: "Cập nhật thành công",
    password_updated: "Cập nhật mật khẩu thành công",
    reset_send: "Vui lòng kiểm tra email để đổi mật khẩu mới"
};

export const transMail = {
    subject: "SOICT NET: Xác nhận kích hoạt tài khoản.",
    template: (linkVerify) => {
        return `
            <h2>Bạn nhận được email này vì đã đăng ký tài khoản trên ứng dụng SoictNet.</h2>
            <h3>Vui lòng click vào liên kết bên dưới để xác nhận tài khoản.</h3>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
            <h4>Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó.</h4>
        `;
    },
    send_failed: "Có lỗi trong quá trình gửi email vui lòng liên hệ admin"
};

export const transMailResetPassWord = {
    subject: "SOICT NET: Xác nhận đổi mật khẩu.",
    template: (linkVerify) => {
        return `
            <h3>Vui lòng click vào liên kết bên dưới để thay đổi mật khẩu.</h3>
            <h3><a href="${linkVerify}" target="blank">${linkVerify}</a></h3>
            <h4>Nếu tin rằng email này là nhầm lẫn, hãy bỏ qua nó.</h4>
        `;
    },
    send_failed: "Có lỗi trong quá trình gửi email vui lòng liên hệ admin"
};