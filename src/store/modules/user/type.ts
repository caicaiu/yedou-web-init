export type RoleType = '' | '*' | 'admin' | 'user';

export interface UserState {
    createTime?: string;
    id?: number;
    updateTime?: string;
    userPicUrl?: string;
    tags: []
    userName?: string;
    userProfile?: string;
    userRole?: RoleType;
}
