export interface Comments {
    post_id:string
    text:string 
    author:string 
    likes: number 
    createDate:string
}

export interface Reposts {
    author:string,
}

export interface Bookmark {
    author:string,
}

export interface IPost {
    _id?:string
    author: string 
    text: string 
    images: string
    createDate:string 
    likes:number 
    comments: Comments[]
    reposts: Reposts[]
    bookmarks: Bookmark[]
}