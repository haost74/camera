import { Application } from '@pixi/app'
import { Sprite } from '@pixi/sprite'
import { Button, Input, ScrollBox } from '@pixi/ui'
import { Container } from '@pixi/display'
import { Graphics } from '@pixi/graphics'
import { Texture, Renderer, Ticker } from '@pixi/core'
import { EventSystem } from "@pixi/events";

import { NineSlicePlane } from '@pixi/mesh-extras'
import { Text, TextStyle } from '@pixi/text'
import { TilingSprite } from '@pixi/sprite-tiling'
import { Loader } from '@pixi/loaders'

import beck from '../images/beck.png'

export class Aplication {
    app
    container
    step = 0
    isClick = false
    constructor() {

        this.app = new Application({ resizeTo: window, backgroundColor: "#FFFFE0" })
        document.body.appendChild(this.app.view)
        const events = new EventSystem(this.app.renderer);
        events.domElement = this.app.renderer.view;

        this.container = new Container()
        this.container.width = this.app.view.width + 500
        this.container.height = this.app.view.height + 500
        this.container.x = -250//this.app.view.width / 2
        this.container.y = -250//this.app.view.height / 2

        let loader = new Loader()
        loader.add('back', beck)

        loader.onComplete.add(() => {
            let tiling = new TilingSprite(loader.resources['back'].texture, this.app.view.width + 1500, this.app.view.height + 1500)
            tiling.position.set(0, 0)
            this.container.addChild(tiling)


            const style = new TextStyle({
                fontSize: 100,
                fontWeight: 'bold',
                fill: ['#ffa512', '#ff9e00'], // gradient
                stroke: '#fff',
                strokeThickness: 4,
                dropShadow: true,
                dropShadowColor: '#000000',
                dropShadowBlur: 4,
                dropShadowAngle: Math.PI / 6,
                dropShadowDistance: 2,
            });

            const richText = new Text('Game App', style);
            richText.x = 250;
            richText.y = 250//this.app.view.height;

            this.app.stage.addChild(richText)


        })
        loader.load();

        this.container.pivot.x = this.app.view.width / 2
        this.container.pivot.y = this.app.view.height / 2




        document.addEventListener('keyup', (e) => { this.keyup(e) })
        document.addEventListener('keydown', (e) => { this.keydown(e) })


        this.app.stage.addChild(this.container)
        this.app.ticker.add((delta) => {

            if (this.isClick) {
                this.container.pivot.x -= 20 * this.step

            }
        })

    }

    keyup(e) {
        this.isClick = false
        this.step = 0
        //console.log('keyup')

    }

    keydown(e) {
        this.isClick = true

        //console.log('keydown')
        switch (e.keyCode) {
            case 37:
                this.step = -1
                break;
            case 39:
                this.step = 1
                break;

            default:
                break;
        }
    }

}