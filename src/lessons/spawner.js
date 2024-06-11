

export class Spawner {
    constructor({app, create }) {
        const spawnInterval = 1000  // millisecund
        this.maxSpawns = 10
        this.create = create
        this.app = app
        this.spawns = []
        setInterval(() => this.spawn(), spawnInterval)
    }

    spawn() {
        if(this.app.gameStarted === false) return
        if (this.spawns.length >= this.maxSpawns) return
        let s = this.create()
        this.spawns.push(s)
    }

}
