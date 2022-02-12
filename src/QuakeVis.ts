import * as THREE from 'three'
import { GUI } from 'dat.gui'
import { GraphicsApp } from './GraphicsApp'
import { Earth } from './Earth';
import { EarthquakeDatabase } from './EarthquakeDatabase';

export class QuakeVis extends GraphicsApp
{
    private earth : Earth;
    private gui : GUI;
    private earthquakeDB : EarthquakeDatabase;

    // State variables
    private currentTime : number;

    // GUI variables
    private date : string;
    private viewMode : string;
    private playbackSpeed : number;
    private debugMode : boolean;

    constructor()
    {
        // Pass in the default camera parameters to the superclass constructor
        super(60, 1920/1080, 0.1, 50);

        this.gui = new GUI();
        this.earth = new Earth();
        this.earthquakeDB = new EarthquakeDatabase('./data/earthquakes.txt');

        this.currentTime = Infinity;

        this.date = '';
        this.viewMode = 'Map';
        this.playbackSpeed = 0.5;
        this.debugMode = false;
    }

    createScene() : void
    {
        // Setup camera
        this.camera.position.set(0, 0, 3.5);
        this.camera.lookAt(0, 0, 0);
        this.camera.up.set(0, 1, 0);

        // Create an ambient light
        var ambientLight = new THREE.AmbientLight('white', 0.25);
        this.scene.add(ambientLight);

        // Create a directional light
        var directionalLight = new THREE.DirectionalLight('white', .6);
        directionalLight.position.set(10, 10, 10);
        this.scene.add(directionalLight)

        // Load a texture and set it as the background
        this.scene.background = new THREE.TextureLoader().load('./data/iss006e40544.png')

        // Initialize the earth and add it to the scene
        this.earth.initialize();
        this.scene.add(this.earth);

        // Create a new GUI folder to hold earthquake controls
        var controls = this.gui.addFolder('Earthquake Controls');

        // Create a GUI control to show the current date and make it listen for changes
        var dateController = controls.add(this, 'date');
        dateController.name('Current Date');
        dateController.listen();

        // Create a GUI control for the view mode and add a change event handler
        var viewController = controls.add(this, 'viewMode', {Map: 'Map', Globe: 'Globe'});
        viewController.name('View Mode');
        viewController.onChange((value: string) => {
            console.log("View mode changed to: " + value);
        });

        // Create a GUI control for the playback speed and add a change event handler
        var playbackController = controls.add(this, 'playbackSpeed', 0, 1);
        playbackController.name('Playback Speed');
        playbackController.onChange((value: number) => {
            console.log("Playback speed changed to: " + value);
        });

        // Create a GUI control for the debug mode and add a change event handler
        var debugController = controls.add(this, 'debugMode');
        debugController.name('Debug Mode');
        debugController.onChange((value: boolean) => {
            console.log("Debug mode changed to: " + value);
        });

        // Make the GUI controls wider and open by default
        this.gui.width = 300;
        controls.open();
    }

    update(deltaTime : number) : void
    {
        // The data file is large and read asynchronously
        // If we try to read the earthquake data right away, we will encounter an exception
        // This will terminate the update loop if it has not been loaded yet
        if(!this.earthquakeDB.loaded)
            return;

        // Number of seconds in 1 year (approx.)
        const playbackWindow = 12 * 28 * 24 * 60 * 60;

        // Scale factor for time progression
        // Multiply by 1000 to convert from seconds to milliseconds
        const playbackScale = 30000000*1000;

        // Advance current time
        this.currentTime += playbackScale * this.playbackSpeed * deltaTime;

        // If we are beyond the max time, loop back to the beginning
        if(this.currentTime > this.earthquakeDB.getMaxTime())
            this.currentTime = this.earthquakeDB.getMinTime();

        var currentDate = new Date();
        currentDate.setTime(this.currentTime);
        this.date = currentDate.getUTCMonth() + "/" + currentDate.getUTCDate() + "/" + currentDate.getUTCFullYear();
        
        // TO DO: Draw the earthquakes!
    }
}
