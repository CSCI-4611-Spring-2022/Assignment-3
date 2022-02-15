import * as THREE from 'three'
import { EarthquakeRecord } from './EarthquakeRecord';

export class Earth extends THREE.Group
{
    private earthMesh : THREE.Mesh;
    private earthMaterial : THREE.MeshLambertMaterial;
    private debugMaterial : THREE.MeshBasicMaterial;

    constructor()
    {
        // Call the superclass constructor
        super();

        this.earthMesh = new THREE.Mesh();
        this.earthMaterial = new THREE.MeshLambertMaterial();
        this.debugMaterial = new THREE.MeshBasicMaterial();
    }

    public initialize() : void
    {
        // Initialize texture: you can change to a lower-res texture here if needed
        // Note that this won't display properly until you assign texture coordinates to the mesh
        this.earthMaterial.map = new THREE.TextureLoader().load('./data/earth-2k.png');
        this.earthMaterial.map.minFilter = THREE.LinearFilter;

        // Setup the debug material for wireframe viewing
        this.debugMaterial.wireframe = true;

        // As a demo, we'll add a square with 2 triangles.
        // First, we define four vertices
        var vertices : Array<number> = [];
        vertices.push(-.5, -.5, 0);
        vertices.push(.5, -.5, 0);
        vertices.push(.5, .5, 0);
        vertices.push(-.5, .5, 0);

        // Next we define indices into the array for the two triangles
        var indices : Array<number> = [];
        indices.push(0, 1, 2);
        indices.push(0, 2, 3);

        // Set the vertex positions in the geometry
        // The itemSize is 3 because each item is X, Y, Z
        this.earthMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

        // Set the triangle indices
        this.earthMesh.geometry.setIndex(indices);

        // Add the mesh to this group
        this.add(this.earthMesh);
    }

    public update(deltaTime: number) : void
    {
        
    }

    public toggleDebugMode(debugMode : boolean)
    {
        if(debugMode)
            this.earthMesh.material = this.debugMaterial;
        else
            this.earthMesh.material = this.earthMaterial;
    }

    public convertLatLongToPlane(latitude: number, longitude: number) : THREE.Vector3
    {
        // TODO: We recommend filling in this function to put all your
        // lat,long --> plane calculations in one place.

        return new THREE.Vector3();
    }

    public convertLatLongToSphere(latitude: number, longitude: number) : THREE.Vector3
    {
        // TODO: We recommend filling in this function to put all your
        // lat,long --> sphere calculations in one place.

        return new THREE.Vector3();
    }
}