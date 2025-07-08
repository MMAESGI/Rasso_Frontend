export enum UserRoleEnum {
    Default,
    User,
    Admin,
    Organizer,
    Participant
}

export type UserResponse = {
    id: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatarUrl?: string;
    role: UserRoleEnum[];
};
