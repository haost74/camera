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


export class Shooting {
    constructor({ app, player }) {
        this.app = app
        this.player = player
        this.bulletSpeed = 8
        this.bullets = []
        this.bulletRadius = 8
        this.maxBullets = 3
        this.isClick = false

        this.app.renderer.view.addEventListener('pointerdown', (e) => {
            this.isClick = true
        })

        this.app.renderer.view.addEventListener('pointerup', (e) => {
            this.isClick = false
        })


    }


    tire() {
        this.bullets.forEach((b) => this.app.stage.removeChild(b))
        this.bullets = this.bullets.filter((b) =>
            Math.abs(b.position.x) < this.app.view.width &&
            Math.abs(b.position.y) < this.app.view.height
        )

        this.bullets.forEach((b) => this.app.stage.addChild(b))

        const bullet = new Graphics()
        bullet.position.set(this.player.position.x, this.player.position.y)
        bullet.beginFill(0x0000FF, 1)
        bullet.drawCircle(0, 0, this.bulletRadius)
        bullet.endFill()
        let angle = this.player.player.rotation - Math.PI
        bullet.velocity = new Victor(
            Math.cos(angle),
            Math.sin(angle)
        ).multiplyScalar(this.bulletSpeed)

        this.bullets.push(bullet)
        this.app.stage.addChild(bullet)
       // console.log(this.bullets.length, this.app.stage.children.length)
    }

    set shoot(shooting) {
        if (shooting) {
            //this.tire()
            this.interval = setInterval(this.tire(), 500)
            this.isClick = false
        }
        else {

            clearInterval(this.interval)
        }
    }

    update(delta) {

        this.shoot = this.isClick

        this.bullets.forEach(
            b => b.position.set(
                b.position.x + b.velocity.x * delta,
                b.position.y + b.velocity.y * delta)
        )

        // for (let i = 0; i < this.bullets.length; i++) {
        //     if(this.bullets[i].position.x < 0 || 
        //         this.bullets[i].position.y < 0 ||
        //         this.bullets[i].position.x > this.app.screen.width  ||
        //         this.bullets[i].position.y > this.app.screen.height  
        //     )
        //     {
        //         this.app.stage.removeChild(this.bullets[i])
        //         this.bullets.splice(i,1)
        //     }
        // }
    }
}