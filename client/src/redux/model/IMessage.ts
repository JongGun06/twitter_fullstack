export interface messagess {
    text: string
    author: string
    createDate: string
    img:string
}

export interface IMessage {
    _id?:string
    id:string
    sender: string 
    receiver: string
    messages: messagess[]
    createDate: string
}