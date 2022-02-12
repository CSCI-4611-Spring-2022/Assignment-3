import * as THREE from 'three'

export class Earth extends THREE.Group
{
    private earthMesh : THREE.Mesh;
    private earthMaterial : THREE.MeshLambertMaterial;

    constructor()
    {
        // Call the superclass constructor
        super();

        this.earthMesh = new THREE.Mesh();
        this.earthMaterial = new THREE.MeshLambertMaterial();
    }

    public initialize() : void
    {
        // Initialize texture: you can change to a lower-res texture here if needed
        // Note that you will have to define texture coordinates and assign it to the mesh
        this.earthMaterial.map = new THREE.TextureLoader().load('./data/earth-2k.png');

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

    public update(deltaTime : number) : void
    {
        
    }
}