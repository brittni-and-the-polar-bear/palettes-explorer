/*
 * Copyright (C) 2025 brittni and the polar bear LLC.
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

import {
    CanvasScreen,
    CanvasScreenConfig,
    Color,
    Coordinate,
    GraphicsContext,
    Random,
    RGBColorSelector
} from '@batpb/genart';

export interface RGBConfig extends CanvasScreenConfig {
    COLOR_SELECTOR: RGBColorSelector;
}

export class RGBScreen extends CanvasScreen {
    readonly #TOTAL: number = 250;

    #positions: Coordinate[] = [];
    #colors: Color[] = [];

    public constructor(config: RGBConfig) {
        super(config);

        for (let i: number = 0; i < this.#TOTAL; i++) {
            const x: number = Random.randomFloat(this.minX, this.maxX);
            const y: number = Random.randomFloat(this.minY, this.maxY);
            const color: Color = config.COLOR_SELECTOR.getColor();
            color.alpha = 150;
            this.#positions.push(new Coordinate(x, y, config.ACTIVE_GRAPHICS));
            this.#colors.push(color);
        }
    }

    public override drawToGraphics(context: GraphicsContext): void {
        const graphics: P5Lib.Graphics = context.GRAPHICS;

        for (let i: number = 0; i < this.#TOTAL; i++) {
            const position: Coordinate = this.#positions[i];
            const color: Color = this.#colors[i];
            graphics.fill(color.color);
            graphics.noStroke();
            graphics.ellipse(position.x, position.y, 75, 75);
        }
    }

    public override keyPressed(): void {
    }

    public override mousePressed(): void {
    }
}
