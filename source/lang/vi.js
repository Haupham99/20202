export const transValidation = {
    email_incorrect: "Email phải có dạng abc@gmail.com",
    password_incorrect: "Mật khẩu không chính xác"
};

export const transErrors = {
    account_in_use: "Email này đã được sử dụng.",
    account_removed: "Tài khoản này đã được gỡ khỏi hệ thống.",
    account_not_active: "Email đã được đăng ký, vui lòng kiểm tra Email để kích hoạt tài khoản.",
    token_undefined: "Token không tồn tại!"
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để active tài khoản.`;
    },
    account_actived: "Kích hoạt tài khoản thành công, bạn đã có thể đăng nhập vào ứng dụng."
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