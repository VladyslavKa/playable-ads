import * as PIXI from "pixi.js";
import {charm} from "../plugins/charm";
import StairsMenu from "./stairs-menu";

export default class Stair {
    constructor({ parentContainer }) {
        this.parentContainer = parentContainer;
        this.container = new PIXI.Container();
        this.loader = new PIXI.Loader();
        this.stairs = {};

        this.loader
            .add([
                {
                    name: 'oldStair',
                    url: '/images/old_stair.png'
                }, {
                    name: 'hammer',
                    url: '/images/icon_hammer.png'
                },
                {
                    name: 'newStair1',
                    url: '/images/new_stair_01.png'
                },
                {
                    name: 'newStair2',
                    url: '/images/new_stair_02.png'
                },
                {
                    name: 'newStair3',
                    url: '/images/new_stair_03.png'
                }
            ])
            .load((loader, resources) => {
                this.resources = resources;
                this.oldStairSprite = new PIXI.Sprite(resources.oldStair.texture);
                this.oldStairSprite.x = 0;
                this.oldStairSprite.y = 0;

                this.container.x = parentContainer.width - this.oldStairSprite.width;
                this.container.addChild(this.oldStairSprite);

                this.initStair(1);
                this.initStair(2);
                this.initStair(3);
                this.initHammerSprite();
            });

        return this.container;
    }

    initHammerSprite() {
        this.hammerSprite = new PIXI.Sprite(this.resources.hammer.texture);
        this.hammerSprite.x = this.oldStairSprite.width/2;
        this.hammerSprite.y = this.oldStairSprite.height/2;
        this.hammerSprite.anchor.x = 0.5;
        this.hammerSprite.anchor.y = 0.5;
        this.hammerSprite.alpha = 0;
        this.hammerSprite.interactive = true;
        this.hammerSprite.buttonMode = true;
        this.hammerSprite.on('pointertap',  () => this.onClickHammer());

        this.container.addChild(this.hammerSprite);

        // TODO
        const stairMenu = new StairsMenu({
            onClickMenu: (...args) => this.switchStair(...args),
            onClickOk: () => {
                console.log('finish')
            }
        });
        this.stairMenu = stairMenu;
        this.container.addChild(stairMenu.container);

        setTimeout(() => {
            charm.fadeIn(this.hammerSprite);
        }, 1000);
    }

    initStair(index) {
        const container = new PIXI.Container();
        const texture = PIXI.Texture.from(`/images/new_stair_0${index}.png`);
        const sprite = new PIXI.Sprite(texture);

        container.x = Math.abs(this.container.width - sprite.width);
        container.y = this.container.height - sprite.height;

        sprite.x = 0;
        sprite.y = -10;
        sprite.alpha = 0;

        container.addChild(sprite);
        this.container.addChild(container);

        this.stairs = {
            ...this.stairs,
            [index]: {
                sprite
            }
        }
    }

    onClickHammer() {
        charm.fadeOut(this.hammerSprite);
        this.stairMenu.show();
    }

    switchStair(index) {
        charm.fadeOut(this.oldStairSprite);

        Object.values(this.stairs).forEach(({ sprite }, idx) => {
            if (idx + 1 === index) {
                charm.slide(sprite, sprite.x, sprite.y + 10, 120, "smoothstep", false);
                charm.fadeIn(sprite);
            } else {
                charm.slide(sprite, sprite.x, sprite.y - 10, 120, "smoothstep", false);
                charm.fadeOut(sprite);
            }
        });

        // const texture = PIXI.Texture.from(`/images/new_stair_0${index}.png`);
        // const sprite = new PIXI.Sprite(texture);
        // this.oldStairSprite.texture = texture;
        // console.log(sprite.width);

        // this.oldStairSprite.anchor.x = 0;
        // this.oldStairSprite.x = this.oldStairSprite.width - sprite.width;
    }
}