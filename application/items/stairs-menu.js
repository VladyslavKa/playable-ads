import * as PIXI from "pixi.js";
import {charm} from "../plugins/charm";

export default class StairsMenu {
    constructor({ onClickOk, onClickMenu }) {
        this.onClickOk = onClickOk;
        this.onClickMenu = onClickMenu;
        this.container = new PIXI.Container();
        this.loader = new PIXI.Loader();
        this.menus = {};

        this.loader
            .add([
                {
                    name: 'stairMenuBackground1',
                    url: '/images/1.png'
                },
                {
                    name: 'stairMenuCarpet1',
                    url: '/images/01.png'
                },
                {
                    name: 'stairMenuBackground2',
                    url: '/images/2.png'
                },
                {
                    name: 'stairMenuCarpet2',
                    url: '/images/02.png'
                },
                {
                    name: 'stairMenuBackground3',
                    url: '/images/3.png'
                },
                {
                    name: 'stairMenuCarpet3',
                    url: '/images/03.png'
                },
                {
                    name: 'stairMenuBackgroundChoosed',
                    url: '/images/choosed.png'
                }
            ])
            .load(() => {

                this.initMenu(1);
                this.initMenu(2);
                this.initMenu(3);
            });

        return this;
    }

    initMenu(index) {
        const container = new PIXI.Container();
        const textureBackground = PIXI.Texture.from(`/images/${index}.png`);
        const spriteBackground = new PIXI.Sprite(textureBackground);
        const textureCarpet = PIXI.Texture.from(`/images/0${index}.png`);
        const spriteCarpet = new PIXI.Sprite(textureCarpet);
        const textureButtonOk = PIXI.Texture.from('/images/ok.png');
        const spriteButtonOk = new PIXI.Sprite(textureButtonOk);

        container.alpha = false;
        container.x = spriteBackground.width * index;

        spriteBackground.x = 0;
        spriteBackground.y = 0;
        spriteBackground.anchor.x = 0;
        spriteBackground.anchor.y = 0;
        spriteBackground.interactive = true;
        spriteBackground.buttonMode = true;
        spriteBackground.on('pointertap', () => this.onClickMenuItem(index));

        spriteCarpet.x = 24;
        spriteCarpet.y = 0;
        spriteCarpet.anchor.x = 0;
        spriteCarpet.anchor.y = 0;

        spriteButtonOk.x = spriteBackground.width/2;
        spriteButtonOk.y = spriteBackground.height;
        spriteButtonOk.anchor.x = 0.5;
        spriteButtonOk.anchor.y = 0.5;
        spriteButtonOk.interactive = true;
        spriteButtonOk.buttonMode = true;
        spriteButtonOk.visible = false;
        spriteButtonOk.on('pointertap', () => this.onClickOk(index));

        container.addChild(spriteBackground);
        container.addChild(spriteCarpet);
        container.addChild(spriteButtonOk);
        this.container.addChild(container);

        this.menus = {
            ...this.menus,
            [index]: {
                container,
                textureBackground,
                spriteBackground,
                spriteButtonOk,
            }
        };
    }

    onClickMenuItem(index) {
        Object.values(this.menus).forEach((item, idx) => {
            if (idx + 1 === index) {
                item.spriteBackground.texture = PIXI.Texture.from('/images/choosed.png');
                item.spriteBackground.x = 10;
                item.spriteBackground.y = 5;
                item.spriteButtonOk.visible = true;
                this.onClickMenu(index);
            } else {
                item.spriteBackground.texture = PIXI.Texture.from('/images/1.png');
                item.spriteBackground.x = 0;
                item.spriteBackground.y = 0;
                item.spriteButtonOk.visible = false;
            }
        });
    }

    show() {
        const promises = Object.values(this.menus).map((item, index) => new Promise((resolve) => {
            setTimeout(() => {
                charm.fadeIn(item.container);
                resolve();
            }, 100 * (index + 1));
        }));

        return Promise.all(promises);
    }
}