import * as PIXI from "pixi.js";
import {charm} from "../plugins/charm";

export default class Logo {
    constructor() {
        this.container = new PIXI.Container();
        this.loader = new PIXI.Loader();

        this.loader
            .add({
                name: 'logo',
                url: '/images/logo.png'
            })
            .load((loader, resources) => {
                this.texture = PIXI.utils.TextureCache["images/logo.png"];
                this.sprite = new PIXI.Sprite(resources.logo.texture);
                this.sprite.x = 0;
                this.sprite.y = 20;
                this.sprite.alpha = 0;

                setTimeout(() => {
                    charm.fadeIn(this.sprite);
                }, 500);

                this.container.addChild(this.sprite);
            });


        return this.container;
    }
}