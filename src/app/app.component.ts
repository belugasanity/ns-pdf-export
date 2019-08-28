import { Component, OnInit } from "@angular/core";
import { isAndroid } from "tns-core-modules/platform";
import { AppCenter, AppCenterSettings } from "nativescript-microsoft-appcenter";
import * as permissions from "nativescript-permissions";
import * as application from 'tns-core-modules/application';

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        if (application.android) {
            let appCenter: AppCenter = new AppCenter();

            let appCenterSettings: AppCenterSettings = {
                appSecret: "893d1a36-8753-4ef9-bf61-4590a14afa9d",
                analytics: true,
                crashes: true
            }

            appCenter.start(appCenterSettings);
        }
        permissions.requestPermission([
            "android.permission.INTERNET",
            "android.permission.READ_EXTERNAL_STORAGE",
            "android.permission.WRITE_EXTERNAL_STORAGE",
        ], "We need these permissions to save our pdf")
            .then(function (res) {
            })
            .catch(function () {
            });
    }

    getIconSource(icon: string): string {
        const iconPrefix = isAndroid ? "res://" : "res://tabIcons/";

        return iconPrefix + icon;
    }
}
