// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app/app.module";
import * as application from 'tns-core-modules/application';
import { AppCenterSettings, AppCenter } from "nativescript-microsoft-appcenter";

if (application.ios){
    let appCenterSettings: AppCenterSettings = {
        appSecret: "893d1a36-8753-4ef9-bf61-4590a14afa9d",
        analytics: true,
        crashes: true
    }

    let appCenter = new AppCenter();
    appCenter.startWithAppDelegate(appCenterSettings);
}

platformNativeScriptDynamic().bootstrapModule(AppModule);
