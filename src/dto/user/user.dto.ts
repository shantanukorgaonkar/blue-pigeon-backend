export interface IUserRegistrationDto {
    firstName: string,
    lastName: string,
    password: string,
    email: string
}

export interface IUserLoginDto {
    password: string,
    email: string
}

export interface IUpdateUserProfileDto {
    interests: string[],
    industry: string[],
    username: string,
    firstName: string,
    lastName: string,
    email: string
}