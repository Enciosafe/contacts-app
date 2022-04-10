class Folder {
    constructor(title, description) {
        this.id = new Date().toString() + Math.random().toString()
        this.title = title
        this.description = description
    }

}

export default Folder
