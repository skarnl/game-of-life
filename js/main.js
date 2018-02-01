import { Point } from './Point';
import { Organism } from './Organism';

const canvas = document.querySelector('#canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context2d = canvas.getContext('2d');

const world = [];

const worldConfiguration = [
    [0,1,1],
    [1,0,1],
    [1,1,0],
];

const BLOCK_SIZE = 15;
const MARGIN = 10;
const OUTSIDE_MARGIN = 30;

for (let rowIndex = 0; rowIndex < worldConfiguration.length; rowIndex++) {
    const row = worldConfiguration[rowIndex];

    for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const alive = row[colIndex];

        const x = OUTSIDE_MARGIN + colIndex * (BLOCK_SIZE + MARGIN);
        const y = OUTSIDE_MARGIN + rowIndex * (BLOCK_SIZE + MARGIN);

        const o = new Organism(context2d, new Point(x, y), BLOCK_SIZE);
        o.setAlive(alive);
        world.push(o);
    }
}

setInterval(tick, 300);

/**
 * Update all organisms with their state
 */
function determineWorldState() {
    //update alive/death of all organisms
}

/**
 * Update render of the world
 */
function update() {
    for(const organism of world) {
        organism.draw();
    }
}

function tick() {
    determineWorldState();
    update();
}