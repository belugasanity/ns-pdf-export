import { Component, OnInit } from "@angular/core";
import * as fs from 'tns-core-modules/file-system';
import {ImageSource} from 'tns-core-modules/image-source';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { knownFolders, Folder } from "tns-core-modules/file-system";


global['window'] = {
 'document': {
 'createElementNS': () => { return {} }
}
};
global['document'] = {
 'createElement': (str) => { return {} }
};
global['navigator'] = {};
var base64 = require('base-64');
var jsPDF = require('../../../node_modules/jspdf');
global['btoa'] = (str) => {
 return base64.encode(str);
};
global['atob'] = (bytes) => {
 return base64.decode(bytes);
};
global['u8'] = {};

declare var android;

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    providers: [
    { provide: 'Window', useValue: window }
  ]
})
export class HomeComponent implements OnInit {
    exportPath: fs.Folder;

    constructor() {

    }

    ngOnInit(): void {
        let externPath = android.os.Environment.getExternalStoragePublicDirectory(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
        let customFolderPath = fs.path.join(externPath, "pdfExport");
        this.exportPath = fs.Folder.fromPath(customFolderPath);
    }

    public async createPdf() {
        try {
            let doc;
            // Letter Demensions in mm is 216 x 279
            doc = new jsPDF("portrait", "mm", "letter");

            doc.setFontSize(14);

            doc.text('Hello World!', 10, 10);

            // add an image from the app file system
            const imgSrc = new ImageSource();

            // Load from the app/images/image.jpg
            const fle = knownFolders.currentApp().getFile('./app/images/image.jpg');
            const imageAsset = new ImageAsset(fle.path);
            await imgSrc.fromAsset(imageAsset);
            let imgString = await imgSrc.toBase64String('jpeg');
            imgString = 'data:image/jpeg;base64,' + imgString;

            // addImage()
            // param 1 = the image data
            // param 2 = image file type
            // param 3-4 = where to position the image on the page
            // param 5-6 = the image size (in mm)
            // param 7 = alias
            // param 8 = compression
            // more info at https://rawgit.com/MrRio/jsPDF/master/docs/module-addImage.html
            doc.addImage(imgString,'JPEG', 10, 20, 30, 30, null, 'FAST');
            // output the entire pdf file to data uri string
            const fileData = doc.output('datauristring');
            // init the file and path to it
            const file: fs.File = <fs.File>this.exportPath.getFile("pdf-export.pdf");
            // Cut out the data piece .. remove 'data:...;base64,'
            const tempData = fileData.split(",")[1];
            // decode the base64 piece
            const data = android.util.Base64.decode(tempData, android.util.Base64.DEFAULT);
            // write to the file
            file.writeSync(data);
            alert('File written');
            // let myPath = fs.path.join(this.exportPath.path, 'pdf-export.pdf');

        } catch (e) {
            console.log(`Unable to create pdf. Error: ${e.message}`);
        }
    }
}
