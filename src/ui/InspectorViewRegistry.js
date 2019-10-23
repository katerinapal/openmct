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
/*global console */

;

/**
 * A InspectorViewRegistry maintains the definitions for views
 * that may occur in the inspector.
 *
 * @interface InspectorViewRegistry
 * @memberof module:openmct
 */
function InspectorViewRegistry() {
    this.providers = {};
}

/**
 *
 * @param {object} selection the object to be viewed
 * @returns {module:openmct.InspectorViewRegistry[]} any providers
 *          which can provide views of this object
 * @private for platform-internal use
 */
InspectorViewRegistry.prototype.get = function (selection) {
    var providers = this.getAllProviders().filter(function (provider) {
        return provider.canView(selection);
    });

    if (providers && providers.length > 0) {
        return providers[0].view(selection);
    }
};

/**
 * @private
 */
InspectorViewRegistry.prototype.getAllProviders = function () {
    return Object.values(this.providers);
};

/**
 * Registers a new type of view.
 *
 * @param {module:openmct.InspectorViewRegistry} provider the provider for this view
 * @method addProvider
 * @memberof module:openmct.InspectorViewRegistry#
 */
InspectorViewRegistry.prototype.addProvider = function (provider) {
    var key = provider.key;

    if (key === undefined) {
        throw "View providers must have a unique 'key' property defined";
    }

    if (this.providers[key] !== undefined) {
        console.warn("Provider already defined for key '%s'. Provider keys must be unique.", key);
    }

    this.providers[key] = provider;
};

/**
 * @private
 */
InspectorViewRegistry.prototype.getByProviderKey = function (key) {
    return this.providers[key];
};

var bindingVariable = InspectorViewRegistry;
export default bindingVariable;
