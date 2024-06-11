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
import { Player } from './player.js'
import { Zombi } from './zombe.js'
import { Spawner } from './spawner.js'
import { dist } from 'vectors'

export class ZombiLend {

    constructor() {
        this.app = new Application({ resizeTo: window, backgroundColor: "#FFFFE0" })
        document.body.appendChild(this.app.view)

        const events = new EventSystem(this.app.renderer)
        events.domElement = this.app.renderer.view;

        this.app.evventMode = 'static'

        document.addEventListener('click', (e) => {
            this.app.gameStarted = true
                })

    }

    draw() {
        const app = this.app
        this.player = new Player({ app })
        const player = this.player
        let zSpawner = new Spawner({app: this.app, create: () => new Zombi({ app, player }) })

        let gameStartScene = this.createScene('Click to Start Game')
        let gameOverScene = this.createScene('Game Over')
        this.app.gameStarted = false
        this.app.ticker.add((delta) => {
            gameOverScene.visible = this.player.dead
            gameStartScene.visible = !this.app.gameStarted
            if(this.app.gameStarted === false) return
            this.player.update(delta)
            zSpawner.spawns.forEach(zombie => zombie.update(delta))
            this.bulletHitTest({ 
                bullets: this.player.shooting.bullets, 
                zombies: zSpawner.spawns, 
                bulletRadius: 8, 
                zombieRadius: 16 })
        })
    }

    bulletHitTest({ bullets, zombies, bulletRadius, zombieRadius }) {
        bullets.forEach(b => {
            zombies.forEach((zombie, index) => {
                let dx = zombie.position.x - b.position.x
                let dy = zombie.position.y - b.position.y
                let distince = Math.sqrt(dx * dx + dy * dy)
                if (distince < bulletRadius + zombieRadius) {
                    zombies.splice(index, 1)
                    zombie.kill()
                }

            })
        })
    }

    createScene(sceneText){
        const scenesContainer = new  Container()
        const text= new Text(sceneText)
        text.x = this.app.screen.width/2
        text.y = 0
        text.anchor.set(0.5, 0)
        scenesContainer.zIndex = 1
        scenesContainer.addChild(text)
        this.app.stage.addChild(scenesContainer)
        return scenesContainer
    }

   

}