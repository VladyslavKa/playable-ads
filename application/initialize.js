import * as PIXI from 'pixi.js';
import scaleToWindow from "./common/scaleToWindow";
import {APP_LINK, CANVAS_BACKGROUND_COLOR} from "./_const";
import Button from "./items/button";
import Room from "./items/room";
import Logo from "./items/logo";
import Stair from "./items/stair";
import { charm } from "./plugins/charm";

const app = new PIXI.Application({
    width: 1390,
    antialias: true,
    forceCanvas: true,
    transparent: false,
    resolution: 1
});

window.addEventListener("orientationchange", () => {
    scaleToWindow(app.renderer.view, CANVAS_BACKGROUND_COLOR);
});

window.addEventListener('resize', () => {
    scaleToWindow(app.renderer.view, CANVAS_BACKGROUND_COLOR);
});

document.body.appendChild(app.view);

scaleToWindow(app.renderer.view, CANVAS_BACKGROUND_COLOR);

const room = new Room({
    onLoad(roomContainer) {
        app.stage.addChild(roomContainer);

        const logo = new Logo();
        app.stage.addChild(logo);

        const button = new Button({
            x: room.width/2,
            y: room.height - 50,
            anchor: {
                x: 0.5,
                y: 1
            },

            events: {
                'pointerdown': () => {
                    window.open(APP_LINK, '_blank');
                }
            }
        });

        app.stage.addChild(button);

        const stair = new Stair({
           parentContainer: room,
        });
        app.stage.addChild(stair);
    }
});

gameLoop();

function gameLoop(){
    requestAnimationFrame(gameLoop);

    // app.renderer.render(app.stage);

    charm.update();

    //Optionally, you probably also need to render Pixi's root
    //container. If your root container is called `stage` you could
    //update it like this:
    //PIXI.renderer.render(stage);
}