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

}

export { ControlPanel }