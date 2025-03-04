/*
 * Copyright (C) 2024-2025 brittni and the polar bear LLC.
 *
 * This file is a part of brittni and the polar bear's palette explorer project,
 * which is released under the GNU Affero General Public License, Version 3.0.
 * You may not use this file except in compliance with the license.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. See LICENSE or go to
 * https://www.gnu.org/licenses/agpl-3.0.en.html for full license details.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * The visual outputs of this source code are licensed under the
 * Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License.
 * You should have received a copy of the CC BY-NC-ND 4.0 License with this program.
 * See OUTPUT-LICENSE or go to https://creativecommons.org/licenses/by-nc-nd/4.0/
 * for full license details.
 */

import P5Lib from 'p5';
import {RGBConfig, RGBScreen} from "./rgb-screen";
import {
    ASPECT_RATIOS,
    AspectRatio,
    Canvas, CanvasScreenConfig,
    GraphicsContext, BlueColorSelector,
    P5Context,
    ScreenConfigBuilder,
    RedColorSelector, GreenColorSelector, CyanColorSelector, MagentaColorSelector, RGBColorSelector
} from "@batpb/genart";

import '../../assets/styles/sketch.css';

const p5: P5Lib = P5Context.p5;

const selectors: RGBColorSelector[] = [
    new RedColorSelector(),
    new GreenColorSelector(),
    new BlueColorSelector(),
    new CyanColorSelector(),
    new MagentaColorSelector(),
    // new YellowColorSelector()
];

p5.setup = (): void => {
    Canvas.buildCanvas(ASPECT_RATIOS.SQUARE, 720, p5.P2D, 'sketch-canvas', false, true);

    const screen: RGBScreen = new RGBScreen(buildRGBScreen());
    Canvas.addScreen(screen);
    Canvas.currentScreen = screen.NAME;
};

p5.draw = (): void => {
    Canvas.draw();
};

p5.windowResized = (): void => {
    Canvas.resize();
};

p5.keyPressed = (): void => {
    Canvas.keyPressed();
};

function buildRGBScreen(): RGBConfig {
    const builder: ScreenConfigBuilder = new ScreenConfigBuilder();
    builder.setName('sketch-screen')
        .setActiveGraphics({
            NAME: 'sketch-graphics',
            ASPECT_RATIO: new AspectRatio(ASPECT_RATIOS.SQUARE),
            RESOLUTION: 720
        });

    let config: CanvasScreenConfig | undefined = builder.build();

    if (!config) {
        config = {
            NAME: 'default-screen',
            ACTIVE_GRAPHICS: new GraphicsContext({NAME: 'default-graphics'})
        }
    }

    (config as RGBConfig).COLOR_SELECTOR = selectors[4];

    return (config as RGBConfig);
}
