import legacyRegistry from ".\\legacyRegistry.js";
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

;

var DEFAULTS = [
    'src/adapter',
    'src/api/objects',
    'src/api/telemetry',
    'platform/framework',
    'platform/core',
    'platform/representation',
    'platform/commonUI/about',
    'platform/commonUI/browse',
    'platform/commonUI/edit',
    'platform/commonUI/dialog',
    'platform/commonUI/formats',
    'platform/commonUI/general',
    'platform/commonUI/inspect',
    'platform/commonUI/mobile',
    'platform/commonUI/notification',
    'platform/containment',
    'platform/execution',
    'platform/exporters',
    'platform/telemetry',
    'platform/features/clock',
    'platform/features/fixed',
    'platform/features/imagery',
    'platform/features/layout',
    'platform/features/listview',
    'platform/features/pages',
    'platform/features/hyperlink',
    'platform/features/timeline',
    'platform/features/table',
    'platform/forms',
    'platform/identity',
    'platform/persistence/aggregator',
    'platform/persistence/queue',
    'platform/policy',
    'platform/entanglement',
    'platform/search',
    'platform/status',
    'platform/commonUI/regions'
];

DEFAULTS.forEach(function (bundlePath) {
    legacyRegistry.enable(bundlePath);
});

var bindingVariable = legacyRegistry;
export default bindingVariable;
