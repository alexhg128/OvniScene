import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

//
// Control Panel manager
//
class ControlPanel {

    gui: GUI;
    folders: Map<string, any>;

    //
    // Create GUI object and folder map
    //
    constructor() {
        this.gui = new GUI();
        this.folders = new Map<string, any>();
    }

    //
    // Add a folder to the GUI
    //
    addFolder(name: string) {
        var folder = this.gui.addFolder(name);
        this.folders.set(name, folder);
    }

    //
    // Add a slider to a folder
    //
    addSlider(folder: string, object: any, property: string, min: number, max: number, step: number) {
        if(this.folders.has(folder)) {
            this.folders.get(folder).add(object, property, min, max, step).listen();
        }
    }

    //
    // Open a folder in the GUI
    //
    openFolder(folder: string) {
        if(this.folders.has(folder)) {
            this.folders.get(folder).open();
        }
    }

    //
    // Add a color picker to a folder
    //
    addColor(folder: string, object: any) {
        if(this.folders.has(folder)) {
            var data = {
                color: object.color.getHex(),    
                mapsEnabled: true,
                shadowMapSizeWidth: 512,
                shadowMapSizeHeight: 512,
            };
            this.folders.get(folder).addColor(object, 'color').onChange(() => { 
                object.color.setHex(Number(data.color.toString().replace('#', '0x'))) 
            });
        }
    }

}

export { ControlPanel }