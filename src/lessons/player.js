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
import { Shooting } from './shooting'

export class Player {
    constructor({ app }) {
        this.app = app
        const playerWidth = 32
        this.player = Sprite.from(Texture.WHITE)
        this.player.anchor.set(0.5)
        this.player.position.set(this.app.screen.width / 2, this.app.screen.height / 2)
        this.player.width = this.player.height = playerWidth
        this.player.tint = 0xea985d
        this.app.stage.addChild(this.player)

        this.lastMouseButton = 0
        this.shooting = new Shooting({ app: this.app, player: this })
        //healthbar
        this.maxHealth = 100
        this.health = this.maxHealth
        const margin = 16
        const barHeight = 8
        this.healthBar = new Graphics()
        this.healthBar.beginFill(0xFF0000)
        this.healthBar.initialWidth = app.view.width - 2*margin
        this.healthBar.drawRect(margin, app.screen.height - barHeight - margin /2, this.healthBar.initialWidth, barHeight)
        this.healthBar.endFill()
        this.healthBar.zIndex = 1
        this.app.stage.sortableChildren = true
        this.app.stage.addChild(this.healthBar)

    }

    attack(){
        this.health -= 1
        this.healthBar.width = (this.health/this.maxHealth) * this.healthBar.initialWidth
        if(this.health <= 0){
            this.dead = true
        }
    }

    get width() {
        return this.player.width
    }

    get position() {
        return this.player.position
    }

    update(delta) {
        if(this.dead) return
        let cursorPosition = this.app.renderer.events.pointer.global
        let angle = Math.atan2(
            cursorPosition.y - this.player.position.y,
            cursorPosition.x - this.player.position.x
        ) +
            Math.PI

        this.player.rotation = angle

        this.shooting.update(delta)
    }
}