import { Sprite } from 'pixi.js';
import {fadeIn} from "../utils/effects";
import {loader} from "../utils/loader";
import {NAME_LOGO} from "./../_const/textures";

export default class Logo {
    constructor() {
        const { texture } = loader.resources[NAME_LOGO];
        this.sprite = new Sprite(texture);

        this.sprite.x = 30;
        this.sprite.alpha = 0;
        fadeIn(this.sprite, 0.5);
        return this;
    }
}