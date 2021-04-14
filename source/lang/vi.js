export const transValidation = {
    email_incorrect: "Email phải có dạng abc@gmail.com",
    password_incorrect: "Mật khẩu không chính xác"
};

export const transErrors = {
    account_in_use: "Email này đã được sử dụng.",
    account_removed: "Tài khoản này đã được gỡ khỏi hệ thống.",
    account_not_active: "Email đã được đăng ký, vui lòng kiểm tra Email để kích hoạt tài khoản."
};

export const transSuccess = {
    userCreated: (userEmail) => {
        return `Tài khoản <strong>${userEmail}</strong> đã được tạo, vui lòng kiểm tra email để active tài khoản.`;
    }
};