// Type definitions for Chrome extension development
// Project: http://developer.chrome.com/extensions/
// Definitions by: Matthew Kimber <https://github.com/matthewkimber>
//                 otiai10 <https://github.com/otiai10>
//                 sreimer15 <https://github.com/sreimer15>
//                 MatCarlson <https://github.com/MatCarlson>
//                 ekinsol <https://github.com/ekinsol>
//                 Brian Wilson <https://github.com/echoabstract>
//                 Sebastiaan Pasma <https://github.com/spasma>
//                 bdbai <https://github.com/bdbai>
//                 pokutuna <https://github.com/pokutuna>
//                 Jason Xian <https://github.com/JasonXian>
//                 userTim <https://github.com/usertim>
//                 Idan Zeierman <https://github.com/idan315>
//                 Nicolas Rodriguez <https://github.com/nicolas377>
//                 Ido Salomon <https://github.com/idosal>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.6

import * as accessibilityFeatures from './accessibilityFeatures';
import * as action from './action';
import * as alarms from './alarms';
import * as browser from './browser';
import * as bookmarks from './bookmarks';
import * as browserAction from './browserAction';
import * as browsingData from './browsingData';
import * as commands from './commands';
import * as contentSettings from './contentSettings';
import * as contextMenus from './contextMenus';
import * as cookies from './cookies';
import * as declarativeContent from './declarativeContent';
import * as declarativeWebRequest from './declarativeWebRequest';
import * as desktopCapture from './desktopCapture';
import * as documentScan from './documentScan';
import * as dom from './dom';
import * as downloads from './downloads';
import * as events from './events';
import * as extension from './extension';
import * as fileBrowserHandler from './fileBrowserHandler';
import * as fileSystemProvider from './fileSystemProvider';
import * as fontSettings from './fontSettings';
import * as gcm from './gcm';
import * as history from './history';
import * as i18n from './i18n';
import * as identity from './identity';
import * as idle from './idle';
import * as loginState from './loginState';
import * as management from './management';
import * as notifications from './notifications';
import * as offscreen from './offscreen';
import * as omnibox from './omnibox';
import * as pageAction from './pageAction';
import * as pageCapture from './pageCapture';
import * as permissions from './permissions';
import * as platformKeys from './platformKeys';
import * as power from './power';
import * as printerProvider from './printerProvider';
import * as privacy from './privacy';
import * as proxy from './proxy';
import * as search from './search';
import * as serial from './serial';
import * as runtime from './runtime';
import * as scripting from './scripting';
import * as scriptBadge from './scriptBadge';
import * as sessions from './sessions';
import * as storage from './storage';
import * as socket from './socket';
import * as tabCapture from './tabCapture';
import * as tabs from './tabs';
import * as tabGroups from './tabGroups';
import * as topSites from './topSites';
import * as tts from './tts';
import * as ttsEngine from './ttsEngine';
import * as types from './types';
import * as vpnProvider from './vpnProvider';
import * as wallpaper from './wallpaper';
import * as webNavigation from './webNavigation';
import * as webRequest from './webRequest';
import * as webstore from './webstore';
import * as windows from './windows';
import * as declarativeNetRequest from './declarativeNetRequest';
import * as sidePanel from './sidePanel';
import * as devtools from './devtools';
import * as enterprise from './enterprise';
import * as input from './input';
import * as networking from './networking';
import * as system from './system';

declare global {
    namespace chrome {
        export {
            accessibilityFeatures,
            action,
            alarms,
            browser,
            bookmarks,
            browserAction,
            browsingData,
            commands,
            contentSettings,
            contextMenus,
            cookies,
            declarativeContent,
            declarativeWebRequest,
            desktopCapture,
            documentScan,
            dom,
            downloads,
            events,
            extension,
            fileBrowserHandler,
            fileSystemProvider,
            fontSettings,
            gcm,
            history,
            i18n,
            identity,
            idle,
            loginState,
            management,
            notifications,
            offscreen,
            omnibox,
            pageAction,
            pageCapture,
            permissions,
            platformKeys,
            power,
            printerProvider,
            privacy,
            proxy,
            search,
            serial,
            runtime,
            scripting,
            scriptBadge,
            sessions,
            storage,
            socket,
            tabCapture,
            tabs,
            tabGroups,
            topSites,
            tts,
            ttsEngine,
            types,
            vpnProvider,
            wallpaper,
            webNavigation,
            webRequest,
            webstore,
            windows,
            declarativeNetRequest,
            sidePanel,
            devtools,
            enterprise,
            input,
            networking,
            system,
        };
    }
}

export {};
