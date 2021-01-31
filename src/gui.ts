import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

class ControlPanel {

    gui: GUI;
    folders: Map<string, any>;

    constructor() {
        this.gui = new GUI();
        this.folders = new Map<string, any>();
    }

    addFolder(name: string) {
        var folder = this.gui.addFolder(name);
        this.folders.set(name, folder);
    }

    addSlider(folder: string, object: any, property: string, min: number, max: number, step: number) {
        if(this.folders.has(folder)) {
            this.folders.get(folder).add(object, property, min, max, step).listen();
        }
    }

    openFolder(folder: string) {
        if(this.folders.has(folder)) {
            this.folders.get(folder).open();
        }
    }

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