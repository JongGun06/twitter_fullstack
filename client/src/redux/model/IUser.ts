
export interface Subscriptions {
    user: string
    avatar:string
    name:string
}
export interface LikesPost {
    post:string
    author:string
    state: boolean
}
export interface IMess {
    author: string
    messagesID: string
}

export interface IUser{
    _id?:string
    googleId?: string 
    name?: string
    avatar?: string
    email?:string
    registrationDate?: string
    subscriptions?: Subscriptions[]
    subscribers?: Subscriptions[]
    likesPosts?:LikesPost[]
    bookmarks?:LikesPost[]
    reposts?:LikesPost[]
    posts?:LikesPost[]
    messages?: IMess[]
}