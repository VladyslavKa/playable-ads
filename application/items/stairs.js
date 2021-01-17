import { Container, Sprite } from "pixi.js";
import {
    BUTTON_OK,
    HAMMER,
    OLD_STAIRS,
    STAIR_MENU_BACKGROUND,
    STAIR_MENU_BACKGROUND_CHOOSED,
    STAIR_MENU_CARPET,
    STAIR_NEW_STYLE,
} from "../_const/textures";
import { loader } from "../utils/loader";
import {bounce, dropIn, fadeIn, fadeOut} from "../utils/effects";

export default class Stairs {
    constructor({ onSubmit = () => {} }) {
        this.onSubmit = onSubmit;
        this.menu = [
            {
                id: 1,
                isActive: false,
            },
            {
                id: 2,
                isActive: false,
            },
            {
                id: 3,
                isActive: false,
            }
        ];

        this.container = new Container();
        this.container.x = 0;
        this.container.y = 0;

        this.renderOldStairs();
        this.renderHammer();
        this.renderMenu();

        return this;
    }

    renderOldStairs() {
        const { texture } = loader.resources[OLD_STAIRS];

        this.oldStairs = new Sprite(texture);
        this.oldStairs.x = 835;
        this.oldStairs.y = 51;
        this.oldStairs.anchor.set(0, 0);
        this.container.addChild(this.oldStairs);
    }

    renderHammer() {
        const { texture } = loader.resources[HAMMER];

        this.hammer = new Sprite(texture);
        this.hammer.x = this.oldStairs.x + (this.oldStairs.width/2);
        this.hammer.y = this.oldStairs.y + ( this.oldStairs.height/2) - 50;
        this.hammer.anchor.set(0, 0.5);
        this.hammer.alpha = 0;
        this.hammer.buttonMode = true;
        this.hammer.interactive = true;
        this.hammer.on('pointertap', () => this.onPointertapHammer());
        this.container.addChild(this.hammer);

        fadeIn(this.hammer, 1).then(() => {
            bounce(this.hammer, 1, {
                y: this.oldStairs.y + ( this.oldStairs.height/2),
            }) ;
        });
    }

    renderMenu() {
        this.menu = this.menu.map((item, index) => {
            const container = new Container();
            const textureCarpet = loader.resources[`${STAIR_MENU_CARPET}_${item.id}`].texture;
            const textureBackground = loader.resources[STAIR_MENU_BACKGROUND].texture;
            const spriteCarpet = new Sprite(textureCarpet);
            const spriteBackground = new Sprite(textureBackground);

            const textureButtonOk = loader.resources[BUTTON_OK].texture;
            const buttonOk = new Sprite(textureButtonOk);

            const textureStairNewStyle = loader.resources[`${STAIR_NEW_STYLE}_${item.id}`].texture;
            const stairNewStyle = new Sprite(textureStairNewStyle);

            stairNewStyle.anchor.set(0);
            stairNewStyle.alpha = 0;

            switch (item.id) {
                case 2: {
                    stairNewStyle.x = 898;
                    stairNewStyle.y = 10;
                    break;
                }
                case 3: {
                    stairNewStyle.x = 910;
                    stairNewStyle.y = -20;
                    break;
                }

                default:
                    stairNewStyle.x = 908;
                    stairNewStyle.y = -2;
            }

            buttonOk.x = spriteBackground.width/2;
            buttonOk.y = spriteBackground.height;
            buttonOk.anchor.set(0.5, 0.5);
            buttonOk.visible = false;
            buttonOk.buttonMode = true;
            buttonOk.interactive = true;
            buttonOk.on('pointertap', () => this.onPointertapButtonOk(index));

            spriteCarpet.x = spriteCarpet.width/2 + 24;
            spriteCarpet.y = 0;
            spriteCarpet.anchor.set(0.5, 0);

            spriteBackground.x = 0;
            spriteBackground.y = 0;
            spriteBackground.anchor.set(0, 0);
            spriteBackground.buttonMode = true;
            spriteBackground.interactive = true;
            spriteBackground.on('pointertap', () => this.onPointertapMenu(index));

            container.position.x = this.oldStairs.x + spriteBackground.width * index;
            container.position.y = 0;
            container.alpha = 0;
            container.visible = false;
            container.addChild(spriteBackground);
            container.addChild(spriteCarpet);
            container.addChild(buttonOk);

            this.container.addChild(stairNewStyle);
            this.container.addChild(container);

            return {
                ...item,
                container,
                spriteBackground,
                buttonOk,
                stairNewStyle,
                y: stairNewStyle.y,
            }
        });
    }

    onPointertapHammer() {
        fadeOut(this.hammer, 1);
        this.hammer.visible = false;
        this.showMenu();
    }

    onPointertapMenu(index) {
        fadeOut(this.oldStairs);

        this.menu.forEach((item, idx) => {
            if (index === idx) {
                if (item.isActive) return;

                item.spriteBackground.texture = loader.resources[STAIR_MENU_BACKGROUND_CHOOSED].texture;
                item.spriteBackground.x = 10;
                item.spriteBackground.y = 5;
                item.buttonOk.visible = true;
                item.stairNewStyle.y = item.y;
                item.isActive = true;
                dropIn(item.stairNewStyle, 1, {
                    y: item.stairNewStyle.y + 20
                });

            } else {
                item.spriteBackground.texture = loader.resources[STAIR_MENU_BACKGROUND].texture;
                item.spriteBackground.x = 0;
                item.spriteBackground.y = 0;
                item.buttonOk.visible = false;
                item.stairNewStyle.y = item.y;
                item.isActive = false;
                fadeOut(item.stairNewStyle);
            }
        });
    }

    onPointertapButtonOk(index) {
        this.onSubmit(index);
    }

    showMenu() {
        this.menu.forEach((item, idx) => {
            item.container.visible = true;
           fadeIn(item.container, (idx + 1) / 5);
        });
    }

    removeInteraction() {
        this.menu.forEach((item) => {
            item.buttonOk.interactive = false;
            item.buttonOk.buttonMode = false;
            item.spriteBackground.interactive = false;
            item.spriteBackground.buttonMode = false;
            item.spriteBackground.removeAllListeners();
        });
    }
}