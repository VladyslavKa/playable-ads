import {Sprite, Texture} from "pixi.js";

export default (container) => {
    const helper = new Sprite(Texture.WHITE);
    helper.width = container.width;
    helper.height = container.height;
    helper.alpha = 0.3;
    container.addChild(helper);

    return helper;
}