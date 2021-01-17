import * as PIXI from 'pixi.js';
import {
    Container,
    Sprite,
} from "pixi.js";
import scaleToWindow from "./common/scaleToWindow";
import {
    FINISH_BACKGROUND,
    FINISH_IMAGE,
    BOOK_STAND,
    textures,
    PLANT_FIRST,
    GLOBE,
    TABLE,
    SOFA,
    AUSTIN,
    PLANT_SECOND,
    PLANT_THIRD,
    BACK,
} from "./_const/textures";
import Logo from "./items/logo";
import ButtonContinue from "./items/button-continue";
import Stairs from "./items/stairs";
import { loader } from "./utils/loader";
import {APP_LINK, CANVAS_BACKGROUND_COLOR} from "./_const/const";

export default class Game {
    constructor() {
        this.setup();
    }

    setup() {
        loader.add(textures).load(() => {
            this.initApp();
            this.resize();
            this.start();
        });
    }

    start() {
        this.initBaseScene();
        this.initFinishScene();
        this.renderDecor();
        this.renderAustin();
        this.renderLogo();
        this.renderContinueButton();
        this.renderStairs();
        this.renderPlantThird();
    }

    end() {
        this.finishScene.visible = true;
        this.stairs.removeInteraction();
        this.buttonContinue.removeInteraction();
    }

    initApp() {
        this.app = new PIXI.Application({
            width: 1390,
            height: 640,
            antialias: true,
            forceCanvas: true,
            transparent: false,
            resolution: 1
        });

        window.addEventListener("orientationchange", () => this.resize());
        window.addEventListener("resize", () => this.resize());

        document.body.appendChild(this.app.view);
    }

    resize() {
        scaleToWindow(this.app.renderer.view, CANVAS_BACKGROUND_COLOR);
    }

    initBaseScene() {
        const sprite = new Sprite(loader.resources[BACK].texture);

        this.baseScene = new Container();
        this.baseScene.addChild(sprite);
        this.app.stage.addChild(this.baseScene);
    }

    initFinishScene() {
        const background = new Sprite(loader.resources[FINISH_BACKGROUND].texture);
        const image = new Sprite(loader.resources[FINISH_IMAGE].texture);

        image.x = background.width/2;
        image.y = background.height/2;
        image.anchor.set(0.5);
        image.interactive = true;
        image.buttonMode = true;
        image.on('pointertap', () => this.onPointertapFinishImage());

        this.finishScene = new Container();
        this.finishScene.visible = false;
        this.finishScene.addChild(background);
        this.finishScene.addChild(image);
        this.app.stage.addChild(this.finishScene);
    }

    renderDecor() {
        const bookStand = new Sprite(loader.resources[BOOK_STAND].texture);
        const plantFirst = new Sprite(loader.resources[PLANT_FIRST].texture);
        const plantSecond = new Sprite(loader.resources[PLANT_SECOND].texture);
        const globe = new Sprite(loader.resources[GLOBE].texture);
        const table = new Sprite(loader.resources[TABLE].texture);
        const sofa = new Sprite(loader.resources[SOFA].texture);

        bookStand.x = 840;
        plantFirst.x = 450;

        plantSecond.x = 1130;
        plantSecond.y = 160;

        globe.x = 90;
        globe.y = this.baseScene.height/6;

        table.x = 200;
        table.y = 200;
        table.anchor.set(0);

        sofa.x = 130;
        sofa.y = 315;

        this.baseScene.addChild(bookStand);
        this.baseScene.addChild(plantFirst);
        this.baseScene.addChild(plantSecond);
        this.baseScene.addChild(globe);
        this.baseScene.addChild(table);
        this.baseScene.addChild(sofa);
    }

    renderAustin() {
        const austin = new Sprite(loader.resources[AUSTIN].texture);

        austin.x = this.baseScene.width/2;
        austin.y = 110;
        this.baseScene.addChild(austin);
    }

    renderPlantThird() {
        const plantThird = new Sprite(loader.resources[PLANT_THIRD].texture);

        plantThird.x = 1130;
        plantThird.y = 440;
        plantThird.anchor.set(0, 0);
        this.baseScene.addChild(plantThird);
    }

    renderLogo() {
        const logo = new Logo();

        this.baseScene.addChild(logo.sprite);
    }

    renderContinueButton() {
        const buttonContinue = new ButtonContinue({
            x: this.baseScene.width/2,
            y: this.baseScene.height - 50,
        });

        this.buttonContinue = buttonContinue;
        this.baseScene.addChild(buttonContinue.sprite);
    }

    renderStairs() {
        const stairs = new Stairs({
            onSubmit: () => {
                this.end();
            }
        });

        this.stairs = stairs;
        this.baseScene.addChild(stairs.container);
    }

    onPointertapFinishImage() {
        window.open(APP_LINK, 'self');
    }
}