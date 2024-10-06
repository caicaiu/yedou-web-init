import request from "./index";
export type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
};


export type UserLoginByEmailRequest = {
    code?: string;
    userEmail?: string;
};

export type LoginUserVO = {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userPicUrl?: string;
    tags: []
    userName?: string;
    userProfile?: string;
    userRole?: string;
};






/**
 * 获取用户登录信息
 */
export function getLoginUserPermitNullUsingGet() {
    return request({
        method: 'GET',
        url: '/user/get/login-permit-null',
    })
}


/**
 * 退出登录
 */
export function userLogoutUsingPost() {
    return request({
        method: 'POST',
        url: '/user/logout',
    })
}


export function userLoginByAccountUsingPost(userLoginRequest: UserLoginRequest) {
    return request({
        method: "POST",
        url: '/user/login/account',
        data: userLoginRequest
    })
}

export function userLoginByEmailUsingPost(userLoginByEmailRequest: UserLoginByEmailRequest) {
    return request({
        method: 'POST',
        url: '/user/login/email',
        data: userLoginByEmailRequest,
    })
}

export function sendEmailCodeUsingPost(email: string) {
    return request({
        method: 'POST',
        url: '/user/send-email-code',
        params: {
            'email': email,
        },
    })
}

