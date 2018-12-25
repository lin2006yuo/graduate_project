export default class announce{
    constructor({id, title, content, publisher, time}){
        this.id = id
        this.title = title,
        this.content = content,
        this.publisher = publisher,
        this.time = time
    }
}


export function createAnnouce(Announce) {
    return new announce({
        id: Announce._id,
        title: Announce.title,
        content: Announce.content,
        publisher: Announce.pulisher,
        time: Announce.time
    })
}