import { Sprite } from 'pixi.js';
import {BUTTON_CONTINUE} from "../_const/textures";
import { loader } from "../utils/loader";
import { pulse } from "../utils/effects";
import {APP_LINK} from "../_const/const";

export default class ButtonContinue {
    constructor(params) {
        const { x, y } = params;
        const { texture } = loader.resources[BUTTON_CONTINUE];

        this.sprite = new Sprite(texture);
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 1;
        this.sprite.alpha = 1;

        this.sprite.buttonMode = true;
        this.sprite.interactive = true;
        this.sprite.on('pointertap', () => this.onPointertap());

        pulse(this.sprite);

        return this;
    }

    onPointertap() {
        window.open(APP_LINK, 'self');
    }

    removeInteraction() {
        this.sprite.buttonMode = false;
        this.sprite.interactive = false;
        this.sprite.removeAllListeners();
    }
}