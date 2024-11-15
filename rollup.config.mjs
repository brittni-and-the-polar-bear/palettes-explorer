/*
 * Copyright (C) 2023-2024 brittni and the polar bear LLC.
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

import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import json from '@rollup/plugin-json';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

import analyzer from 'rollup-plugin-analyzer';
import css from 'rollup-plugin-css-only';
import serve from 'rollup-plugin-serve';

import {readFileSync} from 'node:fs';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
    input: './src/sketch.ts',
    output: {
        dir: './out/dist',
        format: 'es',
        name: 'GenArtExplorer_Palettes',
        sourcemap: true,
        preserveModules: true
    },
    plugins: [
        commonjs(),
        nodeResolve({
            extensions: ['.ts']
        }),
        json(),
        typescript(),
        terser(),
        analyzer({
            summaryOnly: true
        }),
        exportFavicon(),
        css({
            output: 'bundle.css'
        }),
        html({
            title: 'GenArt Explorer - Palettes',
            publicPath: './'
        }),
        dev && serve({
            contentBase: './out/dist',
            host: '127.0.0.1',
            port: 8080
        })
    ]
};

function exportFavicon() {
    return {
        generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: 'favicon.ico',
                source: readFileSync('./assets/icon/favicon.ico')
            });
        }
    };
}
