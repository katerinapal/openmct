import MCTInclude from ".\\src\\MCTInclude.js";
import MCTRepresentation from ".\\src\\MCTRepresentation.js";
import DragGesture from ".\\src\\gestures\\DragGesture.js";
import DropGesture from ".\\src\\gestures\\DropGesture.js";
import ContextMenuGesture from ".\\src\\gestures\\ContextMenuGesture.js";
import GestureProvider from ".\\src\\gestures\\GestureProvider.js";
import GestureRepresenter from ".\\src\\gestures\\GestureRepresenter.js";
import DndService from ".\\src\\services\\DndService.js";
import TemplateLinker from ".\\src\\TemplateLinker.js";
import ContextMenuAction from ".\\src\\actions\\ContextMenuAction.js";
import TemplatePrefetcher from ".\\src\\TemplatePrefetcher.js";
import legacyRegistry from "..\\..\\src\\legacyRegistry.js";
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

legacyRegistry.register("platform/representation", {
    "extensions": {
        "directives": [
            {
                "key": "mctInclude",
                "implementation": MCTInclude,
                "depends": [
                    "templates[]",
                    "templateLinker"
                ]
            },
            {
                "key": "mctRepresentation",
                "implementation": MCTRepresentation,
                "depends": [
                    "representations[]",
                    "views[]",
                    "representers[]",
                    "$q",
                    "templateLinker",
                    "$log"
                ]
            }
        ],
        "gestures": [
            {
                "key": "drag",
                "implementation": DragGesture,
                "depends": [
                    "$log",
                    "dndService"
                ]
            },
            {
                "key": "drop",
                "implementation": DropGesture,
                "depends": [
                    "dndService",
                    "$q"
                ]
            },
            {
                "key": "menu",
                "implementation": ContextMenuGesture,
                "depends": [
                    "$timeout",
                    "agentService"
                ]
            }
        ],
        "components": [
            {
                "provides": "gestureService",
                "type": "provider",
                "implementation": GestureProvider,
                "depends": [
                    "gestures[]"
                ]
            }
        ],
        "representers": [
            {
                "implementation": GestureRepresenter,
                "depends": [
                    "gestureService"
                ]
            }
        ],
        "services": [
            {
                "key": "dndService",
                "implementation": DndService,
                "depends": [
                    "$log"
                ]
            },
            {
                "key": "templateLinker",
                "implementation": TemplateLinker,
                "depends": [
                    "$templateRequest",
                    "$sce",
                    "$compile",
                    "$log"
                ],
                "comment": "For internal use by mct-include and mct-representation."
            }
        ],
        "actions": [
            {
                "key": "menu",
                "implementation": ContextMenuAction,
                "depends": [
                    "$compile",
                    "$document",
                    "$rootScope",
                    "popupService",
                    "agentService"
                ]
            }
        ],
        "runs": [
            {
                "priority": "mandatory",
                "implementation": TemplatePrefetcher,
                "depends": [
                    "templateLinker",
                    "templates[]",
                    "views[]",
                    "representations[]",
                    "controls[]",
                    "containers[]"
                ]
            }
        ]
    }
});
