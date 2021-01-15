import * as PIXI from "pixi.js";

export default class Room {
    constructor({ onLoad = () => {} }) {
        this.container = new PIXI.Container();
        this.loader = new PIXI.Loader();

        this.loader
            .add({
                name: 'backRoom',
                url: '/images/back.png'
            })
            .load((loader, resources) => {
                this.sprite = new PIXI.Sprite(resources.backRoom.texture);
                this.container.addChild(this.sprite);

                onLoad(this.container);
            });

        return this.container;
    }

}