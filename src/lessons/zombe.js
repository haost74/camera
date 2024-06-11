import { Application } from '@pixi/app'
import { Sprite } from '@pixi/sprite'
import { Button, Input, ScrollBox } from '@pixi/ui'
import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'
import { Texture, Renderer, Ticker, extensions } from '@pixi/core'
import { EventSystem } from "@pixi/events";

import { NineSlicePlane } from '@pixi/mesh-extras'
import { Text, TextStyle } from '@pixi/text'
import { TilingSprite } from '@pixi/sprite-tiling'
import { Loader } from '@pixi/loaders'

import { InteractionManager } from '@pixi/interaction'
import Victor from 'victor'

export class Zombi {
    constructor({ app, player }) {
        this.app = app
        this.player = player

        const radius = 16
        this.speed = 3
        this.zombi = new Graphics()
        let r = this.randomSapwnPoint()
        this.zombi.position.set(r.x, r.y)
        this.zombi.beginFill(0xFF0000, 1)
        this.zombi.drawCircle(0, 0, radius)
        this.zombi.endFill()
        this.app.stage.addChild(this.zombi)
    }

    attackPlayer() {
        if (this.attacking) return
        this.attacking = true

        this.interval = setInterval(() => {
            this.player.attack()
        }, 500);

        // let r = this.randomSapwnPoint()
        // this.zombi.position.set(r.x, r.y)
    }

    update(delta) {
        let e = new Victor(this.zombi.position.x, this.zombi.position.y)
        let s = new Victor(this.player.position.x, this.player.position.y)

        if (e.distance(s) < this.player.width / 2) {
            this.attackPlayer()
            return
        }

        let d = s.subtract(e)
        let v = d.normalize().multiplyScalar(this.speed * delta)
        this.zombi.position.set(this.zombi.position.x + v.x, this.zombi.position.y + v.y)
    }

    kill() {
        this.app.stage.removeChild(this.zombi)
        clearInterval(this.interval)
    }

    get position() {
        return this.zombi.position
    }

    randomSapwnPoint() {
        let enge = Math.floor(Math.random() * 4)
        let spawnPoint = new Victor(0, 0)
        switch (enge) {
            //top
            case 0:
                spawnPoint.x = this.app.view.width * Math.random()
                break
            // right
            case 1:
                spawnPoint.x = this.app.view.width
                spawnPoint.y = this.app.view.height * Math.random()
                break
            // left
            case 2:
                spawnPoint.y = this.app.view.height * Math.random()
                break
            // bottom
            case 3:
                spawnPoint.y = this.app.view.height
                spawnPoint.x = this.app.view.width * Math.random()
                break

            default:
                break;
        }

        return spawnPoint
    }
}