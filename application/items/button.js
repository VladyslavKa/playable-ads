import * as PIXI from 'pixi.js';
import { charm } from "../plugins/charm";

export default class Button {
    constructor({ x, y, anchor, events }) {
        this.container = new PIXI.Container();
        this.loader = new PIXI.Loader();

        this.loader
            .add({
                name: 'button',
                url: '/images/btn.png'
            })
            .load((loader, resources) => {
                this.sprite = new PIXI.Sprite(resources.button.texture);
                this.sprite.anchor.set(anchor.x, anchor.y);
                this.sprite.x = x;
                this.sprite.y = y;
                this.sprite.interactive = true;
                this.sprite.buttonMode = true;
                this.initEventsListeners(events);
                charm.scale(this.sprite, 1.1, 1.1, 60);

                this.container.addChild(this.sprite);
            });

        return this.container;
    }

    initEventsListeners(events) {
        if ('pointerdown' in events) {
            this.sprite.on('pointerdown', () => {
                events.pointerdown();
            });
        }
    }
}