import UrlService from ".\\src\\services\\UrlService.js";
import PopupService from ".\\src\\services\\PopupService.js";
import SplashScreenManager from ".\\src\\SplashScreenManager.js";
import StyleSheetLoader from ".\\src\\StyleSheetLoader.js";
import TimeRangeController from ".\\src\\controllers\\TimeRangeController.js";
import DateTimePickerController from ".\\src\\controllers\\DateTimePickerController.js";
import DateTimeFieldController from ".\\src\\controllers\\DateTimeFieldController.js";
import TreeNodeController from ".\\src\\controllers\\TreeNodeController.js";
import ActionGroupController from ".\\src\\controllers\\ActionGroupController.js";
import ToggleController from ".\\src\\controllers\\ToggleController.js";
import ContextMenuController from ".\\src\\controllers\\ContextMenuController.js";
import ClickAwayController from ".\\src\\controllers\\ClickAwayController.js";
import ViewSwitcherController from ".\\src\\controllers\\ViewSwitcherController.js";
import BottomBarController from ".\\src\\controllers\\BottomBarController.js";
import GetterSetterController from ".\\src\\controllers\\GetterSetterController.js";
import SelectorController from ".\\src\\controllers\\SelectorController.js";
import ObjectInspectorController from ".\\src\\controllers\\ObjectInspectorController.js";
import BannerController from ".\\src\\controllers\\BannerController.js";
import MCTContainer from ".\\src\\directives\\MCTContainer.js";
import MCTDrag from ".\\src\\directives\\MCTDrag.js";
import MCTSelectable from ".\\src\\directives\\MCTSelectable.js";
import MCTClickElsewhere from ".\\src\\directives\\MCTClickElsewhere.js";
import MCTResize from ".\\src\\directives\\MCTResize.js";
import MCTPopup from ".\\src\\directives\\MCTPopup.js";
import MCTScroll from ".\\src\\directives\\MCTScroll.js";
import MCTSplitPane from ".\\src\\directives\\MCTSplitPane.js";
import MCTSplitter from ".\\src\\directives\\MCTSplitter.js";
import MCTTree from ".\\src\\directives\\MCTTree.js";
import ReverseFilter from ".\\src\\filters\\ReverseFilter.js";
import legacyRegistry from "..\\..\\..\\src\\legacyRegistry.js";
/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2017, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

legacyRegistry.register("platform/commonUI/general", {
    "name": "General UI elements",
    "description": "General UI elements, meant to be reused across modes",
    "resources": "res",
    "extensions": {
        "services": [
            {
                "key": "urlService",
                "implementation": UrlService,
                "depends": [
                    "$location"
                ]
            },
            {
                "key": "popupService",
                "implementation": PopupService,
                "depends": [
                    "$document",
                    "$window"
                ]
            }
        ],
        "runs": [
            {
                "implementation": StyleSheetLoader,
                "depends": [
                    "stylesheets[]",
                    "$document",
                    "THEME",
                    "ASSETS_PATH"
                ]
            },
            {
                "implementation": SplashScreenManager,
                "depends": [
                    "$document"
                ]
            }
        ],
        "filters": [
            {
                "implementation": ReverseFilter,
                "key": "reverse"
            }
        ],
        "stylesheets": [
            {
                "stylesheetUrl": "css/normalize.min.css",
                "priority": "mandatory"
            }
        ],
        "templates": [
            {
                "key": "bottombar",
                "template": bottombarTemplate
            },
            {
                "key": "action-button",
                "template": actionButtonTemplate
            },
            {
                "key": "input-filter",
                "template": inputFilterTemplate
            },
            {
                "key": "indicator",
                "template": indicatorTemplate
            },
            {
                "key": "message-banner",
                "template": messageBannerTemplate
            },
            {
                "key": "progress-bar",
                "template": progressBarTemplate
            },
            {
                "key": "time-controller",
                "template": timeControllerTemplate
            }
        ],
        "controllers": [
            {
                "key": "TimeRangeController",
                "implementation": TimeRangeController,
                "depends": [
                    "$scope",
                    "$timeout",
                    "formatService",
                    "DEFAULT_TIME_FORMAT",
                    "now"
                ]
            },
            {
                "key": "DateTimePickerController",
                "implementation": DateTimePickerController,
                "depends": [
                    "$scope",
                    "now"
                ]
            },
            {
                "key": "DateTimeFieldController",
                "implementation": DateTimeFieldController,
                "depends": [
                    "$scope",
                    "formatService",
                    "DEFAULT_TIME_FORMAT"
                ]
            },
            {
                "key": "TreeNodeController",
                "implementation": TreeNodeController,
                "depends": [
                    "$scope",
                    "$timeout",
                    "navigationService"
                ]
            },
            {
                "key": "ActionGroupController",
                "implementation": ActionGroupController,
                "depends": [
                    "$scope"
                ]
            },
            {
                "key": "ToggleController",
                "implementation": ToggleController
            },
            {
                "key": "ContextMenuController",
                "implementation": ContextMenuController,
                "depends": [
                    "$scope"
                ]
            },
            {
                "key": "ClickAwayController",
                "implementation": ClickAwayController,
                "depends": [
                    "$document",
                    "$timeout"
                ]
            },
            {
                "key": "ViewSwitcherController",
                "implementation": ViewSwitcherController,
                "depends": [
                    "$scope",
                    "$timeout"
                ]
            },
            {
                "key": "BottomBarController",
                "implementation": BottomBarController,
                "depends": [
                    "indicators[]"
                ]
            },
            {
                "key": "GetterSetterController",
                "implementation": GetterSetterController,
                "depends": [
                    "$scope"
                ]
            },
            {
                "key": "SelectorController",
                "implementation": SelectorController,
                "depends": [
                    "objectService",
                    "$scope"
                ]
            },
            {
                "key": "ObjectInspectorController",
                "implementation": ObjectInspectorController,
                "depends": [
                    "$scope",
                    "objectService"
                ]
            },
            {
                "key": "BannerController",
                "implementation": BannerController,
                "depends": [
                    "$scope",
                    "notificationService",
                    "dialogService"
                ]
            }
        ],
        "directives": [
            {
                "key": "mctContainer",
                "implementation": MCTContainer,
                "depends": [
                    "containers[]"
                ]
            },
            {
                "key": "mctDrag",
                "implementation": MCTDrag,
                "depends": [
                    "$document"
                ]
            },
            {
                "key": "mctSelectable",
                "implementation": MCTSelectable,
                "depends": [
                    "openmct"
                ]
            },
            {
                "key": "mctClickElsewhere",
                "implementation": MCTClickElsewhere,
                "depends": [
                    "$document"
                ]
            },
            {
                "key": "mctResize",
                "implementation": MCTResize,
                "depends": [
                    "$timeout"
                ]
            },
            {
                "key": "mctPopup",
                "implementation": MCTPopup,
                "depends": [
                    "$compile",
                    "popupService"
                ]
            },
            {
                "key": "mctScrollX",
                "implementation": MCTScroll,
                "depends": [
                    "$parse",
                    "MCT_SCROLL_X_PROPERTY",
                    "MCT_SCROLL_X_ATTRIBUTE"
                ]
            },
            {
                "key": "mctScrollY",
                "implementation": MCTScroll,
                "depends": [
                    "$parse",
                    "MCT_SCROLL_Y_PROPERTY",
                    "MCT_SCROLL_Y_ATTRIBUTE"
                ]
            },
            {
                "key": "mctSplitPane",
                "implementation": MCTSplitPane,
                "depends": [
                    "$parse",
                    "$log",
                    "$interval",
                    "$window"
                ]
            },
            {
                "key": "mctSplitter",
                "implementation": MCTSplitter
            },
            {
                "key": "mctTree",
                "implementation": MCTTree,
                "depends": ['gestureService']
            }
        ],
        "constants": [
            {
                "key": "MCT_SCROLL_X_PROPERTY",
                "value": "scrollLeft"
            },
            {
                "key": "MCT_SCROLL_X_ATTRIBUTE",
                "value": "mctScrollX"
            },
            {
                "key": "MCT_SCROLL_Y_PROPERTY",
                "value": "scrollTop"
            },
            {
                "key": "MCT_SCROLL_Y_ATTRIBUTE",
                "value": "mctScrollY"
            },
            {
                "key": "THEME",
                "value": "unspecified",
                "priority": "fallback"
            },
            {
                "key": "ASSETS_PATH",
                "value": ".",
                "priority": "fallback"
            }
        ],
        "containers": [
            {
                "key": "accordion",
                "template": accordionTemplate,
                "attributes": [
                    "label"
                ]
            }
        ],
        "representations": [
            {
                "key": "tree",
                "template": subtreeTemplate,
                "uses": [
                    "composition"
                ],
                "type": "root",
                "priority": "preferred"
            },
            {
                "key": "tree",
                "template": treeTemplate
            },
            {
                "key": "subtree",
                "template": subtreeTemplate,
                "uses": [
                    "composition"
                ]
            },
            {
                "key": "tree-node",
                "template": treeNodeTemplate,
                "uses": [
                    "action"
                ]
            },
            {
                "key": "label",
                "template": labelTemplate,
                "uses": [
                    "type",
                    "location"
                ],
                "gestures": [
                    "drag",
                    "menu",
                    "info"
                ]
            },
            {
                "key": "node",
                "template": labelTemplate,
                "uses": [
                    "type"
                ],
                "gestures": [
                    "drag",
                    "menu"
                ]
            },
            {
                "key": "action-group",
                "template": actionGroupTemplate,
                "uses": [
                    "action"
                ]
            },
            {
                "key": "context-menu",
                "template": contextMenuTemplate,
                "uses": [
                    "action"
                ]
            },
            {
                "key": "switcher",
                "template": switcherTemplate,
                "uses": [
                    "view"
                ]
            },
            {
                "key": "object-inspector",
                "template": objectInspectorTemplate
            }
        ],
        "controls": [
            {
                "key": "selector",
                "template": selectorTemplate
            },
            {
                "key": "datetime-picker",
                "template": datetimePickerTemplate
            },
            {
                "key": "datetime-field",
                "template": datetimeFieldTemplate
            }
        ],
        "licenses": [
            {
                "name": "Normalize.css",
                "version": "1.1.2",
                "description": "Browser style normalization",
                "author": "Nicolas Gallagher, Jonathan Neal",
                "website": "http://necolas.github.io/normalize.css/",
                "copyright": "Copyright (c) Nicolas Gallagher and Jonathan Neal",
                "license": "license-mit",
                "link": "https://github.com/necolas/normalize.css/blob/v1.1.2/LICENSE.md"
            },
            {
                "name": "Zepto",
                "version": "1.1.6",
                "description": "DOM manipulation",
                "author": "Thomas Fuchs",
                "website": "http://zeptojs.com/",
                "copyright": "Copyright (c) 2010-2016 Thomas Fuchs",
                "license": "license-mit",
                "link": "https://github.com/madrobby/zepto/blob/master/MIT-LICENSE"
            }
        ]
    }
});
