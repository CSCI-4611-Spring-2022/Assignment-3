import * as THREE from 'three'
import { Earth } from './Earth';
import { Earthquake } from './Earthquake'

export class EarthquakeDatabase
{
    public earthquakes : Earthquake[];
    public loaded : boolean;

    public maxMagnitude : number;
    public minMagnitude : number;

    constructor(filename : string)
    {
        this.earthquakes = [];
        this.loaded = false;
        this.maxMagnitude = 0;
        this.minMagnitude = Infinity;

        var loader = new THREE.FileLoader();
        loader.load(filename, (data : string | ArrayBuffer) => {
            var lines = data.toString().split('\n');
            lines.forEach((line: string) => {
                if(line.length > 30)
                {
                    var quake = new Earthquake(line);
                    this.earthquakes.push(quake)

                    if(quake.magnitude > this.maxMagnitude)
                        this.maxMagnitude = quake.magnitude;
                    else if(quake.magnitude < this.minMagnitude)
                        this.minMagnitude = quake.magnitude;
                }
            });
            this.loaded = true;
        });
    }

    // Performs a binary search for the most recent quake
    public findMostRecentQuake(date : Date)
    {
        var targetTime = date.getTime();

        var start = 0;
        var end = this.earthquakes.length - 1;
        while (start < end - 1)
        {
            var half = Math.floor((start + end) / 2);
            if(this.earthquakes[half].date.getTime() > targetTime)
                end = half - 1;
            else
                start = half;
        }

        if (start == end || this.earthquakes[end].date.getTime() > targetTime)
            return start;
        else
            return end;
    }

    public getMaxTime() : number
    {
        // Convert from milliseconds to seconds
        return this.earthquakes[this.earthquakes.length-1].date.getTime();
    }

    public getMinTime() : number
    {
        // Convert from milliseconds to seconds
        return this.earthquakes[0].date.getTime();
    }
}